import type { Route } from './+types/route'

export async function loader(_: Route.LoaderArgs) {
  throw new Response(null, {
    status: 404,
    statusText: 'The waggle dance gave wrong directions.',
  })
}
