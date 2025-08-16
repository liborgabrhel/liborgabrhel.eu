import { href } from 'react-router'
import type { SitemapUrl } from '~/types/sitemap'

export const URLS_PER_SITEMAP = 45000 // The maximum number of URLs per sitemap file

export const STATIC_URLS: SitemapUrl[] = [
  {
    changefreq: 'daily',
    lastmod: new Date().toISOString(),
    path: href('/'),
    priority: '1.0',
  },
  {
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
    path: href('/developer'),
    priority: '0.9',
  },
  {
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
    path: href('/developer/portfolio'),
    priority: '0.7',
  },
  {
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
    path: href('/beekeeper'),
    priority: '0.9',
  },
  {
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
    path: href('/beekeeper/apiary'),
    priority: '0.7',
  },
  {
    changefreq: 'yearly',
    lastmod: new Date().toISOString(),
    path: href('/contact'),
    priority: '0.8',
  },
]
