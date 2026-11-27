import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DashboardPage from '@/app/dashboard/page'

// Mock the swarm context so AppLayout can render without real simulation
vi.mock('@/lib/swarm-context', () => {
  const mockAgents = [
    { id: 'agent-1', name: 'Orchestrator', type: 'orchestrator', model: 'gpt-4o', status: 'healthy', latencyMs: 34, latencyHistory: [34], messagesPerMin: 847, taskCount: 1245, successRate: 99.8, tokenUsage: 45670, costToday: 12.34, connectedTo: [], position: { x: 0, y: 0 }, uptime: '99.98%', role: 'test', memoryConfig: { type: 'buffer', maxTokens: 8192 }, tools: [], retryPolicy: { maxRetries: 3, backoffMs: 1000, timeoutMs: 30000 } },
  ]

  const mockMetrics = {
    totalAgents: 8,
    healthyAgents: 5,
    degradedAgents: 0,
    failedAgents: 0,
    startingAgents: 0,
    messagesPerMin: 1247,
    avgLatencyMs: 34,
    errorRate: 0.02,
    tokenBudgetUsed: 78,
    totalTokens: 234567,
    totalCost: 39.84,
  }

  return {
    SwarmProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useSwarm: () => ({
      agents: mockAgents,
      messages: [],
      tasks: [],
      metrics: mockMetrics,
    }),
  }
})

// Mock layout sub-components to avoid deep rendering
vi.mock('@/components/layout/Sidebar', () => ({
  Sidebar: () => <nav data-testid="sidebar">Sidebar</nav>,
}))

vi.mock('@/components/layout/TopStatusBar', () => ({
  TopStatusBar: () => <div data-testid="top-status-bar">TopStatusBar</div>,
}))

vi.mock('@/components/layout/CommandPalette', () => ({
  CommandPalette: () => <div data-testid="command-palette" />,
}))

// Mock recharts since dashboard components will use it
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="area-chart">{children}</svg>
  ),
  Area: () => <g data-testid="area" />,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="bar-chart">{children}</svg>
  ),
  Bar: () => <g data-testid="bar" />,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="line-chart">{children}</svg>
  ),
  Line: () => <g data-testid="line" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: () => <g data-testid="tooltip" />,
  Legend: () => <g data-testid="legend" />,
  Cell: () => <g data-testid="cell" />,
}))

describe('DashboardPage', () => {
  it('renders within AppLayout', () => {
    render(<DashboardPage />)

    // AppLayout renders sidebar and top status bar
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('top-status-bar')).toBeInTheDocument()
  })

  it('shows "Dashboard" heading', () => {
    render(<DashboardPage />)

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })

  it('contains stat cards section', () => {
    render(<DashboardPage />)

    // Should contain stat cards with values like messages, latency, cost
    expect(screen.getByText(/total messages/i)).toBeInTheDocument()
    expect(screen.getByText(/latency/i)).toBeInTheDocument()
    expect(screen.getByText(/cost/i)).toBeInTheDocument()
  })

  it('contains chart sections', () => {
    render(<DashboardPage />)

    // Should have area chart for messages, bar chart for cost, line chart for workflow
    const charts = screen.getAllByTestId('responsive-container')
    expect(charts.length).toBeGreaterThanOrEqual(3)
  })

  it('contains bottlenecks table', () => {
    render(<DashboardPage />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
