import { href, useLocation } from 'react-router'

/**
 * Hook for determining the current subdirectory context.
 *
 * Analyzes the current pathname to determine if the user is in the
 * beekeeper or developer sections of the site. Useful for conditional
 * rendering, theming, and navigation logic.
 *
 * @returns Object containing boolean flags for each subdirectory
 *
 * @example
 * ```tsx
 * function Header() {
 *   const { isBeekeeperSubdirectory, isDeveloperSubdirectory } = useSubdirectory()
 *
 *   return (
 *     <header className={clsx(
 *       isBeekeeperSubdirectory && 'bee-theme',
 *       isDeveloperSubdirectory && 'dev-theme'
 *     )}>
 *       Header content
 *     </header>
 *   )
 * }
 * ```
 */
export function useSubdirectory() {
  const { pathname } = useLocation()

  const isBeekeeperSubdirectory = pathname.startsWith(href('/beekeeper'))
  const isDeveloperSubdirectory = pathname.startsWith(href('/developer'))
  const isContactSubdirectory = pathname.startsWith(href('/contact'))

  const isSubdirectory =
    isBeekeeperSubdirectory || isDeveloperSubdirectory || isContactSubdirectory

  return {
    isBeekeeperSubdirectory,
    isContactSubdirectory,
    isDeveloperSubdirectory,
    isSubdirectory,
  }
}
