import { STATIC_URLS, URLS_PER_SITEMAP } from '~/constants/sitemap'
import type { SitemapUrl } from '~/types/sitemap'

export async function getSitemapCount() {
  const totalUrls = await getTotalUrlsCount()

  return Math.ceil(totalUrls / URLS_PER_SITEMAP)
}

async function getTotalUrlsCount() {
  const totalStaticPages = STATIC_URLS.length
  const totalBlogPosts = 0 // TODO: Fetch the total number of blog posts from your data source

  return totalStaticPages + totalBlogPosts
}

export async function getUrlsForSitemap(index: number) {
  const offset = index * URLS_PER_SITEMAP

  const allUrls = await fetchAllUrls()

  return allUrls.slice(offset, offset + URLS_PER_SITEMAP)
}

async function fetchAllUrls() {
  const urls: SitemapUrl[] = [
    ...STATIC_URLS.map((url) => ({
      changefreq: url.changefreq,
      lastmod: url.lastmod,
      path: url.path.replace(/\/$/, ''),
      priority: url.priority,
    })),
  ]

  const blogPostUrls: { slug: string; updatedAt: string }[] = [] // TODO: Fetch blog URLs from your data source

  urls.push(
    ...blogPostUrls.map((post) => ({
      changefreq: 'weekly' as const,
      lastmod: post.updatedAt,
      path: `/blog/${post.slug}`, // TODO: Adjust based on your blog structure
      priority: '0.6',
    })),
  )

  return urls
}
