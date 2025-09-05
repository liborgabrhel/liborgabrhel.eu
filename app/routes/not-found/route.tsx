// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionLinkButton } from '~/components/error-section-link-button'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import type { Route } from './+types/route'

export { loader } from './_loader'

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { message, details, stack } = useErrorBoundaryError(error)

  return (
    <ErrorSection>
      <ErrorSectionHeading>{message}</ErrorSectionHeading>
      <ErrorSectionSubheading>{details}</ErrorSectionSubheading>
      <ErrorSectionLinkButton to={href('/')}>
        Let’s start over
      </ErrorSectionLinkButton>
      {stack && <ErrorSectionStackTrace>{stack}</ErrorSectionStackTrace>}
    </ErrorSection>
  )
}
