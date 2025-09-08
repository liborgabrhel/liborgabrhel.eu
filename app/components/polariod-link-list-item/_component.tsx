import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { AnimatedBounce } from '../animated-bounce'
import styles from './_styles.module.css'

type Props = ComponentProps<'li'>

export const PolaroidLinkListItem = ({
  children,
  className,
  ...rest
}: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      className={clsx(styles.listItem, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <AnimatedBounce
        axis="x"
        className={styles.arrow}
        from={0}
        isAnimating={isHovered}
        to={-2}
      >
        →
      </AnimatedBounce>
      {children}
    </li>
  )
}
