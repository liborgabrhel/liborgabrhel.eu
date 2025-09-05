import styles from './_styles.module.css'

type Props = {
  children: string
}

export function ErrorSectionStackTrace({ children }: Props) {
  return (
    <pre className={styles.preformatedText}>
      <code className={styles.code}>{children}</code>
    </pre>
  )
}
