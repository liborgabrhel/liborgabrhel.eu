import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'li'>

export const PolaroidLinkListItem = ({
  children,
  className,
  ...rest
}: Props) => {
  return (
    <li className={clsx(styles.listItem, className)} {...rest}>
      {children}
    </li>
  )
}
