import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'h2'>

export const PolaroidLinkHeading = ({
  children,
  className,
  ...rest
}: Props) => {
  return (
    <h2 className={clsx(styles.heading, className)} {...rest}>
      {children}
    </h2>
  )
}
