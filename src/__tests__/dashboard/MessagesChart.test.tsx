import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MessagesChart } from '@/components/dashboard/MessagesChart'
import { hourlyMessages } from '@/lib/mock-data'

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="area-chart">{children}</svg>
  ),
  Area: () => <g data-testid="area" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: () => <g data-testid="tooltip" />,
  Legend: () => <g data-testid="legend" />,
}))

describe('MessagesChart', () => {
  it('renders the chart container', () => {
    const { container } = render(<MessagesChart data={hourlyMessages} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains "Messages" or "Total Messages" heading', () => {
    render(<MessagesChart data={hourlyMessages} />)

    expect(
      screen.getByText(/messages/i)
    ).toBeInTheDocument()
  })

  it('renders an SVG via recharts AreaChart', () => {
    render(<MessagesChart data={hourlyMessages} />)

    expect(screen.getByTestId('area-chart')).toBeInTheDocument()
  })

  it('renders ResponsiveContainer wrapper', () => {
    render(<MessagesChart data={hourlyMessages} />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('renders Area, XAxis, and YAxis components', () => {
    render(<MessagesChart data={hourlyMessages} />)

    expect(screen.getByTestId('area')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
  })
})
