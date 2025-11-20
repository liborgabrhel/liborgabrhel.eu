import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'div'>

export const CallToActionSectionCard = ({
  className,
  children,
  ...rest
}: Props) => {
  return (
    <div className={clsx(styles.card, className)} {...rest}>
      {children}
    </div>
  )
}
