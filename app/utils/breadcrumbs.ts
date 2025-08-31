import type { Breadcrumb } from '~/types/breadcrumb'
import type { Match } from '~/types/match'

export const getBreadcrumbs = (matches: Match[]) => {
  return matches
    .filter(({ handle }) => Boolean(handle) && 'breadcrumb' in handle)
    .map((match) => match.handle.breadcrumb(match))
}

export const createBreadcrumbStructuredData = (
  breadcrumbs: Breadcrumb[],
  baseUrl: string,
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => {
      const url = new URL(breadcrumb.path, baseUrl)

      return {
        '@type': 'ListItem',
        item: url.href,
        name: breadcrumb.label,
        position: index + 1,
      }
    }),
  }
}
