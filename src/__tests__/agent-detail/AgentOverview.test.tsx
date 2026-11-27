import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentOverview } from '@/components/agent-detail/AgentOverview'
import { agents } from '@/lib/mock-data'

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="area-chart">{children}</svg>
  ),
  Area: () => <g data-testid="area" />,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="line-chart">{children}</svg>
  ),
  Line: () => <g data-testid="line" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: () => <g data-testid="tooltip" />,
  Sparkline: () => <svg data-testid="sparkline" />,
}))

const orchestrator = agents[0]

describe('AgentOverview', () => {
  it('renders agent name', () => {
    render(<AgentOverview agent={orchestrator} />)

    expect(screen.getByText('Orchestrator')).toBeInTheDocument()
  })

  it('renders agent model', () => {
    render(<AgentOverview agent={orchestrator} />)

    expect(screen.getByText('gpt-4o')).toBeInTheDocument()
  })

  it('shows uptime value', () => {
    render(<AgentOverview agent={orchestrator} />)

    expect(screen.getByText(/99\.98%/)).toBeInTheDocument()
  })

  it('shows latency value with ms suffix', () => {
    render(<AgentOverview agent={orchestrator} />)

    expect(screen.getByText(/34\s*ms/)).toBeInTheDocument()
  })

  it('shows success rate', () => {
    render(<AgentOverview agent={orchestrator} />)

    expect(screen.getByText(/99\.8/)).toBeInTheDocument()
  })
})
