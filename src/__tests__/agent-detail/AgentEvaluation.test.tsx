import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentEvaluation } from '@/components/agent-detail/AgentEvaluation'
import { evalResults } from '@/lib/mock-data'

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="bar-chart">{children}</svg>
  ),
  Bar: () => <g data-testid="bar" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: () => <g data-testid="tooltip" />,
  Legend: () => <g data-testid="legend" />,
  Cell: () => <g data-testid="cell" />,
}))

describe('AgentEvaluation', () => {
  it('renders test names from evalResults', () => {
    render(<AgentEvaluation results={[...evalResults]} />)

    expect(screen.getByText(/Email Drafting Quality/)).toBeInTheDocument()
    expect(screen.getByText(/Research Synthesis/)).toBeInTheDocument()
    expect(screen.getByText(/Code Analysis/)).toBeInTheDocument()
  })

  it('renders a regression alert/banner', () => {
    render(<AgentEvaluation results={[...evalResults]} />)

    // Research Synthesis: gpt-4o=91.5 vs claude=89.3 — regression scenario
    expect(screen.getByText(/regression/i)).toBeInTheDocument()
  })

  it('shows model names in comparison', () => {
    render(<AgentEvaluation results={[...evalResults]} />)

    expect(screen.getByText(/gpt-4o/)).toBeInTheDocument()
    expect(screen.getByText(/claude-3.5-sonnet/)).toBeInTheDocument()
  })
})
