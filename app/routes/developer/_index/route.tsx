// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href, Link } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { CallToActionSection } from '~/components/call-to-action-section'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
import { PageSeo } from '~/components/page-seo'
import { Paragraph } from '~/components/paragraph'
import { SEARCH_PARAMS } from '~/constants/search-params'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

  const conatctUrlSearchParams = new URLSearchParams({
    [SEARCH_PARAMS.via.key]: SEARCH_PARAMS.via.values.developer,
  })
  const contactUrl = `${href('/contact')}?${conatctUrlSearchParams.toString()}`

  const [isContactLinkHovered, setIsContactLinkHovered] = useState(false)

  const handleContactLinkHover = (isHovered: boolean) => () => {
    setIsContactLinkHovered(isHovered)
  }

  return (
    <>
      <PageSeo
        baseUrl={baseUrl}
        metaDescription={seo.metaDescription}
        metaRobots={seo.metaRobots}
        ogImageUrl={''}
        pagePath={seo.pagePath}
        pageTitle={seo.pageTitle}
        twitterImageUrl={''}
      />

      <ul>
        <li>
          <Link to={href('/developer/portfolio')} viewTransition={true}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link to={href('/developer/notes')} viewTransition={true}>
            Dev Notes
          </Link>
        </li>
      </ul>

      <CallToActionSection>
        <Paragraph>
          Curious about my development work or need help with your project?
        </Paragraph>
        <LinkButton
          onMouseEnter={handleContactLinkHover(true)}
          onMouseLeave={handleContactLinkHover(false)}
          to={contactUrl}
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
      </CallToActionSection>
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
