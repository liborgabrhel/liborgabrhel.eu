import type { Params, UIMatch } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export type BreadcrumbHandle = {
  breadcrumb: (match: UIMatch) => Breadcrumb
}

export interface BreadcrumbMatch<
  TData = unknown,
  TParams extends Params = Params,
> extends UIMatch<TData, BreadcrumbHandle> {
  loaderData: TData
  params: TParams
}

export interface BreadcrumbCapableMatch<TData = unknown>
  extends UIMatch<TData, BreadcrumbHandle> {
  handle: BreadcrumbHandle
}
