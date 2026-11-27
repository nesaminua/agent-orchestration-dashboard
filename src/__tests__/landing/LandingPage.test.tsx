import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from '@/app/page'

describe('LandingPage', () => {
  it('renders the Hero section with headline and navigation', () => {
    render(<LandingPage />)

    expect(
      screen.getByText(/Orchestrate AI agent teams at scale/i)
    ).toBeInTheDocument()
    // The composed landing page must include Sign In and Start Orchestrating CTAs
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /start orchestrating/i })
    ).toBeInTheDocument()
  })

  it('renders the ArchitecturePatterns section', () => {
    render(<LandingPage />)

    expect(
      screen.getByText(/Built for any multi-agent architecture/i)
    ).toBeInTheDocument()
  })

  it('renders the FeaturesGrid section', () => {
    render(<LandingPage />)

    expect(
      screen.getByText(/Everything for multi-agent infrastructure/i)
    ).toBeInTheDocument()
  })

  it('renders the StatsSection', () => {
    render(<LandingPage />)

    expect(screen.getByText(/agent swarms deployed/i)).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    render(<LandingPage />)

    expect(screen.getByText(/\u00a9.*SwarmOps/i)).toBeInTheDocument()
  })

  it('renders the MiniTopology SVG', () => {
    const { container } = render(<LandingPage />)

    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })
})
