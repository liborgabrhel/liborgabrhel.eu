// noinspection JSUnusedGlobalSymbols

import { Outlet } from 'react-router'
import { Breadcrumbs } from '~/components/breadcrumbs'
import { SiteContent } from '~/components/site-content'
import { SiteFooter } from '~/components/site-footer'
import { SiteHeader } from '~/components/site-header'
import styles from './_styles.module.css'

export { handle } from './_handle'

export default function LayoutRouteComponent() {
  return (
    <>
      <SiteHeader className={styles.siteHeader} />
      <SiteContent className={styles.siteContent}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <Outlet />
      </SiteContent>
      <SiteFooter>Two passions, one home. South Bohemia, 2025.</SiteFooter>
    </>
  )
}
