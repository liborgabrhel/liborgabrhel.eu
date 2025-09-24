import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'ul'>

export const NoteCardLinkGroup = ({ children, className, ...rest }: Props) => {
  return (
    <ul className={clsx(styles.noteCardLinkGroup, className)} {...rest}>
      {children}
    </ul>
  )
}
