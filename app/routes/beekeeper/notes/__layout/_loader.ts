import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)

  return { baseUrl }
}
