// noinspection JSUnusedGlobalSymbols

import { useState } from 'react'
import { href } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import { CallToActionSection } from '~/components/call-to-action-section'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { LinkButton } from '~/components/link-button'
import { List } from '~/components/list'
import { ListItem } from '~/components/list-item'
import { PageHeroSection } from '~/components/page-hero-section'
import { PageHeroSectionHeading } from '~/components/page-hero-section-heading'
import { PageHeroSectionIntro } from '~/components/page-hero-section-intro'
import { PageHeroSectionSubheading } from '~/components/page-hero-section-subheading'
import { PageSection } from '~/components/page-section'
import { PageSectionHeading } from '~/components/page-section-heading'
import { PageSeo } from '~/components/page-seo'
import { PageSubsection } from '~/components/page-subsection'
import { PageSubsectionHeading } from '~/components/page-subsection-heading'
import { Paragraph } from '~/components/paragraph'
import { PolaroidFrame } from '~/components/polaroid-frame'
import { PolaroidPhoto } from '~/components/polaroid-photo'
import { Quote } from '~/components/quote'
import { QuoteAttribution } from '~/components/quote-attribution'
import { QuoteSection } from '~/components/quote-section'
import { SplitView } from '~/components/split-view'
import { SEARCH_PARAMS } from '~/constants/search-params'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import { seo } from './_seo'
import styles from './_styles.module.css'
import type { Route } from './+types/route'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

  const [isContactLinkHovered, setIsContactLinkHovered] = useState(false)

  const handleContactLinkHover = (isHovered: boolean) => () => {
    setIsContactLinkHovered(isHovered)
  }

  const conatctUrlSearchParams = new URLSearchParams({
    [SEARCH_PARAMS.via.key]: SEARCH_PARAMS.via.values.beekeeper,
  })
  const contactUrl = `${href('/contact')}?${conatctUrlSearchParams.toString()}`

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
        <PageHeroSectionHeading>Inside the Apiary</PageHeroSectionHeading>
        <PageHeroSectionSubheading>
          Where hives, tools, and bees come together.
        </PageHeroSectionSubheading>
        <PageHeroSectionIntro>
          Step into my beekeeping space and see how I’ve shaped it over time.
          From hive types and frames to the tools I reach for most often, here’s
          a look at the setup that keeps my colonies healthy and thriving.
        </PageHeroSectionIntro>
        <PolaroidFrame className={styles.heroPolaroid}>
          <PolaroidPhoto alt={''} src={''} />
        </PolaroidFrame>
      </PageHeroSection>

      <QuoteSection>
        <Quote>Hive is house… bees make home.</Quote>
        <QuoteAttribution>Mr. Miyagi</QuoteAttribution>
      </QuoteSection>

      <PageSection>
        <PageSectionHeading>The Hives I Keep</PageSectionHeading>
        <Paragraph>
          I keep two Flow Hive 2+ setups based on the 10-frame Langstroth
          system, both adapted to suit my bees and my environment.
        </Paragraph>
        <PageSubsection>
          <PageSubsectionHeading>My Flow Hive 2+ Setup</PageSubsectionHeading>
          <SplitView>
            <PolaroidFrame className={styles.hivesPolaroid}>
              <PolaroidPhoto />
            </PolaroidFrame>
            <List>
              <ListItem>
                <strong>Stand</strong> with ant guards filled with vaseline
              </ListItem>
              <ListItem>
                <strong>Brood boxes</strong> (standard 1/1 or modified 2/3 size)
              </ListItem>
              <ListItem>
                <strong>Flow Super</strong> with 7 Flow Frames, used during the
                honey flow season and removed before autumn/winter
              </ListItem>
              <ListItem>
                <strong>Feeder spacer</strong> created from leftover box
                sections, placed between the roof and brood/honey boxes
              </ListItem>
              <ListItem>
                <strong>Roof</strong> reinforced and covered with asphalt
                roofing
              </ListItem>
              <ListItem>
                <strong>Extras</strong>: Flow entrance reducer, Flow weather
                guard
              </ListItem>
            </List>
          </SplitView>
        </PageSubsection>
      </PageSection>

      <PageSection>
        <PageSectionHeading>The Tools I Trust</PageSectionHeading>
        <Paragraph>
          These are the essentials I reach for most often in the apiary:
        </Paragraph>
        <SplitView>
          <PolaroidFrame className={styles.toolsPolaroid}>
            <PolaroidPhoto />
          </PolaroidFrame>
          <List>
            <ListItem>
              <strong>Smoker</strong> — fueled with dried lavender to start,
              then wooden pellets for steady smoke
            </ListItem>
            <ListItem>
              <strong>Hive chisel</strong> — my go-to tool for prying apart
              frames and boxes
            </ListItem>
            <ListItem>
              <strong>Bee jacket</strong> — light but protective clothing for
              working the hives
            </ListItem>
            <ListItem>
              <strong>Leather gloves</strong> — for those days when the bees are
              a little grumpy
            </ListItem>
            <ListItem>
              <strong>Super Lifter</strong> — Flow tool for safely lifting heavy
              honey supers
            </ListItem>
            <ListItem>
              <strong>Round roof feeder</strong> — provides supplemental feed
              when colonies need support
            </ListItem>
          </List>
        </SplitView>
        <Paragraph>
          Simple tools, each with a clear purpose, that make beekeeping smoother
          and safer for both me and the bees.
        </Paragraph>
      </PageSection>

      <QuoteSection>
        <Quote>Endure sting… receive gift.</Quote>
        <QuoteAttribution>Mr. Miyagi</QuoteAttribution>
      </QuoteSection>

      <PageSection>
        <PageSectionHeading>Meet the Bees</PageSectionHeading>
        <Paragraph>
          My colonies are built around the{' '}
          <strong>Carniolan honey bee (Apis mellifera carnica)</strong>, known
          locally as Kraňka. This lineage is valued for its adaptability, calm
          nature, and strong productivity.
        </Paragraph>
        <SplitView>
          <PolaroidFrame className={styles.beesPolaroid}>
            <PolaroidPhoto />
          </PolaroidFrame>
          <List>
            <ListItem>
              <strong>Gentle temperament</strong> — easy to work with and not
              prone to aggression.
            </ListItem>
            <ListItem>
              <strong>Strong spring build-up</strong> — the colonies expand
              quickly as the season begins.
            </ListItem>
            <ListItem>
              <strong>High yields</strong> — excellent at foraging both nectar
              and honeydew.
            </ListItem>
            <ListItem>
              <strong>Good comb builders</strong> — active in drawing foundation
              and expanding space.
            </ListItem>
            <ListItem>
              <strong>Resilient overwintering</strong> — healthy survival rates
              with resistance to common issues like nosema or chalkbrood.
            </ListItem>
          </List>
        </SplitView>
        <Paragraph>
          These traits make them reliable partners in the apiary — calm to
          handle, vigorous in growth, and capable of producing generous harvests
          when given enough room to thrive.
        </Paragraph>
      </PageSection>

      <CallToActionSection>
        <Paragraph>
          Want to talk bees, hives, or the tools that make it work?
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
