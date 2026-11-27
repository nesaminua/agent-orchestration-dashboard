import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WebhooksTab } from '@/components/settings/WebhooksTab'
import { webhooks } from '@/lib/mock-data'

describe('WebhooksTab', () => {
  it('renders Webhooks heading', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByText(/Webhooks/i)).toBeInTheDocument()
  })

  it('displays webhook URLs', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByText(/hooks.slack.com/)).toBeInTheDocument()
    expect(screen.getByText(/api.internal.swarmops.dev/)).toBeInTheDocument()
    expect(screen.getByText(/billing.internal.swarmops.dev/)).toBeInTheDocument()
  })

  it('shows event badges for each webhook', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByText('task.failed')).toBeInTheDocument()
    expect(screen.getByText('agent.down')).toBeInTheDocument()
    expect(screen.getByText('task.complete')).toBeInTheDocument()
    expect(screen.getByText('human_review.needed')).toBeInTheDocument()
    expect(screen.getByText('cost.threshold')).toBeInTheDocument()
  })

  it('shows success rate for webhooks', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByText(/99\.2%/)).toBeInTheDocument()
    expect(screen.getByText(/100%/)).toBeInTheDocument()
  })

  it('shows Last Triggered column with Never for disabled webhook', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByText(/never/i)).toBeInTheDocument()
  })

  it('renders Add Webhook button', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByRole('button', { name: /add webhook/i })).toBeInTheDocument()
  })

  it('renders a table', () => {
    render(<WebhooksTab webhooks={webhooks} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
