import { createPersonSchema } from '~/constants/person-schema'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (loaderData === undefined) {
    return []
  }

  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@id': `${loaderData.baseUrl}/#website`,
    '@type': 'WebSite',
    author: createPersonSchema(loaderData.baseUrl),
    description:
      'Personal website of Libor Gabrhel - Front-end Developer creating modern web applications and Beekeeper practicing sustainable beekeeping.',
    mainEntity: {
      '@id': `${loaderData.baseUrl}/#person`,
      '@type': 'Person',
    },
    name: 'Libor Gabrhel - Front-end Developer & Beekeeper',
    url: loaderData.baseUrl,
  }

  return [{ 'script:ld+json': pageStructuredData }]
}
