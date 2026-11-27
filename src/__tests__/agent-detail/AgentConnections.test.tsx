import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentConnections } from '@/components/agent-detail/AgentConnections'
import { agents } from '@/lib/mock-data'

// Mock TopologyNode and TopologyEdge to avoid deep SVG rendering
vi.mock('@/components/mission-control/TopologyNode', () => ({
  TopologyNode: ({ agent }: { agent: { name: string } }) => (
    <g data-testid={`topology-node-${agent.name}`} />
  ),
}))

vi.mock('@/components/mission-control/TopologyEdge', () => ({
  TopologyEdge: () => <g data-testid="topology-edge" />,
}))

const orchestrator = agents[0]
const allAgents = [...agents]

describe('AgentConnections', () => {
  it('renders an SVG element (mini topology)', () => {
    const { container } = render(
      <AgentConnections agent={orchestrator} allAgents={allAgents} />
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('shows connected agent names', () => {
    render(<AgentConnections agent={orchestrator} allAgents={allAgents} />)

    // Orchestrator is connected to: Research Agent, Writer Agent, Tool Executor, Reviewer Agent, Router Agent
    expect(screen.getByText(/Research Agent/)).toBeInTheDocument()
    expect(screen.getByText(/Writer Agent/)).toBeInTheDocument()
    expect(screen.getByText(/Tool Executor/)).toBeInTheDocument()
  })
})
