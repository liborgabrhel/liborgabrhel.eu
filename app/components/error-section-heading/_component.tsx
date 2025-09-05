import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { useSubdirectory } from '~/hooks/use-subdirectory'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export function ErrorSectionHeading({ children, className }: Props) {
  const { isDeveloperSubdirectory, isBeekeeperSubdirectory } = useSubdirectory()

  const Heading =
    isDeveloperSubdirectory || isBeekeeperSubdirectory ? 'h1' : 'h2'

  return (
    <Heading className={clsx(styles.heading, className)}>{children}</Heading>
  )
}
