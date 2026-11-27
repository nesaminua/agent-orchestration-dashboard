'use client'

import type { Agent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AgentConfigProps {
  readonly agent: Agent
}

export function AgentConfig({ agent }: AgentConfigProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-bg-secondary border-border-default">
        <CardHeader>
          <CardTitle className="text-text-primary">Role</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary text-sm">{agent.role}</p>
        </CardContent>
      </Card>

      <Card className="bg-bg-secondary border-border-default">
        <CardHeader>
          <CardTitle className="text-text-primary">Memory Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">Type:</span>
            <Badge variant="outline">{agent.memoryConfig.type}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">Max Tokens:</span>
            <span className="text-text-primary text-sm">{agent.memoryConfig.maxTokens}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-secondary border-border-default">
        <CardHeader>
          <CardTitle className="text-text-primary">Retry Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-primary text-sm">
            {agent.retryPolicy.maxRetries} retries, {agent.retryPolicy.backoffMs} ms backoff, {agent.retryPolicy.timeoutMs} ms timeout
          </p>
        </CardContent>
      </Card>

      <Card className="bg-bg-secondary border-border-default">
        <CardHeader>
          <CardTitle className="text-text-primary">Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {agent.tools.map((tool) => (
              <li key={tool.name} className="flex items-start gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {tool.name}
                </Badge>
                <span className="text-text-secondary text-sm">{tool.description}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
