import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { Paragraph } from '~/components/paragraph'
import styles from './_styles.module.css'

type Props = ComponentProps<'li'>

export const ListItem = ({ className, children, ...rest }: Props) => {
  return (
    <li className={clsx(styles.listItem, className)} {...rest}>
      <Paragraph className={styles.paragraph}>{children}</Paragraph>
    </li>
  )
}
