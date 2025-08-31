// noinspection JSUnusedGlobalSymbols

import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from '@react-router/dev/routes'

export default [
  // Home & Contact
  layout('routes/__layout/route.tsx', [
    index('routes/_index/route.tsx'),
    route('contact', 'routes/contact/route.tsx'),
  ]),

  // Developer
  ...prefix('developer', [
    layout('routes/developer/__layout/route.tsx', [
      index('routes/developer/_index/route.tsx'),
      route('portfolio', 'routes/developer/portfolio/route.tsx'),
      layout('routes/developer/notes/__layout/route.tsx', [
        route('notes', 'routes/developer/notes/_index/route.tsx'),
        route('notes/:slug', 'routes/developer/notes/note/route.tsx'),
      ]),
    ]),
  ]),

  // Beekeeper
  ...prefix('beekeeper', [
    layout('routes/beekeeper/__layout/route.tsx', [
      index('routes/beekeeper/_index/route.tsx'),
      route('apiary', 'routes/beekeeper/apiary/route.tsx'),
      layout('routes/beekeeper/notes/__layout/route.tsx', [
        route('notes', 'routes/beekeeper/notes/_index/route.tsx'),
        route('notes/:slug', 'routes/beekeeper/notes/note/route.tsx'),
      ]),
    ]),
  ]),

  // Admin
  ...prefix('admin', [
    layout('routes/admin/__layout/route.tsx', [
      index('routes/admin/_index/route.tsx'),
      // SEO Management
      ...prefix('seo', [
        index('routes/admin/seo/_index/route.tsx'),
        route('create', 'routes/admin/seo/create/route.tsx'),
      ]),
      // Notes Management
      ...prefix('notes', [
        index('routes/admin/notes/_index/route.tsx'),
        route('create', 'routes/admin/notes/create/route.tsx'),
      ]),
    ]),
  ]),

  // Resources
  ...prefix('resources', [route('env.js', 'routes/resources/env/route.ts')]),

  // Sitemap
  route('sitemap.xml', 'routes/sitemap/_index/route.ts'),
  ...prefix('sitemap', [
    route('sitemap-index.xml', 'routes/sitemap/sitemap-index/route.ts'),
    route(':file', 'routes/sitemap/sitemap/route.ts'),
  ]),

  // Robots
  route('robots.txt', 'routes/robots/route.ts'),

  // Health Check
  route('health', 'routes/health/route.ts'),
] satisfies RouteConfig
