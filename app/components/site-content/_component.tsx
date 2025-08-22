import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export const SiteContent = ({ children, className }: Props) => {
  return <main className={clsx(styles.content, className)}>{children}</main>
}
