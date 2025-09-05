import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export function ErrorSectionSubheading({ children, className }: Props) {
  return <p className={clsx(styles.subheading, className)}>{children}</p>
}
