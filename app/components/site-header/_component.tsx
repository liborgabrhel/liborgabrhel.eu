import { clsx } from 'clsx'
import { SITE_NAME } from '~/constants/site'
import { useSubdirectory } from '~/hooks/use-subdirectory'
import styles from './_styles.module.css'

type Props = {
  className?: string
}

export const SiteHeader = ({ className }: Props) => {
  const { isDeveloperSubdirectory, isBeekeeperSubdirectory } = useSubdirectory()

  const Headline =
    isDeveloperSubdirectory || isBeekeeperSubdirectory ? 'p' : 'h1'

  return (
    <header className={clsx(styles.header, className)}>
      <section className={styles.content}>
        <Headline
          className={clsx(
            styles.headline,
            isDeveloperSubdirectory || isBeekeeperSubdirectory
              ? styles.headline_simple
              : styles.headline_default,
            isBeekeeperSubdirectory && styles.headline_beekeeper,
            isDeveloperSubdirectory && styles.headline_developer,
          )}
        >
          {SITE_NAME}
        </Headline>
        <p
          className={clsx(
            styles.subheadline,
            isDeveloperSubdirectory || isBeekeeperSubdirectory
              ? styles.subheadlineSimple
              : styles.subheadlineDefault,
          )}
        >
          <span
            className={clsx(
              isBeekeeperSubdirectory && styles.subheadlineHidden,
            )}
          >
            Frontend Developer
          </span>
          <span
            className={clsx(
              (isDeveloperSubdirectory || isBeekeeperSubdirectory) &&
                styles.subheadlineHidden,
            )}
          >
            {' & '}
          </span>
          <span
            className={clsx(
              isDeveloperSubdirectory && styles.subheadlineHidden,
            )}
          >
            Beekeeper
          </span>
        </p>
        {!(isDeveloperSubdirectory || isBeekeeperSubdirectory) && (
          <p className={styles.tagline}>
            <em>Buzz-worthy</em> websites, <em>bee-loved</em> hives
          </p>
        )}
      </section>
    </header>
  )
}
