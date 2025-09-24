import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'footer'> & {
  children: React.ReactNode
}

export const SiteFooter = ({ className, children, ...rest }: Props) => {
  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <p className={styles.copyright}>{children}</p>
    </footer>
  )
}
