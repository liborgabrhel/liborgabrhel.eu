// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent() {
  return 'Route'
}

export function ErrorBoundary({ error }: { error: Route.ErrorBoundaryProps }) {
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
        to={href('/developer/notes')}
      >
        <AnimatedBounce
          axis={'x'}
          from={0}
          isAnimating={isBackButtonHovered}
          to={2}
        >
          ←
        </AnimatedBounce>
        Get back on track
      </LinkButton>
    </ErrorSection>
  )
}
