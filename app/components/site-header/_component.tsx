import { clsx } from 'clsx'
import { href, useLocation } from 'react-router'
import { SITE_NAME } from '~/constants/site'
import styles from './_styles.module.css'

type Props = {
  className?: string
  variant?: 'default' | 'simple'
}

export const SiteHeader = ({ className, variant = 'default' }: Props) => {
  const { pathname } = useLocation()

  const isBeekeeperPage = pathname.startsWith(href('/beekeeper'))
  const isDeveloperPage = pathname.startsWith(href('/developer'))

  const Headline = variant === 'default' ? 'h1' : 'p'

  return (
    <header className={clsx(styles.header, className)}>
      <section className={styles.content}>
        <Headline
          className={clsx(
            styles.headline,
            variant === 'default' && styles.headline_default,
            variant === 'simple' && styles.headline_simple,
            isBeekeeperPage && styles.headline_beekeeper,
            isDeveloperPage && styles.headline_developer,
          )}
        >
          {SITE_NAME}
        </Headline>
        <p
          className={clsx(
            styles.subheadline,
            variant === 'default' && styles.subheadlineDefault,
            variant === 'simple' && styles.subheadlineSimple,
          )}
        >
          <span className={clsx(isBeekeeperPage && styles.subheadlineHidden)}>
            Frontend Developer
          </span>
          <span
            className={clsx(
              (isDeveloperPage || isBeekeeperPage) && styles.subheadlineHidden,
            )}
          >
            {' & '}
          </span>
          <span className={clsx(isDeveloperPage && styles.subheadlineHidden)}>
            Beekeeper
          </span>
        </p>
        {variant === 'default' && (
          <p className={styles.tagline}>
            <em>Buzz-worthy</em> websites, <em>bee-loved</em> hives
          </p>
        )}
      </section>
    </header>
  )
}
