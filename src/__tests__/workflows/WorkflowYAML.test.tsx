import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkflowYAML } from '@/components/workflows/WorkflowYAML'
import { workflows } from '@/lib/mock-data'

const yaml = workflows[0].yaml

describe('WorkflowYAML', () => {
  it('renders the YAML content', () => {
    render(<WorkflowYAML yaml={yaml} />)

    expect(screen.getByText(/customer_support_pipeline/)).toBeInTheDocument()
    expect(screen.getByText(/sequential/)).toBeInTheDocument()
  })

  it('contains a Copy button', () => {
    render(<WorkflowYAML yaml={yaml} />)

    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })
})
