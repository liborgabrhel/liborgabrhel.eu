import { animated, useSpring } from '@react-spring/web'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import styles from './_styles.module.css'

type Props = ComponentProps<'li'>

export const PolaroidLinkListItem = ({
  children,
  className,
  ...rest
}: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const arrowSpring = useSpring({
    config: {
      friction: 26,
      tension: 220,
    },
    from: { x: 0 },
    loop: isHovered,
    to: async (next) => {
      if (isHovered) {
        await next({ x: -2 })
        await next({ x: 0 })
      } else {
        await next({ x: 0 })
      }
    },
  })

  return (
    <li
      className={clsx(styles.listItem, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <animated.span className={styles.arrow} style={arrowSpring}>
        →
      </animated.span>
      {children}
    </li>
  )
}
