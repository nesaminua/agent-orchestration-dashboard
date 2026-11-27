import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkflowsPage from '@/app/workflows/page'

// Mock the swarm context
vi.mock('@/lib/swarm-context', () => {
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
      agents: [],
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

describe('WorkflowsPage', () => {
  it('renders workflow names', () => {
    render(<WorkflowsPage />)

    expect(screen.getByText(/Customer Support Pipeline/)).toBeInTheDocument()
    expect(screen.getByText(/Content Creation Swarm/)).toBeInTheDocument()
    expect(screen.getByText(/Data Processing DAG/)).toBeInTheDocument()
    expect(screen.getByText(/Code Review Team/)).toBeInTheDocument()
  })

  it('shows pattern badges', () => {
    render(<WorkflowsPage />)

    expect(screen.getByText(/sequential/i)).toBeInTheDocument()
    expect(screen.getByText(/hierarchical/i)).toBeInTheDocument()
    expect(screen.getByText(/dag/i)).toBeInTheDocument()
    expect(screen.getByText(/peer-to-peer/i)).toBeInTheDocument()
  })

  it('renders 4 workflow cards', () => {
    render(<WorkflowsPage />)

    // Each workflow should have a card — look for all 4 workflow names
    const names = [
      'Customer Support Pipeline',
      'Content Creation Swarm',
      'Data Processing DAG',
      'Code Review Team',
    ]

    for (const name of names) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
