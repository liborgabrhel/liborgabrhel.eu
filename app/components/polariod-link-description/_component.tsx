import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'p'>

export const PolaroidLinkDescription = ({
  children,
  className,
  ...rest
}: Props) => {
  return (
    <p className={clsx(styles.description, className)} {...rest}>
      {children}
    </p>
  )
}
