import type { UIMatch } from 'react-router'
import {
  createBreadcrumbStructuredData,
  getBreadcrumbs,
} from '~/utils/breadcrumbs'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = ({ matches, loaderData }) => {
  const breadcrumbs = getBreadcrumbs(matches as UIMatch[])

  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    loaderData.baseUrl,
  )

  return [{ 'script:ld+json': breadcrumbStructuredData }]
}
