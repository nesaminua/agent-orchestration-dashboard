import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { IntegrationsTab } from '@/components/settings/IntegrationsTab'
import { integrations } from '@/lib/mock-data'

describe('IntegrationsTab', () => {
  it('renders Integrations heading', () => {
    render(<IntegrationsTab integrations={integrations} />)
    expect(screen.getByText(/Integrations/i)).toBeInTheDocument()
  })

  it('displays all 4 integration names', () => {
    render(<IntegrationsTab integrations={integrations} />)
    expect(screen.getByText('LangGraph')).toBeInTheDocument()
    expect(screen.getByText('CrewAI')).toBeInTheDocument()
    expect(screen.getByText('AutoGen')).toBeInTheDocument()
    expect(screen.getByText('Custom Python')).toBeInTheDocument()
  })

  it('shows status badges', () => {
    render(<IntegrationsTab integrations={integrations} />)
    const connectedBadges = screen.getAllByText(/connected/i)
    // 3 connected + 1 disconnected
    expect(connectedBadges.length).toBeGreaterThanOrEqual(3)
    expect(screen.getByText(/disconnected/i)).toBeInTheDocument()
  })

  it('shows version strings', () => {
    render(<IntegrationsTab integrations={integrations} />)
    expect(screen.getByText('v0.2.14')).toBeInTheDocument()
    expect(screen.getByText('v0.51.0')).toBeInTheDocument()
    expect(screen.getByText('v0.4.1')).toBeInTheDocument()
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('shows agent counts', () => {
    render(<IntegrationsTab integrations={integrations} />)
    expect(screen.getByText(/4 agents/i)).toBeInTheDocument()
    expect(screen.getByText(/3 agents/i)).toBeInTheDocument()
    expect(screen.getByText(/0 agents/i)).toBeInTheDocument()
    expect(screen.getByText(/1 agent/i)).toBeInTheDocument()
  })

  it('shows descriptions', () => {
    render(<IntegrationsTab integrations={integrations} />)
    expect(screen.getByText(/Primary orchestration framework/)).toBeInTheDocument()
    expect(screen.getByText(/Collaborative agent teams/)).toBeInTheDocument()
  })

  it('shows Configure for connected and Connect for disconnected', () => {
    render(<IntegrationsTab integrations={integrations} />)
    const configureButtons = screen.getAllByRole('button', { name: /configure/i })
    expect(configureButtons).toHaveLength(3) // 3 connected
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument() // 1 disconnected
  })
})
