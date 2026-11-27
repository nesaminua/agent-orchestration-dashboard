import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UtilizationHeatmap } from '@/components/dashboard/UtilizationHeatmap'
import { heatmapData, agents } from '@/lib/mock-data'

describe('UtilizationHeatmap', () => {
  it('renders the heatmap container', () => {
    const { container } = render(
      <UtilizationHeatmap data={heatmapData} agents={agents} />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('shows all 8 agent names', () => {
    render(<UtilizationHeatmap data={heatmapData} agents={agents} />)

    expect(screen.getByText('Orchestrator')).toBeInTheDocument()
    expect(screen.getByText('Research Agent')).toBeInTheDocument()
    expect(screen.getByText('Writer Agent')).toBeInTheDocument()
    expect(screen.getByText('Tool Executor')).toBeInTheDocument()
    expect(screen.getByText('Knowledge Agent')).toBeInTheDocument()
    expect(screen.getByText('Reviewer Agent')).toBeInTheDocument()
    expect(screen.getByText('Router Agent')).toBeInTheDocument()
    expect(screen.getByText('Output Agent')).toBeInTheDocument()
  })

  it('renders 192 heatmap cells (8 agents x 24 hours)', () => {
    const { container } = render(
      <UtilizationHeatmap data={heatmapData} agents={agents} />
    )

    const cells = container.querySelectorAll('[data-testid="heatmap-cell"]')
    expect(cells).toHaveLength(192)
  })

  it('contains hour labels', () => {
    render(<UtilizationHeatmap data={heatmapData} agents={agents} />)

    // Should show at least some hour labels (0, 6, 12, 18 or 00, 06, 12, 18)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
  })

  it('contains a heading with "Utilization" or "Heatmap"', () => {
    render(<UtilizationHeatmap data={heatmapData} agents={agents} />)

    expect(
      screen.getByText(/utilization|heatmap/i)
    ).toBeInTheDocument()
  })
})
