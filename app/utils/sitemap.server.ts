import type { NoteType } from '@generated/prisma/enums'
import { href } from 'react-router'
import { STATIC_URLS, URLS_PER_SITEMAP } from '~/constants/sitemap'
import type { SitemapUrl } from '~/types/sitemap'
import { db } from '~/utils/db.server'

export async function getSitemapCount() {
  const totalUrls = await getTotalUrlsCount()

  return Math.ceil(totalUrls / URLS_PER_SITEMAP)
}

async function getTotalUrlsCount() {
  const totalStaticPages = STATIC_URLS.length
  const totalBlogPosts = await db.note.count()

  return totalStaticPages + totalBlogPosts
}

export async function getUrlsForSitemap(index: number) {
  const offset = index * URLS_PER_SITEMAP

  const allUrls = await fetchAllUrls()

  return allUrls.slice(offset, offset + URLS_PER_SITEMAP)
}

const getBlogPostPathByType: Record<NoteType, (value: string) => string> = {
  BEEKEEPER: (slug) => href('/beekeeper/notes/:slug', { slug }),
  DEVELOPER: (slug) => href('/developer/notes/:slug', { slug }),
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

  const firstDeveloperBlogPost = await db.note.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
    where: { type: 'DEVELOPER' },
  })

  urls.push({
    changefreq: 'monthly',
    lastmod:
      firstDeveloperBlogPost?.updatedAt.toISOString() ||
      new Date().toISOString(),
    path: href('/developer/notes'),
    priority: '0.8',
  })

  const firstBeekeeperBlogPost = await db.note.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
    where: { type: 'BEEKEEPER' },
  })

  urls.push({
    changefreq: 'monthly',
    lastmod:
      firstBeekeeperBlogPost?.updatedAt.toISOString() ||
      new Date().toISOString(),
    path: href('/beekeeper/notes'),
    priority: '0.8',
  })

  const blogPosts = await db.note.findMany({
    select: {
      slug: true,
      type: true,
      updatedAt: true,
    },
  })

  urls.push(
    ...blogPosts.map((post) => ({
      changefreq: 'monthly' as const,
      lastmod: post.updatedAt.toISOString(),
      path: getBlogPostPathByType[post.type](post.slug),
      priority: '0.7',
    })),
  )

  return urls
}
