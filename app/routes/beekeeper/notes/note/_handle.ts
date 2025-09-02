import { href } from 'react-router'
import type { Breadcrumb, BreadcrumbMatch } from '~/types/breadcrumb'
import type { Route } from './+types/route'

type Match = BreadcrumbMatch<
  Route.ComponentProps['loaderData'],
  Route.ComponentProps['params']
>

export const handle = {
  breadcrumb: (match: Match): Breadcrumb => {
    const { slug } = match.params
    const label = match.loaderData?.note?.title ?? 'Not found'
    const path = href('/beekeeper/notes/:slug', { slug })

    return { label, path }
  },
}
