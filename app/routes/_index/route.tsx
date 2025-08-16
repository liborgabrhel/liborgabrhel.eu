// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
import { PageSeo } from '~/components/page-seo'

export default function RouteComponent() {
  return (
    <>
      <PageSeo
        metaDescription={undefined}
        metaKeywords={undefined}
        metaRobots={undefined}
        ogImageUrl={undefined}
        pagePath={href('/')}
        pageTitle={'Frontend Developer & Beekeeper'}
        twitterImageUrl={undefined}
      />

      <h1>Libor Gabrhel</h1>
      <p>
        Buzz-worthy <strong>websites</strong>, bee-loved <strong>hives</strong>
      </p>
    </>
  )
}
