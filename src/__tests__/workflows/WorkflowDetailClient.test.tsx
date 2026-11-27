import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkflowDetailClient } from '@/app/workflows/[id]/client'

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

describe('WorkflowDetailClient', () => {
  it('renders within AppLayout', () => {
    render(<WorkflowDetailClient id="wf-001" />)

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('top-status-bar')).toBeInTheDocument()
  })

  it('shows workflow name', () => {
    render(<WorkflowDetailClient id="wf-001" />)

    expect(screen.getByText(/Customer Support Pipeline/)).toBeInTheDocument()
  })

  it('has tab triggers for Visual and YAML', () => {
    render(<WorkflowDetailClient id="wf-001" />)

    expect(screen.getByRole('tab', { name: /visual/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /yaml/i })).toBeInTheDocument()
  })
})
