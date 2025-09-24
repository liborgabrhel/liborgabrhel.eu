import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'article'>

export const EmptyState = ({ className, children, ...rest }: Props) => {
  return (
    <article className={clsx(styles.card, className)} {...rest}>
      {children}
    </article>
  )
}
