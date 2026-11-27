import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatCard } from '@/components/dashboard/StatCard'

describe('StatCard', () => {
  it('renders the stat value', () => {
    render(
      <StatCard label="Total Messages" value="234,567" change={12} changeLabel="+12%" />
    )

    expect(screen.getByText('234,567')).toBeInTheDocument()
  })

  it('renders the stat label', () => {
    render(
      <StatCard label="Total Messages" value="234,567" change={12} changeLabel="+12%" />
    )

    expect(screen.getByText('Total Messages')).toBeInTheDocument()
  })

  it('shows up arrow indicator for positive change', () => {
    const { container } = render(
      <StatCard label="Total Messages" value="234,567" change={12} changeLabel="+12%" />
    )

    // Positive change should render an up arrow (either text arrow or SVG)
    const changeElement = screen.getByText(/\+12%/)
    expect(changeElement).toBeInTheDocument()

    // Should contain an up arrow indicator
    const arrows = container.querySelectorAll('[data-testid="change-indicator"]')
    expect(arrows.length).toBeGreaterThanOrEqual(1)
  })

  it('shows down arrow indicator for negative change', () => {
    const { container } = render(
      <StatCard label="Avg Latency" value="2.3s" change={-0.4} changeLabel="-0.4s" />
    )

    const changeElement = screen.getByText(/-0\.4s/)
    expect(changeElement).toBeInTheDocument()

    const arrows = container.querySelectorAll('[data-testid="change-indicator"]')
    expect(arrows.length).toBeGreaterThanOrEqual(1)
  })

  it('applies green color for positive changes when positive is good (e.g., messages up)', () => {
    const { container } = render(
      <StatCard
        label="Total Messages"
        value="234,567"
        change={12}
        changeLabel="+12%"
        positiveIsGood={true}
      />
    )

    // The change indicator container should have green styling
    const indicator = container.querySelector('[data-testid="change-indicator"]')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('text-green-400')
  })

  it('applies green color when latency goes down (negative change, positiveIsGood=false)', () => {
    const { container } = render(
      <StatCard
        label="Avg Latency"
        value="2.3s"
        change={-0.4}
        changeLabel="-0.4s"
        positiveIsGood={false}
      />
    )

    // Latency going down is good, so it should be green
    const indicator = container.querySelector('[data-testid="change-indicator"]')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('text-green-400')
  })

  it('applies red color when cost goes up (positive change, positiveIsGood=false)', () => {
    const { container } = render(
      <StatCard
        label="Daily Cost"
        value="$47.23"
        change={3.12}
        changeLabel="+$3.12"
        positiveIsGood={false}
      />
    )

    // Cost going up is bad, so it should be red
    const indicator = container.querySelector('[data-testid="change-indicator"]')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('text-red-400')
  })
})
