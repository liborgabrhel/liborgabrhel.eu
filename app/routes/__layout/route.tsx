// noinspection JSUnusedGlobalSymbols

import { Outlet } from 'react-router'
import { SiteContent } from '~/components/site-content'
import { SiteFooter } from '~/components/site-footer'
import { SiteHeader } from '~/components/site-header'
import styles from './_styles.module.css'

export default function Layout() {
  return (
    <>
      <SiteHeader className={styles.site_header} />
      <SiteContent>
        <Outlet />
      </SiteContent>
      <SiteFooter>Two passions, one home. South Bohemia, 2025.</SiteFooter>
    </>
  )
}
