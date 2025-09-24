import { clsx } from 'clsx'
import { type LinkProps, Link as RouterLink } from 'react-router'
import styles from './_styles.module.css'

type Props = LinkProps

export const Link = ({
  children,
  className,
  prefetch = 'intent',
  viewTransition = true,
  ...rest
}: Props) => {
  return (
    <RouterLink
      className={clsx(styles.link, className)}
      prefetch={prefetch}
      viewTransition={viewTransition}
      {...rest}
    >
      {children}
    </RouterLink>
  )
}
