import { clsx } from 'clsx'
import { PageSection } from '~/components/page-section'
import styles from './_styles.module.css'

type Props = {
  className?: string
  children: React.ReactNode
}

export const CallToActionSection = ({ className, children }: Props) => {
  return (
    <PageSection className={clsx(styles.section, className)}>
      <div className={styles.card}>{children}</div>
    </PageSection>
  )
}
