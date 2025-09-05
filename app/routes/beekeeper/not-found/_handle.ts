import { href } from 'react-router'
import type { Breadcrumb, BreadcrumbMatch } from '~/types/breadcrumb'
import type { Route } from './+types/route'

type Match = BreadcrumbMatch<
  Route.ComponentProps['loaderData'],
  Route.ComponentProps['params']
>

export const handle = {
  breadcrumb: (match: Match): Breadcrumb => {
    const label = 'Not found'
    const { '*': splatPath } = match.params
    const path = href('/beekeeper/*', { '*': splatPath })

    return { label, path }
  },
}
