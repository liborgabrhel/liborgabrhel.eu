export function createAbsoluteUrl(baseUrl: string, path: string) {
  return `${baseUrl}${path}`.replace(/\/$/, '')
}
