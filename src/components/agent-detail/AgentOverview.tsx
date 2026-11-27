'use client'

import type { Agent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AgentOverviewProps {
  readonly agent: Agent
}

export function AgentOverview({ agent }: AgentOverviewProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-bg-secondary border-border-default">
        <CardHeader>
          <CardTitle className="text-text-primary">{agent.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-text-muted text-xs">Model</p>
              <p className="text-text-primary text-sm font-medium">{agent.model}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs">Uptime</p>
              <p className="text-text-primary text-sm font-medium">{agent.uptime}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs">Latency</p>
              <p className="text-text-primary text-sm font-medium">{agent.latencyMs} ms</p>
            </div>
            <div>
              <p className="text-text-muted text-xs">Success Rate</p>
              <p className="text-text-primary text-sm font-medium">{agent.successRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
