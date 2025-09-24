import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'figure'>

export const QuoteSection = ({ children, className, ...rest }: Props) => {
  return (
    <figure className={clsx(styles.section, className)} {...rest}>
      {children}
    </figure>
  )
}
