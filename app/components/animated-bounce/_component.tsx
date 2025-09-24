import { animated, useSpring } from '@react-spring/web'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const shouldAnimate = isAnimating && !prefersReducedMotion

  const bounceSpring = useSpring({
    config: {
      friction: 26,
      tension: 220,
    },
    from: { [axis]: from },
    loop: shouldAnimate,
    to: async (next) => {
      if (shouldAnimate) {
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
