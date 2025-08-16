import { createContentHash } from '~/utils/hash.server'
import { getSitemapCount } from '~/utils/sitemap.server'
import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).origin

  const sitemapCount = await getSitemapCount()

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(
  { length: sitemapCount },
  (_, i) => `  <sitemap>
    <loc>${host}/sitemap/sitemap-${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join('\n')}
</sitemapindex>`

  const contentHash = createContentHash(sitemapIndexXml)

  return new Response(sitemapIndexXml, {
    headers: {
      'Cache-Control': 'public, max-age=1800, s-maxage=3600', // 30min browser, 1hr CDN
      'Content-Type': 'application/xml',
      ETag: `"${contentHash}"`,
    },
    status: 200,
  })
}
