import type { Match } from '~/types/match'

export const getBreadcrumbs = (matches: Match[]) => {
  return matches
    .filter(({ handle }) => Boolean(handle) && 'breadcrumb' in handle)
    .map((match) => match.handle.breadcrumb(match))
}
