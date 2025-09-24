import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export const PolaroidOverlay = ({ children, className }: Props) => {
  return (
    <div className={clsx(styles.polaroidOverlay, className)}>{children}</div>
  )
}
