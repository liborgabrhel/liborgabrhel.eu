import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'figure'>

export const PolaroidFrame = ({ children, className, ...rest }: Props) => {
  return (
    <figure className={clsx(styles.polaroidFrame, className)} {...rest}>
      {children}
    </figure>
  )
}
