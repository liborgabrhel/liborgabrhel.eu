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
  const totalNotes = await db.note.count()

  return totalStaticPages + totalNotes
}

export async function getUrlsForSitemap(index: number) {
  const offset = index * URLS_PER_SITEMAP

  const allUrls = await fetchAllUrls()

  return allUrls.slice(offset, offset + URLS_PER_SITEMAP)
}

const getNotesPathByType: Record<NoteType, (value: string) => string> = {
  BEEKEEPER: (slug) => href('/beekeeper/notes/:slug', { slug }),
  DEVELOPER: (slug) => href('/developer/notes/:slug', { slug }),
}

async function fetchAllUrls() {
  // noinspection SpellCheckingInspection
  const urls: SitemapUrl[] = [
    ...STATIC_URLS.map((url) => ({
      changefreq: url.changefreq,
      lastmod: url.lastmod,
      path: url.path.replace(/\/$/, ''),
      priority: url.priority,
    })),
  ]

  const latestDeveloperNote = await db.note.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
    where: { type: 'DEVELOPER' },
  })

  // noinspection SpellCheckingInspection
  urls.push({
    changefreq: 'monthly',
    lastmod:
      latestDeveloperNote?.updatedAt.toISOString() || new Date().toISOString(),
    path: href('/developer/notes'),
    priority: '0.8',
  })

  const latestBeekeeperNote = await db.note.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
    where: { type: 'BEEKEEPER' },
  })

  // noinspection SpellCheckingInspection
  urls.push({
    changefreq: 'monthly',
    lastmod:
      latestBeekeeperNote?.updatedAt.toISOString() || new Date().toISOString(),
    path: href('/beekeeper/notes'),
    priority: '0.8',
  })

  const notes = await db.note.findMany({
    select: {
      slug: true,
      type: true,
      updatedAt: true,
    },
  })

  // noinspection SpellCheckingInspection
  urls.push(
    ...notes.map((note) => ({
      changefreq: 'monthly' as const,
      lastmod: note.updatedAt.toISOString(),
      path: getNotesPathByType[note.type](note.slug),
      priority: '0.7',
    })),
  )

  return urls
}
