// noinspection JSUnusedGlobalSymbols

import type { ReactNode } from 'react'
import {
  href,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import '~/styles/globals.css'
import '~/styles/fonts.css'
import type { Route } from './+types/root'

export const links: Route.LinksFunction = () => [
  { href: 'https://rsms.me/', rel: 'preconnect' },
  { href: 'https://rsms.me/inter/inter.css', rel: 'stylesheet' },
]

export function Layout({ children }: { children: ReactNode }) {
  // noinspection HtmlRequiredTitleElement
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />

        {/* Environment variables body script - sets ENV for client */}
        <script src={href('/resources/env-script.js')} />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
