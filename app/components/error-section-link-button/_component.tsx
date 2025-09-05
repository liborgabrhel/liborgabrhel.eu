import { clsx } from 'clsx'
import { Link, type LinkProps } from 'react-router'
import styles from './_styles.module.css'

type Props = LinkProps

export const ErrorSectionLinkButton = ({
  className,
  children,
  ...rest
}: Props) => {
  return (
    <Link
      className={clsx(styles.linkButton, className)}
      prefetch="intent"
      viewTransition={true}
      {...rest}
    >
      {children}
    </Link>
  )
}
