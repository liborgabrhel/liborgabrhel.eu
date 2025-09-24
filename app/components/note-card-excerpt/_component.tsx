import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'p'>

export const NoteCardExcerpt = ({ children, className, ...rest }: Props) => {
  return (
    <p className={clsx(styles.noteCardExcerpt, className)} {...rest}>
      {children}
    </p>
  )
}
