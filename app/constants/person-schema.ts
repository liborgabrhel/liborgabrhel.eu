export const PERSON_SCHEMA = {
  '@type': 'Person' as const,
  familyName: 'Gabrhel',
  givenName: 'Libor',
  hasOccupation: [
    {
      '@type': 'Occupation' as const,
      description:
        'Building modern web applications with React, TypeScript, and performant frontend architectures.',
      name: 'Front-end Developer',
      occupationLocation: {
        '@type': 'Country' as const,
        containedInPlace: [
          {
            '@type': 'Continent' as const,
            name: 'Europe',
          },
          {
            '@type': 'AdministrativeArea' as const,
            name: 'European Union',
          },
        ],
        name: 'Czechia',
      },
      skills: [
        'React & modern web frameworks',
        'Clean, accessible UI/UX',
        'TypeScript & JavaScript expertise',
        'Optimized for speed & scalability',
      ],
    },
    {
      '@type': 'Occupation' as const,
      description:
        'Maintaining Flow hives, producing raw honey, and practicing sustainable beekeeping.',
      name: 'Beekeeper',
      occupationLocation: {
        '@type': 'Country' as const,
        containedInPlace: [
          {
            '@type': 'Continent' as const,
            name: 'Europe',
          },
          {
            '@type': 'AdministrativeArea' as const,
            name: 'European Union',
          },
        ],
        name: 'Czechia',
      },
      skills: [
        'Raw & unprocessed honey',
        'Eco-friendly hive care',
        'Bee-first philosophy',
        'Boosting biodiversity',
      ],
    },
  ],
  jobTitle: ['Front-end Developer', 'Beekeeper'],
  knowsAbout: [
    'React',
    'TypeScript',
    'JavaScript',
    'Frontend Development',
    'Web Performance',
    'Accessibility',
    'Beekeeping',
    'Sustainable Agriculture',
    'Honey Production',
    'Biodiversity',
  ],
  name: 'Libor Gabrhel',
} as const

// Helper function to create Person schema with dynamic baseUrl
export const createPersonSchema = (baseUrl: string) => ({
  ...PERSON_SCHEMA,
  '@id': `${baseUrl}/#person`,
  url: baseUrl,
})
