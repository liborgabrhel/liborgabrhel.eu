// noinspection JSUnusedGlobalSymbols

import { href, Link } from 'react-router'
import { EmptyState } from '~/components/empty-state'
import { EmptyStateDescription } from '~/components/empty-state-description'
import { EmptyStateHeading } from '~/components/empty-state-heading'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { NoteCardExcerpt } from '~/components/note-card-excerpt'
import { NoteCardLink } from '~/components/note-card-link'
import { NoteCardLinkGroup } from '~/components/note-card-link-group'
import { NoteCardTitle } from '~/components/note-card-title'
import { PageSection } from '~/components/page-section'
import { PageSectionHeading } from '~/components/page-section-heading'
import { PageSeo } from '~/components/page-seo'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
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

      <PageSection>
        <PageSectionHeading>Fragments to Explore</PageSectionHeading>

        {notes.length > 0 ? (
          <NoteCardLinkGroup>
            {notes.map((note) => (
              <NoteCardLink
                key={note.id}
                to={href('/beekeeper/notes/:slug', { slug: note.slug })}
              >
                <NoteCardTitle>{note.title}</NoteCardTitle>
                <NoteCardExcerpt>{note.excerpt}</NoteCardExcerpt>
              </NoteCardLink>
            ))}
          </NoteCardLinkGroup>
        ) : (
          <EmptyState>
            <EmptyStateHeading>The hive is quiet for now</EmptyStateHeading>
            <EmptyStateDescription>
              No stories have taken shape. In time, they’ll gather here — like
              nectar in the cells.
            </EmptyStateDescription>
          </EmptyState>
        )}
      </PageSection>
    </>
  )
}

export function ErrorBoundary({ error }: { error: Route.ErrorBoundaryProps }) {
  const { message, details, stack } = useErrorBoundaryError(error)

  return (
    <ErrorSection>
      <ErrorSectionHeading>{message}</ErrorSectionHeading>
      <ErrorSectionSubheading>{details}</ErrorSectionSubheading>
      {stack && <ErrorSectionStackTrace>{stack}</ErrorSectionStackTrace>}
    </ErrorSection>
  )
}
