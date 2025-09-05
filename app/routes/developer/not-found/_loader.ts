import type { Route } from './+types/route'

export async function loader(_: Route.LoaderArgs) {
  throw new Response(null, {
    status: 404,
    statusText: 'No matching route in the router.',
  })
}
