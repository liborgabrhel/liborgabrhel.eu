import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EmailContact } from './_component'

// Mock navigator.clipboard
const mockWriteText = vi.fn()

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
})

beforeEach(() => {
  mockWriteText.mockClear()
  mockWriteText.mockResolvedValue(undefined)
})

describe('EmailContact', () => {
  const defaultProps = {
    address: 'test@example.com',
  }

  it('renders email address as link', () => {
    render(<EmailContact {...defaultProps} />)

    const emailLink = screen.getByRole('link', { name: defaultProps.address })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', `mailto:${defaultProps.address}`)
  })

  it('renders copy button with correct accessibility attributes', () => {
    render(<EmailContact {...defaultProps} />)

    const copyButton = screen.getByRole('button', {
      name: `Copy email address ${defaultProps.address}`,
    })
    expect(copyButton).toBeInTheDocument()
    expect(copyButton).toHaveAttribute('type', 'button')
    expect(copyButton).toHaveAttribute('title', 'Copy email address')
  })

  it('creates mailto link with subject parameter', () => {
    const subject = 'Test Subject'
    render(<EmailContact {...defaultProps} subject={subject} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${defaultProps.address}?subject=${encodeURIComponent(subject)}`,
    )
  })

  it('creates mailto link with body parameter', () => {
    const body = 'Test email body'
    render(<EmailContact {...defaultProps} body={body} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${defaultProps.address}?body=${encodeURIComponent(body)}`,
    )
  })

  it('creates mailto link with both subject and body parameters', () => {
    const subject = 'Test Subject'
    const body = 'Test body'
    render(<EmailContact {...defaultProps} body={body} subject={subject} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${defaultProps.address}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    )
  })

  it('initially shows "Copy" text and hides "Copied" text', () => {
    render(<EmailContact {...defaultProps} />)

    const copyText = screen.getByText('Copy')
    const copiedText = screen.getByText('Copied')

    expect(copyText).toHaveAttribute('aria-hidden', 'false')
    expect(copiedText).toHaveAttribute('aria-hidden', 'true')
  })

  it('calls clipboard API with correct value and updates UI', async () => {
    render(<EmailContact {...defaultProps} />)

    const copyButton = screen.getByRole('button')
    fireEvent.click(copyButton)

    // Wait for clipboard API call and UI updates
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(defaultProps.address)
      expect(mockWriteText).toHaveBeenCalledTimes(1)
      expect(copyButton).toBeDisabled()
      expect(copyButton).toHaveAttribute('title', 'Copied!')
      expect(screen.getByText('Copy')).toHaveAttribute('aria-hidden', 'true')
      expect(screen.getByText('Copied')).toHaveAttribute('aria-hidden', 'false')
    })
  })

  it('handles special characters in subject and body', () => {
    const subject = 'Hello & Welcome!'
    const body = 'This is a test email with special chars: <>&"'

    render(<EmailContact {...defaultProps} body={body} subject={subject} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${defaultProps.address}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    )
  })
})
