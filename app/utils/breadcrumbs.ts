import type { Breadcrumb } from '~/types/breadcrumb'
import type { Match } from '~/types/match'
import { createAbsoluteUrl } from '~/utils/create-absolute-url'

export const getBreadcrumbs = (matches: Match[]) => {
  return matches
    .filter(({ handle }) => Boolean(handle) && 'breadcrumb' in handle)
    .map((match) => match.handle.breadcrumb(match))
}

export const createBreadcrumbStructuredData = (
  breadcrumbs: Breadcrumb[],
  baseUrl: string | undefined,
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => {
      const absolutePath = createAbsoluteUrl(baseUrl ?? '', breadcrumb.path)

      return {
        '@type': 'ListItem',
        item: absolutePath,
        name: breadcrumb.label,
        position: index + 1,
      }
    }),
  }
}
