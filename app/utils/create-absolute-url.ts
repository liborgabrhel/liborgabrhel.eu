/**
 * Creates an absolute URL by combining a base URL with a path.
 *
 * @param baseUrl - The base URL (e.g., 'https://example.com')
 * @param path - The path to append (e.g., '/api/users')
 * @returns A URL object for further manipulation
 *
 * @example
 * ```typescript
 * const url = createAbsoluteUrl('https://example.com', '/api/users')
 * console.log(url.href) // 'https://example.com/api/users'
 *
 * // Can manipulate search params
 * url.searchParams.set('page', '1')
 * console.log(url.href) // 'https://example.com/api/users?page=1'
 * ```
 */
export function createAbsoluteUrl(baseUrl: string, path: string) {
  // Remove trailing slash from path to avoid double slashes in root case
  const cleanPath = path.replace(/\/$/, '')
  return new URL(cleanPath, baseUrl)
}
