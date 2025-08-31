import { href } from 'react-router'
import { createAbsoluteUrl } from '~/utils/create-absolute-url'
import { createContentHash } from '~/utils/hash.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

const createRobotsTxt = (baseUrl: string) =>
  `
User-agent: *
Allow: /

Sitemap: ${createAbsoluteUrl(baseUrl, href('/sitemap/sitemap-index.xml')).href}
`.trim()

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)

  const robotsTxt = createRobotsTxt(baseUrl)

  const contentHash = createContentHash(robotsTxt)

  return new Response(robotsTxt, {
    headers: {
      'Cache-Control': 'public, max-age=86400', // 24 hours
      'Content-Type': 'text/plain',
      ETag: `"${contentHash}"`,
    },
    status: 200,
  })
}
