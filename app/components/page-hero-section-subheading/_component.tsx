import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'p'>

export const PageHeroSectionSubheading = ({
  children,
  className,
  ...rest
}: Props) => (
  <p className={clsx(styles.subheading, className)} {...rest}>
    {children}
  </p>
)
