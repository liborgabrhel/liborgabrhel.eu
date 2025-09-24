import { clsx } from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
} & ComponentProps<typeof Link>

export const PolaroidLink = ({ className, children, ...rest }: Props) => {
  return (
    <li className={clsx(styles.listItem, className)}>
      <Link
        className={styles.link}
        prefetch={'intent'}
        viewTransition={true}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
}
