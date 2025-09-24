import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'h3'>

export const EmptyStateHeading = ({ className, children, ...rest }: Props) => {
  return (
    <h3 className={clsx(styles.heading, className)} {...rest}>
      {children}
    </h3>
  )
}
