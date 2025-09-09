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

  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    loaderData.baseUrl,
  )

  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    about: {
      '@id': `${loaderData.baseUrl}/#person`,
      '@type': 'Person',
      contactPoint: {
        '@type': 'ContactPoint',
        availableLanguage: ['en', 'cs'],
        contactType: 'customer service',
        email: 'mail@liborgabrhel.eu',
        url: `${loaderData.baseUrl}/contact`,
      },
      familyName: 'Gabrhel',
      givenName: 'Libor',
      hasOccupation: [
        {
          '@type': 'Occupation',
          description:
            'Building modern web applications with React, TypeScript, and performant frontend architectures.',
          name: 'Frontend Developer',
          occupationLocation: {
            '@type': 'Country',
            containedInPlace: [
              {
                '@type': 'Continent',
                name: 'Europe',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'European Union',
              },
            ],
            name: 'Czechia',
          },
        },
        {
          '@type': 'Occupation',
          description:
            'Maintaining Flow hives, producing raw honey, and practicing sustainable beekeeping.',
          name: 'Beekeeper',
          occupationLocation: {
            '@type': 'Country',
            containedInPlace: [
              {
                '@type': 'Continent',
                name: 'Europe',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'European Union',
              },
            ],
            name: 'Czechia',
          },
        },
      ],
      jobTitle: ['Frontend Developer', 'Beekeeper'],
      name: 'Libor Gabrhel',
      url: loaderData.baseUrl,
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
