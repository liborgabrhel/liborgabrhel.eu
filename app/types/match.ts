import type { UIMatch } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export type Match = UIMatch<
  unknown,
  { breadcrumb: (match?: unknown) => Breadcrumb }
>
