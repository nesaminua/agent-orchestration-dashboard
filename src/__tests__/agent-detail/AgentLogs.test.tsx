import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentLogs } from '@/components/agent-detail/AgentLogs'
import { agentLogs } from '@/lib/mock-data'

const orchId = 'agent-orch-001'
const orchLogs = agentLogs.filter(log => log.agentId === orchId)

describe('AgentLogs', () => {
  it('renders log messages for the given agentId', () => {
    render(<AgentLogs logs={orchLogs} agentId={orchId} />)

    // Orchestrator has log messages like "Task task-001 assigned to agent-research-001"
    expect(screen.getByText(/Task task-001 assigned/)).toBeInTheDocument()
  })

  it('shows severity badges (INFO, WARN, ERROR)', () => {
    // Use all logs to ensure we get all severity levels
    const mixedLogs = agentLogs.filter(
      log => log.severity === 'INFO' || log.severity === 'WARN' || log.severity === 'ERROR'
    )

    render(<AgentLogs logs={mixedLogs} agentId="" />)

    expect(screen.getAllByText('INFO').length).toBeGreaterThan(0)
    expect(screen.getAllByText('WARN').length).toBeGreaterThan(0)
    expect(screen.getAllByText('ERROR').length).toBeGreaterThan(0)
  })

  it('contains an Export button', () => {
    render(<AgentLogs logs={orchLogs} agentId={orchId} />)

    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
  })
})
