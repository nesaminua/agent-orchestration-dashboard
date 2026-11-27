import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BottlenecksTable } from '@/components/dashboard/BottlenecksTable'
import { agents } from '@/lib/mock-data'

describe('BottlenecksTable', () => {
  it('renders the table', () => {
    render(<BottlenecksTable agents={agents} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('shows column headers: Agent, P95 Latency, Error Rate, Retries, Status', () => {
    render(<BottlenecksTable agents={agents} />)

    expect(screen.getByText(/agent/i)).toBeInTheDocument()
    expect(screen.getByText(/p95 latency/i)).toBeInTheDocument()
    expect(screen.getByText(/error rate/i)).toBeInTheDocument()
    expect(screen.getByText(/retries/i)).toBeInTheDocument()
    expect(screen.getByText(/status/i)).toBeInTheDocument()
  })

  it('displays at least 5 agent rows', () => {
    render(<BottlenecksTable agents={agents} />)

    // The table body should have at least 5 rows (top 5 by latency)
    const rows = screen.getAllByRole('row')
    // rows includes header row, so we expect at least 6 total (1 header + 5 body)
    expect(rows.length).toBeGreaterThanOrEqual(6)
  })

  it('rows are sorted by latency descending', () => {
    render(<BottlenecksTable agents={agents} />)

    // Get all table body rows (skip header)
    const rows = screen.getAllByRole('row').slice(1)

    // Extract latency values from each row
    const latencyValues: number[] = []
    for (const row of rows) {
      // Each row should have a latency cell with the ms value
      const cells = row.querySelectorAll('td')
      // P95 Latency is the second column (index 1)
      const latencyText = cells[1]?.textContent ?? '0'
      const latencyNum = parseFloat(latencyText.replace(/[^0-9.]/g, ''))
      latencyValues.push(latencyNum)
    }

    // Verify descending order
    for (let i = 0; i < latencyValues.length - 1; i++) {
      expect(latencyValues[i]).toBeGreaterThanOrEqual(latencyValues[i + 1])
    }
  })

  it('contains a heading with "Bottleneck" or similar', () => {
    render(<BottlenecksTable agents={agents} />)

    expect(
      screen.getByText(/bottleneck/i)
    ).toBeInTheDocument()
  })
})
