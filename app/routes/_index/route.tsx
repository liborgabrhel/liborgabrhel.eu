// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
import { PageSeo } from '~/components/page-seo'
import { Welcome } from '~/welcome/welcome'

export default function RouteComponent() {
  return (
    <>
      <PageSeo
        metaDescription={undefined}
        metaKeywords={undefined}
        metaRobots={undefined}
        ogImageUrl={undefined}
        pagePath={href('/')}
        pageTitle={'Personal Website'}
        twitterImageUrl={undefined}
      />

      <Welcome />
    </>
  )
}
