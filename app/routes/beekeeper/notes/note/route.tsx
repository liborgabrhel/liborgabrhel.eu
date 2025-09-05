// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionLinkButton } from '~/components/error-section-link-button'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData

  return (
    <>
      <h1>{note.title}</h1>
      <p>note body</p>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { message, details, stack } = useErrorBoundaryError(error)

  return (
    <ErrorSection>
      <ErrorSectionHeading>{message}</ErrorSectionHeading>
      <ErrorSectionSubheading>{details}</ErrorSectionSubheading>
      <ErrorSectionLinkButton to={href('/beekeeper/notes')}>
        Fly back to safety
      </ErrorSectionLinkButton>
      {stack && <ErrorSectionStackTrace>{stack}</ErrorSectionStackTrace>}
    </ErrorSection>
  )
}
