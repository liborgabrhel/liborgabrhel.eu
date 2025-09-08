import { clsx } from 'clsx'
import styles from './_styles.module.css'

type Props = {
  className?: string
  children: React.ReactNode
}

export const Paragraph = ({ className, children }: Props) => {
  return <p className={clsx(styles.paragraph, className)}>{children}</p>
}
