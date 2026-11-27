import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatsSection } from '@/components/landing/StatsSection'

describe('StatsSection', () => {
  it('renders 4 stat items', () => {
    render(<StatsSection />)

    const statLabels = [
      /agent swarms deployed/i,
      /inter-agent messages\/month/i,
      /avg agent-to-agent latency/i,
      /orchestrator uptime/i,
    ]

    statLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders "agent swarms deployed" label', () => {
    render(<StatsSection />)

    expect(screen.getByText(/agent swarms deployed/i)).toBeInTheDocument()
  })

  it('renders "inter-agent messages/month" label', () => {
    render(<StatsSection />)

    expect(
      screen.getByText(/inter-agent messages\/month/i)
    ).toBeInTheDocument()
  })

  it('renders "avg agent-to-agent latency" label', () => {
    render(<StatsSection />)

    expect(
      screen.getByText(/avg agent-to-agent latency/i)
    ).toBeInTheDocument()
  })

  it('renders "orchestrator uptime" label', () => {
    render(<StatsSection />)

    expect(screen.getByText(/orchestrator uptime/i)).toBeInTheDocument()
  })
})
