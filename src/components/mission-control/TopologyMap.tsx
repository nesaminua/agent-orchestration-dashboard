'use client'

import { useMemo } from 'react'
import { computeEdgePath, getAgentTypeColor } from '@/lib/topology-layout'
import type { Agent, Position } from '@/lib/types'
import { TopologyNode } from './TopologyNode'
import { TopologyEdge } from './TopologyEdge'
import { TopologyParticle } from './TopologyParticle'

interface TopologyMapProps {
  readonly agents: readonly Agent[]
}

interface ComputedEdge {
  readonly id: string
  readonly from: Readonly<Position>
  readonly to: Readonly<Position>
  readonly path: string
  readonly color: string
}

function buildAgentIndex(
  agents: readonly Agent[]
): ReadonlyMap<string, Agent> {
  return new Map(agents.map((agent) => [agent.id, agent]))
}

function computeEdges(agents: readonly Agent[]): readonly ComputedEdge[] {
  const agentMap = buildAgentIndex(agents)
  const seen = new Set<string>()
  const edges: ComputedEdge[] = []

  for (const agent of agents) {
    for (const targetId of agent.connectedTo) {
      // Deduplicate: only create edge if agent.id < targetId lexicographically
      const edgeKey =
        agent.id < targetId
          ? `${agent.id}--${targetId}`
          : `${targetId}--${agent.id}`

      if (seen.has(edgeKey)) continue
      seen.add(edgeKey)

      const target = agentMap.get(targetId)
      if (!target) continue

      const from = agent.id < targetId ? agent.position : target.position
      const to = agent.id < targetId ? target.position : agent.position
      const sourceAgent = agent.id < targetId ? agent : target

      edges.push({
        id: edgeKey,
        from,
        to,
        path: computeEdgePath(from, to),
        color: getAgentTypeColor(sourceAgent.type),
      })
    }
  }

  return edges
}

export function TopologyMap({ agents }: TopologyMapProps) {
  const edges = useMemo(() => computeEdges(agents), [agents])

  return (
    <div className="topology-grid relative rounded-xl border border-[#1e293b] bg-[#0a0f1a] overflow-hidden h-full">
      <svg
        viewBox="0 0 800 540"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Agent topology map showing connections between swarm agents"
      >
        {/* Layer 1: Edges (behind everything) */}
        {edges.map((edge, i) => (
          <TopologyEdge
            key={edge.id}
            id={edge.id}
            from={edge.from}
            to={edge.to}
            index={i}
          />
        ))}

        {/* Layer 2: Particles flowing along edges */}
        {edges.map((edge) => (
          <TopologyParticle
            key={`p-${edge.id}`}
            pathString={edge.path}
            color={edge.color}
          />
        ))}

        {/* Layer 3: Nodes (on top) */}
        {agents.map((agent, i) => (
          <TopologyNode key={agent.id} agent={agent} index={i} />
        ))}
      </svg>
    </div>
  )
}
