/**
 * Extract the base URL from a request
 * @param request - The request object
 * @returns The origin (protocol + host) of the request URL
 */
export function getBaseUrl(request: Request): string {
  return new URL(request.url).origin
}
