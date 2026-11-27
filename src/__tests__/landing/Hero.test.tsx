import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/landing/Hero'

describe('Hero', () => {
  it('renders the headline "Orchestrate AI agent teams at scale."', () => {
    render(<Hero />)

    expect(
      screen.getByText(/Orchestrate AI agent teams at scale/i)
    ).toBeInTheDocument()
  })

  it('renders "Sign In" and "Get Started" navigation buttons', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /get started/i })
    ).toBeInTheDocument()
  })

  it('renders tech badges (LangGraph, CrewAI, AutoGen, etc.)', () => {
    render(<Hero />)

    expect(screen.getByText(/LangGraph/i)).toBeInTheDocument()
    expect(screen.getByText(/CrewAI/i)).toBeInTheDocument()
    expect(screen.getByText(/AutoGen/i)).toBeInTheDocument()
    expect(screen.getByText(/OpenAI/i)).toBeInTheDocument()
    expect(screen.getByText(/Claude/i)).toBeInTheDocument()
    expect(screen.getByText(/Python/i)).toBeInTheDocument()
  })

  it('renders CTA buttons ("Start Orchestrating", "Watch Demo")', () => {
    render(<Hero />)

    expect(
      screen.getByRole('link', { name: /start orchestrating/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /watch demo/i })
    ).toBeInTheDocument()
  })

  it('"Get Started" link navigates to /login', () => {
    render(<Hero />)

    const getStartedLink = screen.getByRole('link', { name: /get started/i })
    expect(getStartedLink).toHaveAttribute('href', '/login')
  })
})
