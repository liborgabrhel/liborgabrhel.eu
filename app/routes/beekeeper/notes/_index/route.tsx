// noinspection JSUnusedGlobalSymbols

import { href, Link } from 'react-router'
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
        <PageHeroSectionHeading>Bee Notes</PageHeroSectionHeading>
      </PageHeroSection>

      <PageSection>
        <PageSectionHeading>
          A collection of notes and articles about beekeeping and related
          topics.
        </PageSectionHeading>

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
