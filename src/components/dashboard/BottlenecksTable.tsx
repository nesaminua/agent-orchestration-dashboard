'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Agent } from '@/lib/types'

interface BottlenecksTableProps {
  readonly agents: readonly Agent[]
}

function getStatusBadge(status: Agent['status']): string {
  switch (status) {
    case 'healthy':
    case 'active':
      return 'text-green-400'
    case 'idle':
      return 'text-yellow-400'
    case 'degraded':
      return 'text-orange-400'
    case 'failed':
      return 'text-red-400'
    case 'starting':
      return 'text-blue-400'
    default:
      return 'text-text-secondary'
  }
}

function formatAgentName(name: string): string {
  return name.replace(/ Agent$/, '')
}

function sortByLatencyDesc(agents: readonly Agent[]): readonly Agent[] {
  return [...agents].sort((a, b) => b.latencyMs - a.latencyMs)
}

export function BottlenecksTable({ agents }: BottlenecksTableProps) {
  const sorted = sortByLatencyDesc(agents)

  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">Bottlenecks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-default text-text-secondary">
                <th className="px-3 py-2 font-medium">Agent</th>
                <th className="px-3 py-2 font-medium">P95 Latency</th>
                <th className="px-3 py-2 font-medium">Error Rate</th>
                <th className="px-3 py-2 font-medium">Retries</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-b border-border-default/50"
                >
                  <td className="px-3 py-2 text-text-primary">
                    {formatAgentName(agent.name)}
                  </td>
                  <td className="px-3 py-2 text-text-primary">
                    {agent.latencyMs}ms
                  </td>
                  <td className="px-3 py-2 text-text-primary">
                    {(100 - agent.successRate).toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 text-text-primary">
                    {agent.retryPolicy.maxRetries}
                  </td>
                  <td className={`px-3 py-2 capitalize ${getStatusBadge(agent.status)}`}>
                    {agent.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
