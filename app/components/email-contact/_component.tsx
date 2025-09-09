import { clsx } from 'clsx'
import { useState } from 'react'
import styles from './_styles.module.css'

type Props = {
  address: string
  subject?: string
  body?: string
}

export const EmailContact = ({ address, subject, body }: Props) => {
  const [isCopied, setIsCopied] = useState(false)

  const mailtoUrl = `mailto:${address}${
    subject || body
      ? `?${[
          subject && `subject=${encodeURIComponent(subject)}`,
          body && `body=${encodeURIComponent(body)}`,
        ]
          .filter(Boolean)
          .join('&')}`
      : ''
  }`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email address:', err)
    }
  }

  return (
    <div className={styles.container}>
      <a className={styles.emailLink} href={mailtoUrl}>
        {address}
      </a>
      <button
        aria-label={`Copy email address ${address}`}
        className={styles.copyButton}
        disabled={isCopied}
        onClick={handleCopy}
        title={isCopied ? 'Copied!' : 'Copy email address'}
        type="button"
      >
        <span
          aria-hidden={isCopied}
          className={clsx(
            styles.copyText,
            isCopied ? styles.hidden : styles.visible,
          )}
        >
          Copy
        </span>
        <span
          aria-hidden={!isCopied}
          className={clsx(
            styles.copiedText,
            isCopied ? styles.visible : styles.hidden,
          )}
        >
          Copied
        </span>
      </button>
    </div>
  )
}
