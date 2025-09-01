import { href } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'
import type { BreadcrumbMatch } from '~/types/match'
import type { Route } from './+types/route'

type Match = BreadcrumbMatch<
  Route.ComponentProps['loaderData'],
  Route.ComponentProps['params']
>

export const handle = {
  breadcrumb: (match: Match): Breadcrumb => {
    const { slug } = match.params

    console.log(`slug: ${slug}`)

    return {
      label: 'Dev Notes',
      path: href('/developer/notes/:slug', { slug }),
    }
  },
}
