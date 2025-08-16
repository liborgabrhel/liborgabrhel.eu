import { createContentHash } from '~/utils/hash.server'
import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).origin

  const robotsTxt = `User-agent: *
Allow: /
  
Sitemap: ${host}/sitemap/sitemap-index.xml`

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
