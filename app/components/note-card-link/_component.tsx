import { clsx } from 'clsx'
import { type ComponentProps, useState } from 'react'
import { Link } from 'react-router'
import { AnimatedBounce } from '~/components/animated-bounce'
import styles from './_styles.module.css'

type Props = ComponentProps<typeof Link>

export const NoteCardLink = ({ children, className, ...rest }: Props) => {
  const [isLinkHovered, setIsLinkHovered] = useState(false)

  const handleLinkHover = (isHovered: boolean) => () => {
    setIsLinkHovered(isHovered)
  }

  return (
    <li className={styles.listItem}>
      <Link
        className={clsx(styles.link, className)}
        onMouseEnter={handleLinkHover(true)}
        onMouseLeave={handleLinkHover(false)}
        prefetch="intent"
        viewTransition={true}
        {...rest}
      >
        {children}
        <span className={styles.cta}>
          Read more
          <AnimatedBounce
            axis={'x'}
            from={0}
            isAnimating={isLinkHovered}
            to={-2}
          >
            →
          </AnimatedBounce>
        </span>
      </Link>
    </li>
  )
}
