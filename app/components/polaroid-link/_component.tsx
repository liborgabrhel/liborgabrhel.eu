import { clsx } from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './_styles.module.css'

type Props = {
  imageAlt?: string
  imageUrl?: string
  overlay?: ReactNode
} & ComponentProps<typeof Link>

export const PolaroidLink = ({
  className,
  imageAlt = '',
  imageUrl,
  overlay,
  children,
  ...rest
}: Props) => {
  return (
    <li className={clsx(styles.listItem, className)}>
      <Link
        className={styles.link}
        prefetch={'intent'}
        viewTransition={true}
        {...rest}
      >
        <figure className={styles.polaroid}>
          <img
            alt={imageAlt}
            aria-hidden={true}
            className={styles.photo}
            src={imageUrl}
          />
          <div className={styles.overlay}>{overlay}</div>
        </figure>
        {children}
      </Link>
    </li>
  )
}
