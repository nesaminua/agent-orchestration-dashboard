import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/landing/Footer'

describe('Footer', () => {
  it('renders footer with "SwarmOps" text', () => {
    render(<Footer />)

    expect(screen.getByText(/SwarmOps/i)).toBeInTheDocument()
  })

  it('renders navigation links (Docs, API, Pricing, Status, GitHub)', () => {
    render(<Footer />)

    expect(screen.getByText('Docs')).toBeInTheDocument()
    expect(screen.getByText('API')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)

    expect(screen.getByText(/\u00a9.*SwarmOps/i)).toBeInTheDocument()
  })
})
