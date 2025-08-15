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

  // Resources
  ...prefix('resources', [
    route('env-script', 'routes/resources/env-script/route.ts'),
  ]),
] satisfies RouteConfig
