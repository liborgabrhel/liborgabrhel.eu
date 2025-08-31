import { describe, expect, it } from 'vitest'
import { createAbsoluteUrl } from './create-absolute-url'

describe('createAbsoluteUrl', () => {
  it('should combine baseUrl and path correctly', () => {
    const result = createAbsoluteUrl('https://example.com', '/api/users')
    expect(result).toBe('https://example.com/api/users')
  })

  it('should handle baseUrl with trailing slash', () => {
    const result = createAbsoluteUrl('https://example.com/', '/about')
    expect(result).toBe('https://example.com/about')
  })

  it('should handle path without leading slash', () => {
    const result = createAbsoluteUrl('https://example.com', 'contact')
    expect(result).toBe('https://example.com/contact')
  })

  it('should handle both baseUrl with trailing slash and path without leading slash', () => {
    const result = createAbsoluteUrl('https://example.com/', 'services')
    expect(result).toBe('https://example.com/services')
  })

  it('should remove trailing slash from final result', () => {
    const result = createAbsoluteUrl('https://example.com', '/blog/')
    expect(result).toBe('https://example.com/blog')
  })

  it('should handle empty path', () => {
    const result = createAbsoluteUrl('https://example.com', '')
    expect(result).toBe('https://example.com')
  })

  it('should handle root path', () => {
    const result = createAbsoluteUrl('https://example.com', '/')
    expect(result).toBe('https://example.com')
  })

  it('should handle complex paths with multiple segments', () => {
    const result = createAbsoluteUrl(
      'https://api.example.com',
      '/v1/users/123/posts',
    )
    expect(result).toBe('https://api.example.com/v1/users/123/posts')
  })

  it('should handle query parameters', () => {
    const result = createAbsoluteUrl(
      'https://example.com',
      '/search?q=test&page=1',
    )
    expect(result).toBe('https://example.com/search?q=test&page=1')
  })

  it('should handle fragments', () => {
    const result = createAbsoluteUrl(
      'https://example.com',
      '/docs#installation',
    )
    expect(result).toBe('https://example.com/docs#installation')
  })

  it('should handle port numbers in baseUrl', () => {
    const result = createAbsoluteUrl('http://localhost:3000', '/api/health')
    expect(result).toBe('http://localhost:3000/api/health')
  })

  it('should handle subdomains', () => {
    const result = createAbsoluteUrl(
      'https://api.subdomain.example.com',
      '/v2/data',
    )
    expect(result).toBe('https://api.subdomain.example.com/v2/data')
  })
})
