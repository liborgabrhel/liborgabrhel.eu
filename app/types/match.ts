import type { UIMatch } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export type Match<Data = unknown, Handle = unknown> = UIMatch<
  Data,
  Handle & { breadcrumb: (match?: unknown) => Breadcrumb }
>
