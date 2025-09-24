import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'blockquote'>

export const Quote = ({ className, children, ...rest }: Props) => {
  return (
    <blockquote className={clsx(styles.blockquote, className)} {...rest}>
      <p className={styles.text}>“{children}”</p>
    </blockquote>
  )
}
