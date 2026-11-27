import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturesGrid } from '@/components/landing/FeaturesGrid'

describe('FeaturesGrid', () => {
  it('renders section title "Everything for multi-agent infrastructure"', () => {
    render(<FeaturesGrid />)

    expect(
      screen.getByText(/Everything for multi-agent infrastructure/i)
    ).toBeInTheDocument()
  })

  it('renders 6 feature cards', () => {
    render(<FeaturesGrid />)

    const featureTitles = [
      'Agent Topology Map',
      'Orchestration Workflows',
      'Real-Time Monitoring',
      'Message Tracing',
      'Auto-Scaling',
      'Human-in-the-Loop',
    ]

    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('each card has a title and description', () => {
    render(<FeaturesGrid />)

    // Verify at least one feature has both title and description
    const title = screen.getByText('Agent Topology Map')
    expect(title).toBeInTheDocument()

    // The parent card should contain description text too
    const card = title.closest('[data-testid]') ?? title.parentElement
    expect(card).toBeTruthy()
    expect(card?.textContent?.length).toBeGreaterThan(
      'Agent Topology Map'.length
    )
  })

  it('feature titles include all required titles', () => {
    render(<FeaturesGrid />)

    expect(screen.getByText('Agent Topology Map')).toBeInTheDocument()
    expect(screen.getByText('Orchestration Workflows')).toBeInTheDocument()
    expect(screen.getByText('Real-Time Monitoring')).toBeInTheDocument()
    expect(screen.getByText('Message Tracing')).toBeInTheDocument()
    expect(screen.getByText('Auto-Scaling')).toBeInTheDocument()
    expect(screen.getByText('Human-in-the-Loop')).toBeInTheDocument()
  })
})
