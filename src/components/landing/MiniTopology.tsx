'use client'

import { computeEdgePath } from '@/lib/topology-layout'

interface Node {
  readonly x: number
  readonly y: number
  readonly color: string
}

const NODES: readonly Node[] = [
  { x: 300, y: 50, color: '#22d3ee' },   // cyan — top center
  { x: 150, y: 150, color: '#a78bfa' },  // violet — mid left
  { x: 450, y: 150, color: '#60a5fa' },  // blue — mid right
  { x: 100, y: 250, color: '#f59e0b' },  // amber — bottom left
  { x: 500, y: 250, color: '#34d399' },  // emerald — bottom right
] as const

interface Edge {
  readonly from: number
  readonly to: number
}

const EDGES: readonly Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 1, to: 2 },
] as const

const NODE_RADIUS = 8

export function MiniTopology() {
  return (
    <section className="flex justify-center px-6 py-12">
      <svg
        viewBox="0 0 600 300"
        className="w-full max-w-xl"
        aria-hidden="true"
      >
        {/* Edges */}
        <g>
          {EDGES.map((edge) => {
            const from = NODES[edge.from]
            const to = NODES[edge.to]
            const d = computeEdgePath(
              { x: from.x, y: from.y },
              { x: to.x, y: to.y }
            )
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={d}
                fill="none"
                stroke="#1e293b"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g>
          {NODES.map((node) => (
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={NODE_RADIUS}
              fill={node.color}
              opacity={0.9}
            />
          ))}
        </g>
      </svg>
    </section>
  )
}
