// noinspection JSUnusedGlobalSymbols

import { href, Link } from 'react-router'
import { PageSeo } from '~/components/page-seo'
import { seo } from './_seo'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl, notes } = loaderData

  return (
    <>
      <PageSeo
        baseUrl={baseUrl}
        metaDescription={seo.metaDescription}
        metaRobots={seo.metaRobots}
        ogImageUrl={''}
        pagePath={seo.pagePath}
        pageTitle={seo.pageTitle}
        twitterImageUrl={''}
      />

      <h2>Bee Notes</h2>

      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link to={href('/beekeeper/notes/:slug', { slug: note.slug })}>
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
