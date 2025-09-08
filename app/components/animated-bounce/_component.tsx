import { animated, useSpring } from '@react-spring/web'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './_styles.module.css'

type Props = {
  axis: 'x' | 'y'
  from: number
  to: number
  isAnimating: boolean
  className?: string
} & ComponentProps<'span'>

export const AnimatedBounce = ({
  axis,
  from,
  to,
  isAnimating,
  className,
  children,
  ...rest
}: Props) => {
  const bounceSpring = useSpring({
    config: {
      friction: 26,
      tension: 220,
    },
    from: { [axis]: from },
    loop: isAnimating,
    to: async (next) => {
      if (isAnimating) {
        await next({ [axis]: to })
        await next({ [axis]: from })
      } else {
        await next({ [axis]: from })
      }
    },
  })

  return (
    <animated.span
      className={clsx(styles.bounce, className)}
      style={bounceSpring}
      {...rest}
    >
      {children}
    </animated.span>
  )
}
