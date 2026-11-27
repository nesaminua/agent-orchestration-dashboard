import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TeamTab } from '@/components/settings/TeamTab'
import { teamMembers } from '@/lib/mock-data'

describe('TeamTab', () => {
  it('renders Team heading', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByText(/Team/)).toBeInTheDocument()
  })

  it('displays all 4 team member names', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByText('Alex Chen')).toBeInTheDocument()
    expect(screen.getByText('Sarah Kim')).toBeInTheDocument()
    expect(screen.getByText('Marcus Johnson')).toBeInTheDocument()
    expect(screen.getByText('Priya Patel')).toBeInTheDocument()
  })

  it('shows email for each member', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByText('alex@swarmops.dev')).toBeInTheDocument()
    expect(screen.getByText('sarah@swarmops.dev')).toBeInTheDocument()
    expect(screen.getByText('marcus@swarmops.dev')).toBeInTheDocument()
    expect(screen.getByText('priya@swarmops.dev')).toBeInTheDocument()
  })

  it('shows role badges', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByText(/owner/i)).toBeInTheDocument()
    expect(screen.getByText(/admin/i)).toBeInTheDocument()
    expect(screen.getByText(/member/i)).toBeInTheDocument()
    expect(screen.getByText(/viewer/i)).toBeInTheDocument()
  })

  it('renders a table', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('shows Invite Member button', () => {
    render(<TeamTab members={teamMembers} />)
    expect(screen.getByRole('button', { name: /invite member/i })).toBeInTheDocument()
  })

  it('does not show Remove button for owner', () => {
    render(<TeamTab members={teamMembers} />)
    // Should have 3 remove buttons (for admin, member, viewer) but not for owner
    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    expect(removeButtons).toHaveLength(3)
  })
})
