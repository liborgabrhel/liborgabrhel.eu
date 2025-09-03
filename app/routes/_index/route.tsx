// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { BeekeeperOverlay } from '~/components/beekeeper-overlay'
import { DeveloperOverlay } from '~/components/developer-overlay'
import { PageSection } from '~/components/page-section'
import { PageSeo } from '~/components/page-seo'
import { PolaroidLinkDescription } from '~/components/polariod-link-description'
import { PolaroidLinkGroup } from '~/components/polariod-link-group'
import { PolaroidLinkHeading } from '~/components/polariod-link-heading'
import { PolaroidLinkList } from '~/components/polariod-link-list'
import { PolaroidLinkListItem } from '~/components/polariod-link-list-item'
import { PolaroidLink } from '~/components/polaroid-link'
import { seo } from './_seo'
import styles from './_styles.module.css'
import type { Route } from './+types/route'
import beekeeperImage from './assets/beekeeper.png'
import developerImage from './assets/developer.png'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

  const [isDeveloperLinkHovered, setIsDeveloperLinkHovered] = useState(false)
  const [isBeekeeperLinkHovered, setIsBeekeeperLinkHovered] = useState(false)

  const handleDeveloperLinkHover = (isHovered: boolean) => () => {
    setIsDeveloperLinkHovered(isHovered)
  }

  const handleBeekeeperLinkHover = (isHovered: boolean) => () => {
    setIsBeekeeperLinkHovered(isHovered)
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
        <PolaroidLinkGroup>
          <PolaroidLink
            imageUrl={developerImage}
            onMouseEnter={handleDeveloperLinkHover(true)}
            onMouseLeave={handleDeveloperLinkHover(false)}
            overlay={<DeveloperOverlay isHovered={isDeveloperLinkHovered} />}
            to={href('/developer')}
            viewTransition={true}
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
            viewTransition={true}
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
    </>
  )
}
