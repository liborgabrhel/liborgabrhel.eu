import { createContentHash } from '~/utils/hash.server'
import { getUrlsForSitemap } from '~/utils/sitemap.server'
import type { Route } from './+types/route'
export async function loader({ params, request }: Route.LoaderArgs) {
  const { '*': sitemapPath } = params

  const match = sitemapPath?.match(/^sitemap-(\d+).xml$/)
  if (match === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const index = parseInt(match[1], 10)

  const urls = await getUrlsForSitemap(index)

  if (urls.length === 0) {
    throw new Response('Not Found', { status: 404 })
  }

  const host = new URL(request.url).origin

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${host}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  const contentHash = createContentHash(sitemapXml)

  return new Response(sitemapXml, {
    headers: {
      'Cache-Control': 'public, max-age=7200, s-maxage=86400', // 2hr browser, 24hr CDN
      'Content-Type': 'application/xml',
      ETag: `"${contentHash}"`,
    },
    status: 200,
  })
}
