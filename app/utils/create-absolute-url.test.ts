import { describe, expect, it } from 'vitest'
import { createAbsoluteUrl } from './create-absolute-url'

describe('createAbsoluteUrl', () => {
  it('should return a URL object with correct href', () => {
    const result = createAbsoluteUrl('https://example.com', '/api/users')
    expect(result).toBeInstanceOf(URL)
    expect(result.href).toBe('https://example.com/api/users')
  })

  it('should handle baseUrl with trailing slash', () => {
    const result = createAbsoluteUrl('https://example.com/', '/about')
    expect(result.href).toBe('https://example.com/about')
  })

  it('should handle path without leading slash', () => {
    const result = createAbsoluteUrl('https://example.com', 'contact')
    expect(result.href).toBe('https://example.com/contact')
  })

  it('should handle both baseUrl with trailing slash and path without leading slash', () => {
    const result = createAbsoluteUrl('https://example.com/', 'services')
    expect(result.href).toBe('https://example.com/services')
  })

  it('should handle path with trailing slash', () => {
    const result = createAbsoluteUrl('https://example.com', '/blog/')
    expect(result.href).toBe('https://example.com/blog')
  })

  it('should handle empty path', () => {
    const result = createAbsoluteUrl('https://example.com', '')
    expect(result.href).toBe('https://example.com/')
  })

  it('should handle root path', () => {
    const result = createAbsoluteUrl('https://example.com', '/')
    expect(result.href).toBe('https://example.com/')
  })

  it('should handle complex paths with multiple segments', () => {
    const result = createAbsoluteUrl(
      'https://api.example.com',
      '/v1/users/123/posts',
    )
    expect(result.href).toBe('https://api.example.com/v1/users/123/posts')
  })

  it('should handle query parameters', () => {
    const result = createAbsoluteUrl(
      'https://example.com',
      '/search?q=test&page=1',
    )
    expect(result.href).toBe('https://example.com/search?q=test&page=1')
  })

  it('should handle fragments', () => {
    const result = createAbsoluteUrl(
      'https://example.com',
      '/docs#installation',
    )
    expect(result.href).toBe('https://example.com/docs#installation')
  })

  it('should handle port numbers in baseUrl', () => {
    const result = createAbsoluteUrl('http://localhost:3000', '/api/health')
    expect(result.href).toBe('http://localhost:3000/api/health')
  })

  it('should handle subdomains', () => {
    const result = createAbsoluteUrl(
      'https://api.subdomain.example.com',
      '/v2/data',
    )
    expect(result.href).toBe('https://api.subdomain.example.com/v2/data')
  })

  it('should allow search params manipulation', () => {
    const result = createAbsoluteUrl('https://example.com', '/api/users')
    result.searchParams.set('page', '1')
    result.searchParams.set('limit', '10')
    expect(result.href).toBe('https://example.com/api/users?page=1&limit=10')
  })

  it('should provide access to URL components', () => {
    const result = createAbsoluteUrl('https://example.com:8080', '/api/users')
    expect(result.protocol).toBe('https:')
    expect(result.hostname).toBe('example.com')
    expect(result.port).toBe('8080')
    expect(result.pathname).toBe('/api/users')
  })

  it('should handle special characters in path', () => {
    const result = createAbsoluteUrl('https://example.com', '/users/john%20doe')
    expect(result.href).toBe('https://example.com/users/john%20doe')
  })
})
