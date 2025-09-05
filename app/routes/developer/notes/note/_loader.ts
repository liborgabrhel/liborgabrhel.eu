import { db } from '~/utils/db.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

export async function loader({ request, params }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)

  const { slug } = params

  const note = await db.note.findUnique({
    select: {
      title: true,
    },
    where: { slug },
  })

  if (note === null) {
    throw new Response(null, {
      status: 404,
      statusText: 'No matching route in the router.',
    })
  }

  return { baseUrl, note }
}
