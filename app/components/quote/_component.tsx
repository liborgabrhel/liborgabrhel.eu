import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import styles from './_styles.module.css'

type Props = {
  className?: string
  children: ReactNode
  author: string
}

export const Quote = ({ className, children, author, ...rest }: Props) => {
  return (
    <figure className={clsx(styles.quote, className)} {...rest}>
      <blockquote className={styles.blockquote}>
        <p className={styles.text}>“{children}”</p>
      </blockquote>
      <figcaption className={styles.attribution}>
        <p>— {author}</p>
      </figcaption>
    </figure>
  )
}
