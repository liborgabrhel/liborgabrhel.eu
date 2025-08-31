import type { Match } from '~/types/match'
import { getBreadcrumbs } from '~/utils/breadcrumbs'
import { createBreadcrumbStructuredData } from '~/utils/breadcrumbs.server'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = ({ matches, loaderData }) => {
  const breadcrumbs = getBreadcrumbs(matches as unknown as Match[])

  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    loaderData.baseUrl,
  )

  return [{ 'script:ld+json': breadcrumbStructuredData }]
}
