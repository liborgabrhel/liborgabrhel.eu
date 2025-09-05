import { db } from '~/utils/db.server'
import { getBaseUrl } from '~/utils/url.server'
import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request)

  const notes = await db.note.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      slug: true,
      title: true,
    },
    where: {
      type: 'DEVELOPER',
    },
  })

  return { baseUrl, notes }
}
