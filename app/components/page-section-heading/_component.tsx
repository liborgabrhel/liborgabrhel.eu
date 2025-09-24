import { clsx } from 'clsx'
import styles from './_styles.module.css'

type Props = {
  className?: string
  children: React.ReactNode
}

export const PageSectionHeading = ({ className, children }: Props) => {
  return <h2 className={clsx(styles.heading, className)}>{children}</h2>
}
