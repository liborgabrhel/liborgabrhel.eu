import { describe, expect, it } from 'vitest'
import { createContentHash } from './hash.server'

describe('hash.server', () => {
  describe('createContentHash', () => {
    it('should create consistent SHA-256 hashes', () => {
      const content = 'Hello, World!'
      const hash1 = createContentHash(content)
      const hash2 = createContentHash(content)

      expect(hash1).toBe(hash2)
      expect(hash1).toMatch(/^[a-f0-9]{64}$/)
    })

    it('should create different hashes for different inputs', () => {
      expect(createContentHash('a')).not.toBe(createContentHash('b'))
    })

    it('should handle empty strings', () => {
      const hash = createContentHash('')
      expect(hash).toMatch(/^[a-f0-9]{64}$/)
    })
  })
})
