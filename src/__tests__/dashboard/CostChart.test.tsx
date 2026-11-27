import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CostChart } from '@/components/dashboard/CostChart'
import { costByAgent } from '@/lib/mock-data'

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

describe('CostChart', () => {
  it('renders the chart container', () => {
    const { container } = render(<CostChart data={costByAgent} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains "Cost" heading', () => {
    render(<CostChart data={costByAgent} />)

    expect(screen.getByText(/cost/i)).toBeInTheDocument()
  })

  it('renders a BarChart SVG', () => {
    render(<CostChart data={costByAgent} />)

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('renders ResponsiveContainer wrapper', () => {
    render(<CostChart data={costByAgent} />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('renders Bar and axis components', () => {
    render(<CostChart data={costByAgent} />)

    expect(screen.getByTestId('bar')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
  })
})
