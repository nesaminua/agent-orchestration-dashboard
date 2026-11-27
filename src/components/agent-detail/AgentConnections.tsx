'use client'

import type { Agent } from '@/lib/types'
import { TopologyNode } from '@/components/mission-control/TopologyNode'
import { TopologyEdge } from '@/components/mission-control/TopologyEdge'

interface AgentConnectionsProps {
  readonly agent: Agent
  readonly allAgents: readonly Agent[]
}

export function AgentConnections({ agent, allAgents }: AgentConnectionsProps) {
  const connectedAgents = allAgents.filter((a) =>
    agent.connectedTo.includes(a.id)
  )

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 800 560"
        className="h-[400px] w-full"
        role="img"
        aria-label="Agent connections topology"
      >
        {connectedAgents.map((connected, idx) => (
          <TopologyEdge
            key={`edge-${connected.id}`}
            id={`edge-${agent.id}-${connected.id}`}
            from={agent.position}
            to={connected.position}
            index={idx}
          />
        ))}

        <TopologyNode agent={agent} index={0} />
        {connectedAgents.map((connected, idx) => (
          <TopologyNode key={connected.id} agent={connected} index={idx + 1} />
        ))}
      </svg>

      <div className="space-y-2">
        <h3 className="text-text-primary text-sm font-medium">Connected Agents</h3>
        <ul className="space-y-1">
          {connectedAgents.map((connected) => (
            <li
              key={connected.id}
              className="text-text-secondary flex items-center gap-2 text-sm"
            >
              <span className="bg-accent-cyan h-2 w-2 rounded-full" />
              <span>{connected.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
