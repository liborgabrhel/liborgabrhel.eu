// noinspection JSUnusedGlobalSymbols

import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData

  return <>{note.title}</>
}
