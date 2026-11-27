import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentConfig } from '@/components/agent-detail/AgentConfig'
import { agents } from '@/lib/mock-data'

const orchestrator = agents[0]

describe('AgentConfig', () => {
  it('renders agent role text', () => {
    render(<AgentConfig agent={orchestrator} />)

    expect(screen.getByText(/Central orchestrator/)).toBeInTheDocument()
  })

  it('shows memory config type', () => {
    render(<AgentConfig agent={orchestrator} />)

    expect(screen.getByText(/summary/i)).toBeInTheDocument()
  })

  it('shows retry policy values', () => {
    render(<AgentConfig agent={orchestrator} />)

    // maxRetries: 3, backoffMs: 1000, timeoutMs: 30000
    expect(screen.getByText(/3/)).toBeInTheDocument()
    expect(screen.getByText(/1000/)).toBeInTheDocument()
    expect(screen.getByText(/30000/)).toBeInTheDocument()
  })

  it('renders tool names', () => {
    render(<AgentConfig agent={orchestrator} />)

    expect(screen.getByText(/delegate_task/)).toBeInTheDocument()
    expect(screen.getByText(/check_status/)).toBeInTheDocument()
    expect(screen.getByText(/escalate/)).toBeInTheDocument()
  })
})
