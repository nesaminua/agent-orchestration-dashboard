import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MiniTopology } from '@/components/landing/MiniTopology'

describe('MiniTopology', () => {
  it('renders an SVG element', () => {
    const { container } = render(<MiniTopology />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders 5-6 node circles', () => {
    const { container } = render(<MiniTopology />)

    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThanOrEqual(5)
    expect(circles.length).toBeLessThanOrEqual(6)
  })

  it('renders connecting paths between nodes', () => {
    const { container } = render(<MiniTopology />)

    const paths = container.querySelectorAll('path, line')
    expect(paths.length).toBeGreaterThanOrEqual(4)
  })
})
