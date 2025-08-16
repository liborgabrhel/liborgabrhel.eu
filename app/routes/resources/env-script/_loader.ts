import { createContentHash } from '~/utils/hash.server'

export async function loader() {
  const script = `window.ENV = ${JSON.stringify(ENV)};`

  const contentHash = createContentHash(script)

  return new Response(script, {
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 1 year
      'Content-Encoding': 'UTF-8',
      'Content-Type': 'application/javascript',
      ETag: `"${contentHash}"`,
    },
  })
}
