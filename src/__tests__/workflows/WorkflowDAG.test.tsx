import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkflowDAG } from '@/components/workflows/WorkflowDAG'
import { workflows } from '@/lib/mock-data'

const customerSupport = workflows[0]

describe('WorkflowDAG', () => {
  it('renders an SVG element', () => {
    const { container } = render(<WorkflowDAG workflow={customerSupport} />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('shows agent roles from workflow.agents', () => {
    render(<WorkflowDAG workflow={customerSupport} />)

    // Customer Support Pipeline agents have roles: Classifier, Researcher, Drafter, Delivery
    expect(screen.getByText(/Classifier/)).toBeInTheDocument()
    expect(screen.getByText(/Researcher/)).toBeInTheDocument()
    expect(screen.getByText(/Drafter/)).toBeInTheDocument()
    expect(screen.getByText(/Delivery/)).toBeInTheDocument()
  })
})
