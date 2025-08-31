import { href } from 'react-router'
import { createAbsoluteUrl } from '~/utils/create-absolute-url'
import { createContentHash } from '~/utils/hash.server'
import { getSitemapCount } from '~/utils/sitemap.server'
import { createSitemapFilename } from '~/utils/sitemap-filename.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

const createSitemapIndexXml = (sitemapCount: number, baseUrl: string) =>
  `
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(
  { length: sitemapCount },
  (_, index) => `  <sitemap>
    <loc>${createAbsoluteUrl(baseUrl, href('/sitemap/:file', { file: createSitemapFilename(index) })).href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join('\n')}
</sitemapindex>
`.trim()

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)
  const sitemapCount = await getSitemapCount()
  const sitemapIndexXml = createSitemapIndexXml(sitemapCount, baseUrl)
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
