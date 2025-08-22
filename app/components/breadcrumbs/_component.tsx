import { clsx } from 'clsx'
import { NavLink, useMatches } from 'react-router'
import type { Match } from '~/types/match'
import { getBreadcrumbs } from '~/utils/breadcrumbs'
import styles from './_styles.module.css'

type Props = {
  className?: string
}

export const Breadcrumbs = ({ className }: Props) => {
  const matches = useMatches() as unknown as Match[]
  const breadcrumbs = getBreadcrumbs(matches)

  return (
    <nav className={clsx(styles.navigation, className)}>
      <ul className={styles.list}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li className={styles.list_item} key={breadcrumb.path}>
            <NavLink
              aria-current={
                breadcrumbs.length === index + 1 ? 'page' : undefined
              }
              className={({ isActive }) =>
                clsx(styles.link, isActive && styles.active)
              }
              end={true}
              to={breadcrumb.path}
              viewTransition={true}
            >
              {breadcrumb.label}
            </NavLink>
            {index < breadcrumbs.length - 1 && '/'}
          </li>
        ))}
      </ul>
    </nav>
  )
}
