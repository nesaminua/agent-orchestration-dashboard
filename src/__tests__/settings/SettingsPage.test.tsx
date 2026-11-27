import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SettingsPage from '@/app/settings/page'

describe('SettingsPage', () => {
  it('renders Settings heading', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })

  it('shows all 5 tab triggers', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('tab', { name: /api keys/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /webhooks/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /integrations/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /alerts/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /team/i })).toBeInTheDocument()
  })

  it('shows API Keys tab content by default', () => {
    render(<SettingsPage />)
    // API Keys tab should be active and showing content
    expect(screen.getByText('Production API Key')).toBeInTheDocument()
  })

  it('renders subtitle text', () => {
    render(<SettingsPage />)
    expect(screen.getByText(/manage api keys/i)).toBeInTheDocument()
  })
})
