// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
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
import { PageHeroSection } from '~/components/page-hero-section'
import { PageHeroSectionHeading } from '~/components/page-hero-section-heading'
import { PageHeroSectionIntro } from '~/components/page-hero-section-intro'
import { PageHeroSectionSubheading } from '~/components/page-hero-section-subheading'
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

      <PageHeroSection>
        <PageHeroSectionHeading>Collected Notes</PageHeroSectionHeading>
        <PageHeroSectionSubheading>
          Fragments of a beekeeper’s journey.
        </PageHeroSectionSubheading>
        <PageHeroSectionIntro>
          Some notes come from the hives, others from the days around them.
          Together they mark the rhythm of my beekeeping life.
        </PageHeroSectionIntro>
      </PageHeroSection>

      <PageSection>
        <PageSectionHeading>Stories to Explore</PageSectionHeading>

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
