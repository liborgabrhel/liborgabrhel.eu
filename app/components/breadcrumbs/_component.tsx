import { clsx } from 'clsx'
import { href, NavLink, useMatches } from 'react-router'
import { getBreadcrumbs } from '~/utils/breadcrumbs'
import styles from './_styles.module.css'

type Props = {
  className?: string
}

export const Breadcrumbs = ({ className }: Props) => {
  const matches = useMatches()
  const breadcrumbs = getBreadcrumbs(matches)

  return (
    <nav className={clsx(styles.navigation, className)}>
      <ul className={styles.list}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isCurrentPage = breadcrumbs.length === index + 1
          const hasSeparator = !isCurrentPage
          const isBeekeeperPage = breadcrumb.path.startsWith(href('/beekeeper'))
          const isDeveloperPage = breadcrumb.path.startsWith(href('/developer'))

          return (
            <li className={styles.list_item} key={breadcrumb.path}>
              <NavLink
                aria-current={isCurrentPage ? 'page' : undefined}
                className={({ isActive }) =>
                  clsx(
                    styles.link,
                    isActive && styles.current,
                    isBeekeeperPage && styles.beekeeper_link,
                    isDeveloperPage && styles.developer_link,
                  )
                }
                end={true}
                to={breadcrumb.path}
                viewTransition={true}
              >
                {breadcrumb.label}
              </NavLink>
              {hasSeparator && <span className={styles.separator}>›</span>}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
