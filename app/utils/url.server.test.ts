import { describe, expect, it } from 'vitest'
import { getBaseUrl } from './url.server'

describe('url.server', () => {
  describe('getBaseUrl', () => {
    it('should extract base URL from HTTPS request', () => {
      const request = new Request('https://example.com/some/path?query=value')
      const result = getBaseUrl(request)
      expect(result).toBe('https://example.com')
    })

    it('should extract base URL from HTTP request', () => {
      const request = new Request('http://localhost:3000/api/test')
      const result = getBaseUrl(request)
      expect(result).toBe('http://localhost:3000')
    })

    it('should extract base URL from request with port', () => {
      const request = new Request('https://example.com:8080/path')
      const result = getBaseUrl(request)
      expect(result).toBe('https://example.com:8080')
    })

    it('should extract base URL from request with subdomain', () => {
      const request = new Request('https://api.example.com/v1/users')
      const result = getBaseUrl(request)
      expect(result).toBe('https://api.example.com')
    })

    it('should handle root path request', () => {
      const request = new Request('https://example.com/')
      const result = getBaseUrl(request)
      expect(result).toBe('https://example.com')
    })

    it('should handle request without path', () => {
      const request = new Request('https://example.com')
      const result = getBaseUrl(request)
      expect(result).toBe('https://example.com')
    })
  })
})
