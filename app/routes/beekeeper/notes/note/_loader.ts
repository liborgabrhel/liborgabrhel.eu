import { db } from '~/utils/db.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

export async function loader({ request, params }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)

  const { slug } = params

  const note = await db.note.findUniqueOrThrow({
    select: {
      title: true,
    },
    where: { slug },
  })

  return { baseUrl, note }
}
