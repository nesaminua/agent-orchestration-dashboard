import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ApiKeysTab } from '@/components/settings/ApiKeysTab'
import { apiKeys } from '@/lib/mock-data'

describe('ApiKeysTab', () => {
  it('renders API Keys heading', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    expect(screen.getByText(/API Keys/i)).toBeInTheDocument()
  })

  it('displays all 3 API key names', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    expect(screen.getByText('Production API Key')).toBeInTheDocument()
    expect(screen.getByText('Development Key')).toBeInTheDocument()
    expect(screen.getByText('CI/CD Pipeline')).toBeInTheDocument()
  })

  it('shows masked key values in monospace', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    expect(screen.getByText('sk-prod-...x8f2')).toBeInTheDocument()
    expect(screen.getByText('sk-dev-...a3b2')).toBeInTheDocument()
    expect(screen.getByText('sk-ci-...k9m1')).toBeInTheDocument()
  })

  it('renders a table with correct columns', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/created/i)).toBeInTheDocument()
    expect(screen.getByText(/last used/i)).toBeInTheDocument()
  })

  it('renders Copy buttons for each key', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    const copyButtons = screen.getAllByRole('button', { name: /copy/i })
    expect(copyButtons).toHaveLength(3)
  })

  it('renders Revoke buttons for each key', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    const revokeButtons = screen.getAllByRole('button', { name: /revoke/i })
    expect(revokeButtons).toHaveLength(3)
  })

  it('shows Generate New Key button', () => {
    render(<ApiKeysTab keys={apiKeys} />)
    expect(screen.getByRole('button', { name: /generate new key/i })).toBeInTheDocument()
  })
})
