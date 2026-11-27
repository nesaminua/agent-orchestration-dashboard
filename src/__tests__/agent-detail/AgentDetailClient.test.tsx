import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentDetailClient } from '@/app/agents/[id]/client'

// Mock the swarm context so AppLayout can render
vi.mock('@/lib/swarm-context', () => {
  const mockAgents = [
    {
      id: 'agent-orch-001',
      name: 'Orchestrator',
      type: 'orchestrator',
      model: 'gpt-4o',
      status: 'healthy',
      latencyMs: 34,
      latencyHistory: [34],
      messagesPerMin: 847,
      taskCount: 1245,
      successRate: 99.8,
      tokenUsage: 45670,
      costToday: 12.34,
      connectedTo: ['agent-research-001', 'agent-writer-001'],
      position: { x: 400, y: 60 },
      uptime: '99.98%',
      role: 'Central orchestrator',
      memoryConfig: { type: 'summary', maxTokens: 8192 },
      tools: [
        { name: 'delegate_task', description: 'Assign a task', parameters: {} },
      ],
      retryPolicy: { maxRetries: 3, backoffMs: 1000, timeoutMs: 30000 },
    },
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

// Mock layout sub-components
vi.mock('@/components/layout/Sidebar', () => ({
  Sidebar: () => <nav data-testid="sidebar">Sidebar</nav>,
}))

vi.mock('@/components/layout/TopStatusBar', () => ({
  TopStatusBar: () => <div data-testid="top-status-bar">TopStatusBar</div>,
}))

vi.mock('@/components/layout/CommandPalette', () => ({
  CommandPalette: () => <div data-testid="command-palette" />,
}))

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

describe('AgentDetailClient', () => {
  it('renders within AppLayout (sidebar exists)', () => {
    render(<AgentDetailClient id="agent-orch-001" />)

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('top-status-bar')).toBeInTheDocument()
  })

  it('shows agent name', () => {
    render(<AgentDetailClient id="agent-orch-001" />)

    expect(screen.getByText(/Orchestrator/)).toBeInTheDocument()
  })

  it('has tab triggers for Overview, Configuration, Logs, Connections, Evaluation', () => {
    render(<AgentDetailClient id="agent-orch-001" />)

    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /configuration/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /logs/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /connections/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /evaluation/i })).toBeInTheDocument()
  })
})
