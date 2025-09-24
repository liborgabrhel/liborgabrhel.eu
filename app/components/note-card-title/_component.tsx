import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'h3'>

export const NoteCardTitle = ({ children, className, ...rest }: Props) => {
  return (
    <h3 className={clsx(styles.noteCardTitle, className)} {...rest}>
      {children}
    </h3>
  )
}
