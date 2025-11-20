// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { CallToActionSection } from '~/components/call-to-action-section'
import { CallToActionSectionCard } from '~/components/call-to-action-section-card'
import { EmptyState } from '~/components/empty-state'
import { EmptyStateDescription } from '~/components/empty-state-description'
import { EmptyStateHeading } from '~/components/empty-state-heading'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
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
import { Paragraph } from '~/components/paragraph'
import { SEARCH_PARAMS } from '~/constants/search-params'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl, notes } = loaderData

  const contactUrlSearchParams = new URLSearchParams({
    [SEARCH_PARAMS.via.key]: SEARCH_PARAMS.via.values.beekeeper,
  })
  const contactUrl = `${href('/contact')}?${contactUrlSearchParams.toString()}`

  const [isContactLinkHovered, setIsContactLinkHovered] = useState(false)

  const handleContactLinkHover = (isHovered: boolean) => () => {
    setIsContactLinkHovered(isHovered)
  }

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

      <CallToActionSection>
        <CallToActionSectionCard>
          <Paragraph>
            Every beekeeper carries their own stories — want to share yours?
          </Paragraph>
          <LinkButton
            onMouseEnter={handleContactLinkHover(true)}
            onMouseLeave={handleContactLinkHover(false)}
            to={contactUrl}
          >
            Contact me
            <AnimatedBounce
              axis={'x'}
              from={0}
              isAnimating={isContactLinkHovered}
              to={-2}
            >
              →
            </AnimatedBounce>
          </LinkButton>
        </CallToActionSectionCard>
      </CallToActionSection>
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
