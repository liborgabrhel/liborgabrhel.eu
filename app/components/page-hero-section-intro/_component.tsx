import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { Paragraph } from '~/components/paragraph'
import styles from './_styles.module.css'

type Props = ComponentProps<typeof Paragraph>

export const PageHeroSectionIntro = ({ className, ...rest }: Props) => (
  <Paragraph className={clsx(styles.intro, className)} {...rest} />
)
