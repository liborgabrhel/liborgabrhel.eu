// noinspection JSUnusedGlobalSymbols

import { Outlet } from 'react-router'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function LayoutRouteComponent() {
  return <Outlet />
}
