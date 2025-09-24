import { clsx } from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import { PageSection } from '~/components/page-section'
import styles from './_styles.module.css'

type Props = {
  children: ReactNode
  className?: string
} & ComponentProps<'section'>

export const PageHeroSection = ({ children, className, ...rest }: Props) => (
  <PageSection className={clsx(styles.heroSection, className)} {...rest}>
    {children}
  </PageSection>
)
