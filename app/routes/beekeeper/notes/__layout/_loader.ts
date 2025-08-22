import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = new URL(request.url).origin

  return { baseUrl }
}
