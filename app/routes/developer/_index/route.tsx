// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { CallToActionSection } from '~/components/call-to-action-section'
import { CallToActionSectionCard } from '~/components/call-to-action-section-card'
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

  const [isPortfolioLinkHovered, setIsPortfolioLinkHovered] = useState(false)
  const [isNotesLinkHovered, setIsNotesLinkHovered] = useState(false)

  const handlePortfolioLinkHover = (isHovered: boolean) => () => {
    setIsPortfolioLinkHovered(isHovered)
  }

  const handleNotesLinkHover = (isHovered: boolean) => () => {
    setIsNotesLinkHovered(isHovered)
  }

  const conatctUrlSearchParams = new URLSearchParams({
    [SEARCH_PARAMS.via.key]: SEARCH_PARAMS.via.values.developer,
  })
  const contactUrl = `${href('/contact')}?${conatctUrlSearchParams.toString()}`

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
        <PageHeroSectionHeading>Crafting for the web</PageHeroSectionHeading>
        <PageHeroSectionSubheading>
          From fine detail to full system — interfaces that work.
        </PageHeroSectionSubheading>
        <PageHeroSectionIntro>
          I’m Libor, a frontend developer working with React and TypeScript. My
          focus is on clarity, performance, and user experience in everything I
          create.
        </PageHeroSectionIntro>
        <PolaroidFrame className={styles.heroPolaroid}>
          <PolaroidPhoto alt={''} src={''} />
        </PolaroidFrame>
      </PageHeroSection>

      <QuoteSection>
        <Quote>Plan patient… build strong.</Quote>
        <QuoteAttribution>Mr. Miyagi</QuoteAttribution>
      </QuoteSection>

      <PageSection>
        <PageSectionHeading>The Journey</PageSectionHeading>
        <Paragraph>
          My journey with the web began in 2014, experimenting with small sites
          in HTML, CSS, and JavaScript. Soon I was trying out jQuery, Sass, and
          Pug, sharing prototypes on platforms like CodePen before moving on to
          simple presentation websites.
        </Paragraph>
        <Paragraph>
          In 2017 I joined the digital agency Argo22, where I took my first
          steps into React and quickly moved into both web and mobile projects.
          Over the years I gained hands-on experience across a wide range of
          work — from mobile apps and large-scale web platforms to email
          templates and even an Electron desktop app.
        </Paragraph>
        <Paragraph>
          In 2020 I joined Twisto, where I worked on Next.js applications
          powering the client app, payment gateways, and a merchant widget.
          Later, through personal projects, I expanded into full-stack with
          React Router, Prisma, and SQLite.
        </Paragraph>
        <Paragraph>
          Most recently I’ve been involved in a large-scale web presentation
          migration, where I dug deep into SEO, performance, and marketing
          strategies — bridging solid engineering with real business impact.
        </Paragraph>
      </PageSection>

      <PageSection>
        <PageSectionHeading>My Portfolio</PageSectionHeading>
        <Paragraph>
          Every project tells a story — the code, the process, the hurdles, and
          the result. From front-end craft to user experience, here’s where my
          work comes into focus.
        </Paragraph>
        <PolaroidFrame className={styles.portfolioPolaroid}>
          <PolaroidPhoto alt={''} src={''} />
        </PolaroidFrame>
        <Link
          onMouseEnter={handlePortfolioLinkHover(true)}
          onMouseLeave={handlePortfolioLinkHover(false)}
          to={href('/developer/portfolio')}
        >
          See My Work
          <AnimatedBounce
            axis={'x'}
            from={0}
            isAnimating={isPortfolioLinkHovered}
            to={-2}
          >
            →
          </AnimatedBounce>
        </Link>
      </PageSection>

      <PageSection>
        <PageSectionHeading>Dev Notes</PageSectionHeading>
        <Paragraph>
          Code evolves, and so do the lessons learned along the way. These notes
          capture experiments, solutions, and small discoveries — reminders of
          what worked, what didn’t, and what’s worth sharing.
        </Paragraph>
        {notes.length > 0 ? (
          <NoteCardLinkGroup className={styles.noteCardGroup}>
            {notes.map((note) => (
              <NoteCardLink
                key={note.id}
                to={href('/developer/notes/:slug', { slug: note.slug })}
              >
                <NoteCardTitle>{note.title}</NoteCardTitle>
                <NoteCardExcerpt>{note.excerpt}</NoteCardExcerpt>
              </NoteCardLink>
            ))}
          </NoteCardLinkGroup>
        ) : null}
        <Link
          onMouseEnter={handleNotesLinkHover(true)}
          onMouseLeave={handleNotesLinkHover(false)}
          to={href('/developer/notes')}
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
        <CallToActionSectionCard>
          <Paragraph>
            Have a question about my development work or a project in mind?
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
