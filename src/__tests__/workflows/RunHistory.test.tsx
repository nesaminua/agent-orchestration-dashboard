import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RunHistory } from '@/components/workflows/RunHistory'
import { workflows } from '@/lib/mock-data'

const runs = [...workflows[0].runs]

describe('RunHistory', () => {
  it('renders a table', () => {
    render(<RunHistory runs={runs} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('shows run statuses', () => {
    render(<RunHistory runs={runs} />)

    // Workflow wf-001 has: 4 success, 0 failed, 1 timeout
    expect(screen.getAllByText(/success/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/timeout/i).length).toBeGreaterThan(0)
  })

  it('shows at least the number of runs from the data', () => {
    render(<RunHistory runs={runs} />)

    // 5 runs total in wf-001 — should have at least 5 data rows plus header
    const rows = screen.getAllByRole('row')
    // rows[0] is header, rest are data rows
    expect(rows.length).toBeGreaterThanOrEqual(runs.length + 1)
  })
})
