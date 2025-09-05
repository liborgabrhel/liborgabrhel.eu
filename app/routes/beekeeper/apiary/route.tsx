// noinspection JSUnusedGlobalSymbols

import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { PageSeo } from '~/components/page-seo'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

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

      <h2>Apiary</h2>
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
