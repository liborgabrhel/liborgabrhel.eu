import { clsx } from 'clsx'
import { Link, type LinkProps } from 'react-router'
import styles from './_styles.module.css'

type Props = LinkProps

export const LinkButton = ({ className, ...rest }: Props) => {
  return (
    <Link
      className={clsx(styles.linkButton, className)}
      prefetch="intent"
      viewTransition={true}
      {...rest}
    />
  )
}
