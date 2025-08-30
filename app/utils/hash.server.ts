import { createHash } from 'node:crypto'

/**
 * Creates an SHA-256 hash of the provided content string.
 *
 * @param content - The string content to hash
 * @returns A hexadecimal string representation of the SHA-256 hash
 *
 * @example
 * ```typescript
 * const hash = createContentHash('Hello, World!')
 * // Returns: 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f'
 * ```
 */
export function createContentHash(content: string) {
  return createHash('sha256').update(content).digest('hex')
}
