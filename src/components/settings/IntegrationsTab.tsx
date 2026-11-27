'use client'

import type { Integration } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { GitBranch, Users, Bot, Code } from 'lucide-react'

interface IntegrationsTabProps {
  readonly integrations: readonly Integration[]
}

function getIcon(type: Integration['type']) {
  switch (type) {
    case 'langgraph':
      return <GitBranch className="size-5" />
    case 'crewai':
      return <Users className="size-5" />
    case 'autogen':
      return <Bot className="size-5" />
    case 'custom_python':
      return <Code className="size-5" />
  }
}

function getStatusLabel(status: Integration['status']): string {
  switch (status) {
    case 'connected':
      return 'Connected'
    case 'disconnected':
      return 'Disconnected'
    case 'error':
      return 'Error'
  }
}

function getStatusVariant(status: Integration['status']): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case 'connected':
      return 'default'
    case 'disconnected':
      return 'secondary'
    case 'error':
      return 'destructive'
  }
}

function formatAgentCount(count: number): string {
  return count === 1 ? '1 agent' : `${count} agents`
}

export function IntegrationsTab({ integrations }: IntegrationsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Integrations</h2>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <StaggerItem key={integration.id}>
            <Card className="bg-bg-secondary border-border-default">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getIcon(integration.type)}
                  <CardTitle className="text-text-primary">
                    {integration.name}
                  </CardTitle>
                </div>
                <Badge variant={getStatusVariant(integration.status)}>
                  {getStatusLabel(integration.status)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span>{integration.version}</span>
                  <span>{formatAgentCount(integration.agentCount)}</span>
                </div>
                <p className="text-sm text-text-muted">{integration.description}</p>
                <Button
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  size="sm"
                >
                  {integration.status === 'connected' ? 'Configure' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
