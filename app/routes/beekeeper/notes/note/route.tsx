// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
import { PageSeo } from '~/components/page-seo'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl, note } = loaderData

  return (
    <>
      <PageSeo
        baseUrl={baseUrl}
        metaDescription={note.seo.metaDescription}
        metaRobots={note.seo.metaRobots}
        ogImageUrl={undefined}
        pagePath={href('/beekeeper/notes/:slug', { slug: note.slug })}
        pageTitle={note.seo.pageTitle}
        twitterImageUrl={undefined}
      />

      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { message, details, stack } = useErrorBoundaryError(error)
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false)

  const handleBackButtonHover = (isHovered: boolean) => () => {
    setIsBackButtonHovered(isHovered)
  }

  return (
    <ErrorSection>
      <ErrorSectionHeading>{message}</ErrorSectionHeading>
      <ErrorSectionSubheading>{details}</ErrorSectionSubheading>
      {stack && <ErrorSectionStackTrace>{stack}</ErrorSectionStackTrace>}
      <LinkButton
        onMouseEnter={handleBackButtonHover(true)}
        onMouseLeave={handleBackButtonHover(false)}
        to={href('/beekeeper/notes')}
      >
        <AnimatedBounce
          axis={'x'}
          from={0}
          isAnimating={isBackButtonHovered}
          to={2}
        >
          ←
        </AnimatedBounce>
        Fly back to safety
      </LinkButton>
    </ErrorSection>
  )
}
