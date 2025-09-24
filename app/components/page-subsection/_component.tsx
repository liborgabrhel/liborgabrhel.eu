import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'section'>

export const PageSubsection = ({ className, children, ...rest }: Props) => {
  return (
    <section className={clsx(styles.subsection, className)} {...rest}>
      {children}
    </section>
  )
}
