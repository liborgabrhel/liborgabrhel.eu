import { isRouteErrorResponse } from 'react-router'

type ErrorInfo = {
  message: string
  details: string
  stack?: string
}

/**
 * Hook for processing errors in React Router error boundaries.
 *
 * Transforms various error types into a consistent ErrorInfo object
 * with user-friendly messages for display in error UI components.
 *
 * @param error - The error object caught by the error boundary
 * @returns Structured error information with message, details, and optional stack trace
 *
 * @example
 * ```tsx
 * export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
 *   const { message, details, stack } = useErrorBoundaryError(error)
 *
 *   return (
 *     <section>
 *       <h2>{message}</h2>
 *       <p>{details}</p>
 *       {stack && <pre>{stack}</pre>}
 *     </section>
 *   )
 * }
 * ```
 */
export function useErrorBoundaryError(error: unknown): ErrorInfo {
  let message = 'Something went wrong'
  let details =
    'Please try refreshing the page or contact support if the problem persists.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = `${error.status}`
    details = error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = error.name
    details = error.message
    stack = error.stack
  }

  return { details, message, stack }
}
