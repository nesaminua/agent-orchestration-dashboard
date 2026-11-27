'use client'

import type { Workflow } from '@/lib/types'

interface WorkflowDAGProps {
  readonly workflow: Workflow
}

const NODE_WIDTH = 140
const NODE_HEIGHT = 40
const NODE_RX = 8

export function WorkflowDAG({ workflow }: WorkflowDAGProps) {
  return (
    <svg viewBox="0 0 900 500" className="h-[400px] w-full" role="img" aria-label="Workflow DAG">
      {workflow.edges.map((edge) => {
        const fromAgent = workflow.agents.find((a) => a.id === edge.from)
        const toAgent = workflow.agents.find((a) => a.id === edge.to)

        if (!fromAgent || !toAgent) return null

        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={fromAgent.position.x + NODE_WIDTH / 2}
            y1={fromAgent.position.y + NODE_HEIGHT}
            x2={toAgent.position.x + NODE_WIDTH / 2}
            y2={toAgent.position.y}
            stroke="#1e293b"
            strokeWidth={1.5}
            markerEnd="url(#arrowhead)"
          />
        )
      })}

      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
        </marker>
      </defs>

      {workflow.agents.map((agent) => (
        <g key={agent.id} transform={`translate(${agent.position.x}, ${agent.position.y})`}>
          <rect
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            rx={NODE_RX}
            fill="#111827"
            stroke="#22d3ee"
            strokeWidth={1.5}
          />
          <text
            x={NODE_WIDTH / 2}
            y={NODE_HEIGHT / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#f1f5f9"
            fontSize={12}
          >
            {agent.role}
          </text>
        </g>
      ))}
    </svg>
  )
}
