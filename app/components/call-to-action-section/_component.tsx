import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'div'>

export const CallToActionSection = ({
  className,
  children,
  ...rest
}: Props) => {
  return (
    <div className={clsx(styles.section, className)} {...rest}>
      <div className={styles.card}>{children}</div>
    </div>
  )
}
