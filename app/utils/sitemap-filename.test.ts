import { describe, expect, it } from 'vitest'
import { createSitemapFilename, parseSitemapFilename } from './sitemap-filename'

describe('sitemap-filename', () => {
  describe('createSitemapFilename', () => {
    it('creates valid filename', () => {
      expect(createSitemapFilename(0)).toBe('sitemap-0.xml')
      expect(createSitemapFilename(5)).toBe('sitemap-5.xml')
    })

    it('throws on invalid input', () => {
      expect(() => createSitemapFilename(-1)).toThrow()
      expect(() => createSitemapFilename(3.14)).toThrow()
    })
  })

  describe('parseSitemapFilename', () => {
    it('parses valid filenames', () => {
      expect(parseSitemapFilename('sitemap-0.xml')).toBe(0)
      expect(parseSitemapFilename('sitemap-5.xml')).toBe(5)
    })

    it('returns null for invalid filenames', () => {
      expect(parseSitemapFilename('invalid.xml')).toBe(null)
      expect(parseSitemapFilename('sitemap.xml')).toBe(null)
    })
  })
})
