/**
 * Creates an absolute URL by combining a base URL with a path.
 *
 * @param baseUrl - The base URL (e.g., 'https://example.com')
 * @param path - The path to append (e.g., '/api/users')
 * @returns The combined absolute URL with trailing slash removed
 *
 * @example
 * ```typescript
 * const url = createAbsoluteUrl('https://example.com', '/api/users')
 * // Returns: 'https://example.com/api/users'
 *
 * const urlWithTrailingSlash = createAbsoluteUrl('https://example.com/', '/about')
 * // Returns: 'https://example.com/about'
 * ```
 */
export function createAbsoluteUrl(baseUrl: string, path: string) {
  // Remove trailing slash from baseUrl and leading slash from path to avoid double slashes
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')

  // Join with single slash and remove any trailing slash from final result
  return `${cleanBaseUrl}/${cleanPath}`.replace(/\/$/, '')
}
