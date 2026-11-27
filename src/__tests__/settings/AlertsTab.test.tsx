import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AlertsTab } from '@/components/settings/AlertsTab'
import { alertRules } from '@/lib/mock-data'

describe('AlertsTab', () => {
  it('renders Alert Rules heading', () => {
    render(<AlertsTab rules={alertRules} />)
    expect(screen.getByText(/Alert Rules/i)).toBeInTheDocument()
  })

  it('displays all 5 alert rule names', () => {
    render(<AlertsTab rules={alertRules} />)
    expect(screen.getByText('High Latency')).toBeInTheDocument()
    expect(screen.getByText('Error Rate Spike')).toBeInTheDocument()
    expect(screen.getByText('Token Budget Exceeded')).toBeInTheDocument()
    expect(screen.getByText('Agent Down')).toBeInTheDocument()
    expect(screen.getByText('Cost Overrun')).toBeInTheDocument()
  })

  it('shows condition text in code style', () => {
    render(<AlertsTab rules={alertRules} />)
    expect(screen.getByText('avg_latency_ms > threshold')).toBeInTheDocument()
    expect(screen.getByText('error_rate > threshold')).toBeInTheDocument()
  })

  it('renders 5 switch elements', () => {
    render(<AlertsTab rules={alertRules} />)
    const switches = screen.getAllByRole('switch')
    expect(switches).toHaveLength(5)
  })

  it('shows Add Rule button', () => {
    render(<AlertsTab rules={alertRules} />)
    expect(screen.getByRole('button', { name: /add rule/i })).toBeInTheDocument()
  })

  it('shows threshold values', () => {
    render(<AlertsTab rules={alertRules} />)
    expect(screen.getByText(/5000/)).toBeInTheDocument()
    expect(screen.getByText(/90/)).toBeInTheDocument()
  })
})
