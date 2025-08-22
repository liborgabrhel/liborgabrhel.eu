import { href } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export const handle = {
  breadcrumb: (): Breadcrumb => ({
    label: 'Developer',
    path: href('/developer'),
  }),
}
