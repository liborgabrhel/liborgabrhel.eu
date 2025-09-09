import type { UIMatch } from 'react-router'
import { createPersonSchema } from '~/constants/person-schema'
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

  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    loaderData.baseUrl,
  )

  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    about: {
      ...createPersonSchema(loaderData.baseUrl),
      contactPoint: {
        '@type': 'ContactPoint',
        availableLanguage: ['en', 'cs'],
        contactType: 'customer service',
        email: 'mail@liborgabrhel.eu',
        url: `${loaderData.baseUrl}/contact`,
      },
    },
    description:
      'Contact page for Libor Gabrhel - Frontend Developer and Beekeeper',
    name: 'Contact Libor Gabrhel',
    url: `${loaderData.baseUrl}/contact`,
  }

  return [
    { 'script:ld+json': breadcrumbStructuredData },
    { 'script:ld+json': pageStructuredData },
  ]
}
