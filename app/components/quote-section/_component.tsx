import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { PageSection } from '~/components/page-section'
import styles from './_styles.module.css'

type Props = {
  className?: string
  children: ReactNode
}

export const QuoteSection = ({ children, className }: Props) => {
  return (
    <PageSection className={clsx(styles.section, className)}>
      {children}
    </PageSection>
  )
}
