import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { PageSection } from '~/components/page-section'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export function ErrorSection({ children, className }: Props) {
  return (
    <PageSection className={clsx(styles.section, className)}>
      {children}
    </PageSection>
  )
}
