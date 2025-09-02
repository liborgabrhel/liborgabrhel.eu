import type { UIMatch } from 'react-router'
import {
  createBreadcrumbStructuredData,
  getBreadcrumbs,
} from '~/utils/breadcrumbs'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = ({ matches, loaderData }) => {
  if (loaderData === undefined) {
    return []
  }

  const breadcrumbs = getBreadcrumbs(matches as UIMatch[])
  const baseUrl = loaderData.baseUrl

  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    baseUrl,
  )

  return [{ 'script:ld+json': breadcrumbStructuredData }]
}
