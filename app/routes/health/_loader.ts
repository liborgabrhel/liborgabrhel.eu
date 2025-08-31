import type { Route } from './+types/route'

export async function loader(_: Route.LoaderArgs) {
  return new Response('OK', {
    headers: {
      'Content-Type': 'text/plain',
    },
    status: 200,
  })
}
