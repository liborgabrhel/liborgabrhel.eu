// noinspection JSUnusedGlobalSymbols

import { useSearchParams } from 'react-router'
import { EmailContact } from '~/components/email-contact/_component'
import { ErrorSection } from '~/components/error-section'
import { ErrorSectionHeading } from '~/components/error-section-heading'
import { ErrorSectionStackTrace } from '~/components/error-section-stack-trace'
import { ErrorSectionSubheading } from '~/components/error-section-subheading'
import { PageHeroSection } from '~/components/page-hero-section'
import { PageHeroSectionHeading } from '~/components/page-hero-section-heading'
import { PageHeroSectionIntro } from '~/components/page-hero-section-intro'
import { PageSection } from '~/components/page-section'
import { PageSeo } from '~/components/page-seo'
import { Paragraph } from '~/components/paragraph'
import { Quote } from '~/components/quote'
import { QuoteSection } from '~/components/quote-section'
import { SEARCH_PARAMS } from '~/constants/search-params'
import { useErrorBoundaryError } from '~/hooks/use-error-boundary-error'
import {
  INTRO_PARAGRAPH,
  MAIL_BODY,
  MAIL_SUBJECT,
} from '~/routes/contact/_index/_constants'
import { seo } from './_seo'
import styles from './_styles.module.css'
import type { Via } from './_types'
import type { Route } from './+types/route'

export { loader } from './_loader'
export { meta } from './_meta'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData
  const [searchParams] = useSearchParams()
  const via = (searchParams.get(SEARCH_PARAMS.via.key) ??
    'default') as unknown as Via

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
        <PageHeroSectionHeading>Get in Touch</PageHeroSectionHeading>
        <PageHeroSectionIntro>{INTRO_PARAGRAPH[via]}</PageHeroSectionIntro>
      </PageHeroSection>

      <PageSection>
        <EmailContact
          address={'mail@liborgabrhel.eu'}
          body={MAIL_BODY[via]}
          subject={MAIL_SUBJECT[via]}
        />
        <Paragraph className={styles.note}>
          The email will open with a pre-filled subject and message — you can
          adjust or remove them before sending.
        </Paragraph>
      </PageSection>

      <QuoteSection>
        <Quote author={'Mr. Miyagi'}>One hand reach… other hand meet.</Quote>
      </QuoteSection>
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
