import { href } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export const handle = {
  breadcrumb: (): Breadcrumb => ({
    label: 'Bee Notes',
    path: href('/beekeeper/notes'),
  }),
}
