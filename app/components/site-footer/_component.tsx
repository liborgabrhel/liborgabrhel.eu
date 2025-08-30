import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'footer'>

export const SiteFooter = ({ className, ...rest }: Props) => {
  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <p className={styles.copyright}>
        Two passions, one home. South Bohemia, 2025.
      </p>
    </footer>
  )
}
