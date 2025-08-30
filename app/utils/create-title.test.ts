import { describe, expect, it } from 'vitest'
import { SITE_NAME } from '~/constants/site'
import { createTitle } from './create-title'

describe('createTitle', () => {
  it('should combine title with site name', () => {
    const result = createTitle('About Us')
    expect(result).toBe(`About Us | ${SITE_NAME}`)
  })

  it('should return only site name when title is undefined', () => {
    const result = createTitle(undefined)
    expect(result).toBe(SITE_NAME)
  })

  it('should trim whitespace from title', () => {
    const result = createTitle('  Contact  ')
    expect(result).toBe(`Contact | ${SITE_NAME}`)
  })

  it('should handle empty string as title', () => {
    const result = createTitle('')
    expect(result).toBe(SITE_NAME)
  })

  it('should handle title with only whitespace', () => {
    const result = createTitle('   ')
    expect(result).toBe(SITE_NAME)
  })

  it('should handle special characters in title', () => {
    const result = createTitle('API & Documentation')
    expect(result).toBe(`API & Documentation | ${SITE_NAME}`)
  })
})
