// noinspection JSUnusedGlobalSymbols

import { Outlet } from 'react-router'
import { Breadcrumbs } from '~/components/breadcrumbs'
import { SiteContent } from '~/components/site-content'
import { SiteHeader } from '~/components/site-header'
import styles from './_styles.module.css'

export { handle } from './_handle'
export { loader } from './_loader'
export { meta } from './_meta'

export default function LayoutRouteComponent() {
  return (
    <>
      <SiteHeader className={styles.site_header} variant={'simple'} />
      <SiteContent className={styles.site_content}>
        <Breadcrumbs />
        <Outlet />
      </SiteContent>
    </>
  )
}
