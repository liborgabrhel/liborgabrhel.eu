import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'figcaption'>

export const QuoteAttribution = ({ className, children, ...rest }: Props) => {
  return (
    <figcaption className={clsx(styles.attribution, className)} {...rest}>
      <p>— {children}</p>
    </figcaption>
  )
}
