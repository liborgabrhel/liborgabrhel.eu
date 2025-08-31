import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'ul'>

export const PolaroidLinkList = ({ children, className, ...rest }: Props) => {
  return (
    <ul className={clsx(styles.list, className)} {...rest}>
      {children}
    </ul>
  )
}
