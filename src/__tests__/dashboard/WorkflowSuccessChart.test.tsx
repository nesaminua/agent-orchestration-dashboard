import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkflowSuccessChart } from '@/components/dashboard/WorkflowSuccessChart'
import { workflowSuccessRate } from '@/lib/mock-data'

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="line-chart">{children}</svg>
  ),
  Line: () => <g data-testid="line" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: () => <g data-testid="tooltip" />,
  Legend: () => <g data-testid="legend" />,
}))

describe('WorkflowSuccessChart', () => {
  it('renders the chart container', () => {
    const { container } = render(<WorkflowSuccessChart data={workflowSuccessRate} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains "Workflow" or "Success Rate" heading', () => {
    render(<WorkflowSuccessChart data={workflowSuccessRate} />)

    expect(
      screen.getByText(/workflow|success rate/i)
    ).toBeInTheDocument()
  })

  it('renders a LineChart SVG', () => {
    render(<WorkflowSuccessChart data={workflowSuccessRate} />)

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('renders ResponsiveContainer wrapper', () => {
    render(<WorkflowSuccessChart data={workflowSuccessRate} />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('renders Line, XAxis, and YAxis components', () => {
    render(<WorkflowSuccessChart data={workflowSuccessRate} />)

    expect(screen.getByTestId('line')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
  })
})
