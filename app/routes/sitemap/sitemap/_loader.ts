import type { SitemapUrl } from '~/types/sitemap'
import { createAbsoluteUrl } from '~/utils/create-absolute-url'
import { createContentHash } from '~/utils/hash.server'
import { getUrlsForSitemap } from '~/utils/sitemap.server'
import { parseSitemapFilename } from '~/utils/sitemap-filename.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

const createSitemapXml = (urls: SitemapUrl[], baseUrl: string) =>
  `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${createAbsoluteUrl(baseUrl, url.path).href}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`.trim()

export async function loader({ params, request }: Route.LoaderArgs) {
  const { file } = params
  const index = parseSitemapFilename(file)

  if (index === null) {
    throw new Response('Not Found', { status: 404 })
  }
  const urls = await getUrlsForSitemap(index)

  if (urls.length === 0) {
    throw new Response('Not Found', { status: 404 })
  }

  const baseUrl = getBaseUrl(request)
  const sitemapXml = createSitemapXml(urls, baseUrl)
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
