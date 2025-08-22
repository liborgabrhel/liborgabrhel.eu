// noinspection JSUnusedGlobalSymbols

import { href, Link } from 'react-router'
import { PageSeo } from '~/components/page-seo'
import { seo } from './_seo'
import type { Route } from './+types/route'

export { loader } from './_loader'

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData

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

      <ul>
        <li>
          <Link to={href('/developer/portfolio')} viewTransition={true}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link to={href('/developer/notes')} viewTransition={true}>
            Dev Notes
          </Link>
        </li>
      </ul>
    </>
  )
}
