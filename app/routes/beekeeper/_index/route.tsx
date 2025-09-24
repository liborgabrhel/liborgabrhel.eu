// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { CallToActionSection } from '~/components/call-to-action-section'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { Link } from '~/components/link'
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
import { PolaroidFrame } from '~/components/polaroid-frame'
import { PolaroidPhoto } from '~/components/polaroid-photo'
import { Quote } from '~/components/quote'
import { QuoteAttribution } from '~/components/quote-attribution'
import { QuoteSection } from '~/components/quote-section'
import { SEARCH_PARAMS } from '~/constants/search-params'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import styles from './_styles.module.css'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl, notes } = loaderData

  const conatctUrlSearchParams = new URLSearchParams({
    [SEARCH_PARAMS.via.key]: SEARCH_PARAMS.via.values.beekeeper,
  })
  const contactUrl = `${href('/contact')}?${conatctUrlSearchParams.toString()}`

  const [isContactLinkHovered, setIsContactLinkHovered] = useState(false)
  const [isApiaryLinkHovered, setIsApiaryLinkHovered] = useState(false)
  const [isNotesLinkHovered, setIsNotesLinkHovered] = useState(false)

  const handleContactLinkHover = (isHovered: boolean) => () => {
    setIsContactLinkHovered(isHovered)
  }

  const handleApiaryLinkHover = (isHovered: boolean) => () => {
    setIsApiaryLinkHovered(isHovered)
  }

  const handleNotesLinkHover = (isHovered: boolean) => () => {
    setIsNotesLinkHovered(isHovered)
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
        <PageHeroSectionHeading>Life with Bees</PageHeroSectionHeading>
        <PageHeroSectionSubheading>
          The hives come first — the harvest is a gift.
        </PageHeroSectionSubheading>
        <PageHeroSectionIntro>
          I’m Libor, a beekeeper in South Bohemia. Each season brings something
          new, and for me beekeeping is about following the hive’s rhythm and
          balance with nature. Here I share glimpses of that journey.
        </PageHeroSectionIntro>
        <PolaroidFrame className={styles.heroPolaroid}>
          <PolaroidPhoto alt={''} src={''} />
        </PolaroidFrame>
      </PageHeroSection>

      <QuoteSection>
        <Quote>Colony fall… beekeeper rise.</Quote>
        <QuoteAttribution>Mr. Miyagi</QuoteAttribution>
      </QuoteSection>

      <PageSection>
        <PageSectionHeading>Where It Began</PageSectionHeading>
        <Paragraph className={styles.paragraph}>
          Beekeeping runs in the family — my grandfather kept hives long before
          I ever thought about it. In 2022 I decided to try for myself, starting
          small with a single Flow Hive and a full colony on ten frames. That
          very first year I had the joy of filling a few jars straight from the
          Flow frames — raw honey, harvested right in the garden.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          The following seasons brought more lessons than honey. I expanded with
          a second hive, but that colony didn’t make it — most likely due to
          poisoning. The next year I bought a replacement, but the season
          brought a different challenge. The bees stored mostly melezitose
          honey, which they couldn’t survive on through winter, and that time I
          lost them both.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          The next spring I started again with a new colony, but it soon lost
          its queen. The bees managed to raise another, and I also bought a
          split. Now I’m back on track — and curious what adventures the hives
          will bring next.
        </Paragraph>
      </PageSection>

      <PageSection>
        <PageSectionHeading>My Apiary</PageSectionHeading>
        <Paragraph className={styles.paragraph}>
          Every visit to the apiary starts the same — a smoker, a hive tool, and
          the sound of bees buzzing between the frames. What I find inside is
          never the same, and that’s what makes this little place worth
          exploring.
        </Paragraph>
        <PolaroidFrame className={styles.apiaryPolaroid}>
          <PolaroidPhoto alt={''} src={''} />
        </PolaroidFrame>
        <Link
          onMouseEnter={handleApiaryLinkHover(true)}
          onMouseLeave={handleApiaryLinkHover(false)}
          to={href('/beekeeper/apiary')}
          viewTransition={true}
        >
          Visit the Apiary
          <AnimatedBounce
            axis={'x'}
            from={0}
            isAnimating={isApiaryLinkHovered}
            to={-2}
          >
            →
          </AnimatedBounce>
        </Link>
      </PageSection>

      <PageSection>
        <PageSectionHeading>Bee Notes</PageSectionHeading>
        <Paragraph className={styles.paragraph}>
          Just like the apiary keeps me busy, the notebook keeps me honest. I
          jot down inspections, harvests, and the little lessons along the way —
          reminders of what worked, what failed, and what made me smile.
        </Paragraph>
        {notes.length > 0 && (
          <NoteCardLinkGroup className={styles.noteCardGroup}>
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
        )}
        <Link
          onMouseEnter={handleNotesLinkHover(true)}
          onMouseLeave={handleNotesLinkHover(false)}
          to={href('/beekeeper/notes')}
          viewTransition={true}
        >
          Read all notes
          <AnimatedBounce
            axis={'x'}
            from={0}
            isAnimating={isNotesLinkHovered}
            to={-2}
          >
            →
          </AnimatedBounce>
        </Link>
      </PageSection>

      <CallToActionSection>
        <Paragraph>
          Curious about my life with bees, or want to share your own?
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
