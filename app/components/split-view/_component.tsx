import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'div'>

export const SplitView = ({ className, children, ...rest }: Props) => {
  return (
    <div className={clsx(styles.splitView, className)} {...rest}>
      {children}
    </div>
  )
}
