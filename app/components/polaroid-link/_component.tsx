import { clsx } from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './_styles.module.css'

type Props = {
  imageAlt?: string
  caption: ReactNode
  imageUrl?: string
} & Omit<ComponentProps<typeof Link>, 'children'>

export const PolaroidLink = ({
  className,
  imageAlt = '',
  caption,
  imageUrl,
  ...rest
}: Props) => {
  return (
    <li className={clsx(styles.listItem, className)}>
      <Link className={styles.link} {...rest}>
        <figure className={styles.polaroid}>
          <img
            alt={imageAlt}
            aria-hidden={true}
            className={styles.photo}
            src={imageUrl}
          />
          <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
      </Link>
    </li>
  )
}
