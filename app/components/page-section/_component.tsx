import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'section'>

export const PageSection = ({ children, className, ...rest }: Props) => {
  return (
    <section className={clsx(styles.section, className)} {...rest}>
      {children}
    </section>
  )
}
