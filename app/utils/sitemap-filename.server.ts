import { z } from 'zod'

/**
 * Regular expression pattern for sitemap filenames
 */
const SITEMAP_FILENAME_PATTERN = /^sitemap-(\d+)\.xml$/

/**
 * Zod schema for sitemap filename validation
 */
export const sitemapFilenameSchema = z
  .string()
  .regex(SITEMAP_FILENAME_PATTERN, {
    message: 'Filename must match pattern: sitemap-{number}.xml',
  })

/**
 * Validate if a filename matches the sitemap pattern
 */
const isValidSitemapFilename = (filename: string): boolean => {
  return sitemapFilenameSchema.safeParse(filename).success
}

/**
 * Generate a sitemap filename for the given index
 */
export const createSitemapFilename = (index: number): string => {
  if (index < 0 || !Number.isInteger(index)) {
    throw new Error(
      `Sitemap index must be a non-negative integer (received: ${index})`,
    )
  }

  const filename = `sitemap-${index}.xml`

  // Validate the generated filename to ensure consistency
  if (!isValidSitemapFilename(filename)) {
    throw new Error(
      `Generated filename "${filename}" does not match expected pattern`,
    )
  }

  return filename
}

/**
 * Parse a sitemap filename and extract the index
 * Returns null if the filename doesn't match the expected pattern
 */
export const parseSitemapFilename = (filename: string): number | null => {
  if (!isValidSitemapFilename(filename)) {
    return null
  }

  const match = filename.match(SITEMAP_FILENAME_PATTERN)
  if (!match) {
    return null
  }

  return parseInt(match[1], 10)
}
