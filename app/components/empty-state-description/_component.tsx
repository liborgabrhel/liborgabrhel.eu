import type { ComponentProps } from 'react'
import { clsx } from 'clsx'
import styles from './_styles.module.css'

type Props = ComponentProps<'p'>

export const EmptyStateDescription = ({
  className,
  children,
  ...rest
}: Props) => {
  return (
    <p className={clsx(styles.description, className)} {...rest}>
      {children}
    </p>
  )
}
