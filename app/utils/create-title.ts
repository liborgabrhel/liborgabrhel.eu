import { SITE_NAME } from '~/constants/site'

/**
 * Creates a formatted page title by combining a page-specific title with the site name.
 *
 * @param title - The page-specific title to prepend. If undefined or empty, only the site name is returned.
 * @returns A formatted title string in the format "Page Title | Site Name" or just "Site Name" if no title provided.
 *
 * @example
 * ```typescript
 * const title = createTitle('About Us')
 * // Returns: 'About Us | Your Site Name'
 *
 * const fallbackTitle = createTitle(undefined)
 * // Returns: 'Your Site Name'
 * ```
 */
export const createTitle = (title = '') => {
  const trimmedTitle = title.trim()

  if (trimmedTitle === '') {
    return SITE_NAME
  }

  return `${trimmedTitle} | ${SITE_NAME}`
}
