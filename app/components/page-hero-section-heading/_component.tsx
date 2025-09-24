import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'h1'>

export const PageHeroSectionHeading = ({
  children,
  className,
  ...rest
}: Props) => (
  <h1 className={clsx(styles.heading, className)} {...rest}>
    {children}
  </h1>
)
