import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'img'>

export const PolaroidPhoto = ({ src, alt, className, ...rest }: Props) => {
  return (
    <img
      alt={alt}
      className={clsx(styles.polaroidPhoto, className)}
      src={src}
      {...rest}
    />
  )
}
