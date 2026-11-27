import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ArchitecturePatterns } from '@/components/landing/ArchitecturePatterns'

describe('ArchitecturePatterns', () => {
  it('renders section title "Built for any multi-agent architecture"', () => {
    render(<ArchitecturePatterns />)

    expect(
      screen.getByText(/Built for any multi-agent architecture/i)
    ).toBeInTheDocument()
  })

  it('renders 3 architecture pattern cards', () => {
    render(<ArchitecturePatterns />)

    const cards = [
      screen.getByText(/Sequential Pipeline/i),
      screen.getByText(/Hierarchical Orchestration/i),
      screen.getByText(/Peer-to-Peer Swarm/i),
    ]

    cards.forEach((card) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('Card 1 contains "Sequential Pipeline"', () => {
    render(<ArchitecturePatterns />)

    expect(screen.getByText(/Sequential Pipeline/i)).toBeInTheDocument()
  })

  it('Card 2 contains "Hierarchical Orchestration"', () => {
    render(<ArchitecturePatterns />)

    expect(
      screen.getByText(/Hierarchical Orchestration/i)
    ).toBeInTheDocument()
  })

  it('Card 3 contains "Peer-to-Peer Swarm"', () => {
    render(<ArchitecturePatterns />)

    expect(screen.getByText(/Peer-to-Peer Swarm/i)).toBeInTheDocument()
  })
})
