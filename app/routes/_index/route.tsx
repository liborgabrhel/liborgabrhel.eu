// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { BeekeeperOverlay } from '~/components/beekeeper-overlay'
import { DeveloperOverlay } from '~/components/developer-overlay'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
import { PageHeading } from '~/components/page-heading/_component'
import { PageSection } from '~/components/page-section'
import { PageSeo } from '~/components/page-seo'
import { Paragraph } from '~/components/paragraph'
import { PolaroidLinkDescription } from '~/components/polariod-link-description'
import { PolaroidLinkGroup } from '~/components/polariod-link-group'
import { PolaroidLinkHeading } from '~/components/polariod-link-heading'
import { PolaroidLinkList } from '~/components/polariod-link-list'
import { PolaroidLinkListItem } from '~/components/polariod-link-list-item'
import { PolaroidLink } from '~/components/polaroid-link'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import styles from './_styles.module.css'
import type { Route } from './+types/route'
import beekeeperImage from './assets/beekeeper.png'
import developerImage from './assets/developer.png'

export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

  const [isDeveloperLinkHovered, setIsDeveloperLinkHovered] = useState(false)
  const [isBeekeeperLinkHovered, setIsBeekeeperLinkHovered] = useState(false)
  const [isContactLinkHovered, setIsContactLinkHovered] = useState(false)

  const handleDeveloperLinkHover = (isHovered: boolean) => () => {
    setIsDeveloperLinkHovered(isHovered)
  }

  const handleBeekeeperLinkHover = (isHovered: boolean) => () => {
    setIsBeekeeperLinkHovered(isHovered)
  }

  const handleContactLinkHover = (isHovered: boolean) => () => {
    setIsContactLinkHovered(isHovered)
  }

  return (
    <>
      <PageSeo
        baseUrl={baseUrl}
        metaDescription={seo.metaDescription}
        metaRobots={seo.metaRobots}
        ogImageUrl={undefined}
        pagePath={seo.pagePath}
        pageTitle={seo.pageTitle}
        twitterImageUrl={undefined}
      />

      <PageSection>
        <PageHeading>Pick a direction...</PageHeading>
        <PolaroidLinkGroup>
          <PolaroidLink
            imageUrl={developerImage}
            onMouseEnter={handleDeveloperLinkHover(true)}
            onMouseLeave={handleDeveloperLinkHover(false)}
            overlay={<DeveloperOverlay isHovered={isDeveloperLinkHovered} />}
            to={href('/developer')}
          >
            <PolaroidLinkHeading>Frontend Developer</PolaroidLinkHeading>
            <PolaroidLinkDescription>
              Modern web apps that are fast, accessible, and a joy to use.
            </PolaroidLinkDescription>
            <PolaroidLinkList>
              <PolaroidLinkListItem className={styles.developer_list_item}>
                React & modern web frameworks
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.developer_list_item}>
                Clean, accessible UI/UX
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.developer_list_item}>
                TypeScript & JavaScript expertise
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.developer_list_item}>
                Optimized for speed & scalability
              </PolaroidLinkListItem>
            </PolaroidLinkList>
          </PolaroidLink>
          <PolaroidLink
            imageUrl={beekeeperImage}
            onMouseEnter={handleBeekeeperLinkHover(true)}
            onMouseLeave={handleBeekeeperLinkHover(false)}
            overlay={<BeekeeperOverlay isHovered={isBeekeeperLinkHovered} />}
            to={href('/beekeeper')}
          >
            <PolaroidLinkHeading>Beekeeper</PolaroidLinkHeading>
            <PolaroidLinkDescription>
              Beekeeping with respect for the hive, the land, and the life they
              sustain.
            </PolaroidLinkDescription>
            <PolaroidLinkList>
              <PolaroidLinkListItem className={styles.beekeeper_list_item}>
                Raw & unprocessed honey
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.beekeeper_list_item}>
                Eco-friendly hive care
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.beekeeper_list_item}>
                Bee-first philosophy
              </PolaroidLinkListItem>
              <PolaroidLinkListItem className={styles.beekeeper_list_item}>
                Boosting biodiversity
              </PolaroidLinkListItem>
            </PolaroidLinkList>
          </PolaroidLink>
        </PolaroidLinkGroup>
      </PageSection>

      <PageSection>
        <PageHeading>Not sure which way to go?</PageHeading>
        <Paragraph>
          Whether you’re curious about my code, my bees, or both — I’d love to
          hear from you.
        </Paragraph>
        <LinkButton
          onMouseEnter={handleContactLinkHover(true)}
          onMouseLeave={handleContactLinkHover(false)}
          to={href('/contact')}
        >
          Contact me
          <AnimatedBounce
            axis={'x'}
            from={0}
            isAnimating={isContactLinkHovered}
            to={-2}
          >
            →
          </AnimatedBounce>
        </LinkButton>
      </PageSection>
    </>
  )
}

export function ErrorBoundary({ error }: { error: Route.ErrorBoundaryProps }) {
  const { message, details, stack } = useErrorBoundaryError(error)

  return (
    <ErrorSection>
      <ErrorSectionHeading>{message}</ErrorSectionHeading>
      <ErrorSectionSubheading>{details}</ErrorSectionSubheading>
      {stack && <ErrorSectionStackTrace>{stack}</ErrorSectionStackTrace>}
    </ErrorSection>
  )
}
