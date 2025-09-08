// noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols

import { z } from 'zod'
import { ENV_KEYS } from '~/constants/env'

const schema = z.object({
  [ENV_KEYS.NODE_ENV]: z.enum([
    'production',
    'development',
    'staging',
  ] as const),
  [ENV_KEYS.DATABASE_PATH]: z.string(),
  [ENV_KEYS.DATABASE_URL]: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function initEnv() {
  const result = schema.safeParse(process.env)

  if (!result.success) {
    console.error(
      'Invalid environment variables:',
      z.flattenError(result.error).fieldErrors,
    )
    throw new Error('Invalid environment variables')
  }

  return
}

/**
 * Returns a subset of environment variables that are safe to expose to the client.
 *
 * This function is used in two contexts:
 * 1. Server-side: To populate the global.ENV object
 * 2. Client-side: To populate the window.ENV object
 *
 * SECURITY WARNING: Only add environment variables that are safe for public exposure.
 * Never include API keys, secrets, or sensitive credentials.
 *
 * @returns Client-safe environment variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
