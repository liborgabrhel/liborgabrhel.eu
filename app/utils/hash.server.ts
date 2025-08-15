import { createHash } from 'node:crypto'

export function createContentHash(content: string) {
  return createHash('sha256').update(content).digest('hex')
}
