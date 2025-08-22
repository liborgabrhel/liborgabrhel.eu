// noinspection JSUnusedGlobalSymbols

import { href } from 'react-router'
import { PageSeo } from '~/components/page-seo'
import { PolaroidLinkGroup } from '~/components/polariod-link-group'
import { PolaroidLink } from '~/components/polaroid-link'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

  return (
    <>
      <PageSeo
        baseUrl={baseUrl}
        metaDescription={undefined}
        metaRobots={undefined}
        ogImageUrl={undefined}
        pagePath={href('/')}
        pageTitle={'Frontend Developer & Beekeeper'}
        twitterImageUrl={undefined}
      />

      <PolaroidLinkGroup>
        <PolaroidLink
          caption={'Frontend Developer'}
          to={href('/developer')}
          viewTransition={true}
        />
        <PolaroidLink
          caption={'Beekeeper'}
          to={href('/beekeeper')}
          viewTransition={true}
        />
      </PolaroidLinkGroup>
    </>
  )
}
