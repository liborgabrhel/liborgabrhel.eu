// noinspection JSUnusedGlobalSymbols

import {
  index,
  prefix,
  type RouteConfig,
  route,
} from '@react-router/dev/routes'

export default [
  // Home
  index('routes/_index/route.tsx'),

  // Developer
  ...prefix('developer', [
    index('routes/developer/_index/route.tsx'),
    route('blog', 'routes/developer/blog/_index/route.tsx'),
    route('blog/:slug', 'routes/developer/blog/post/route.tsx'),
    route('portfolio', 'routes/developer/portfolio/route.tsx'),
  ]),

  // Beekeeper
  ...prefix('beekeeper', [
    index('routes/beekeeper/_index/route.tsx'),
    route('blog', 'routes/beekeeper/blog/_index/route.tsx'),
    route('blog/:slug', 'routes/beekeeper/blog/post/route.tsx'),
    route('apiary', 'routes/beekeeper/apiary/route.tsx'),
  ]),

  // Contact
  route('contact', 'routes/contact/route.tsx'),

  // Resources
  ...prefix('resources', [route('env.js', 'routes/resources/env/route.ts')]),

  // Sitemap
  route('sitemap.xml', 'routes/sitemap/_index/route.ts'),
  ...prefix('sitemap', [
    route('sitemap-index.xml', 'routes/sitemap/sitemap-index/route.ts'),
    route('*', 'routes/sitemap/sitemap/route.ts'),
  ]),

  // Robots
  route('robots.txt', 'routes/robots/route.ts'),
] satisfies RouteConfig
