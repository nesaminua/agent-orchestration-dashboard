'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { agents, agentLogs, evalResults } from '@/lib/mock-data'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AgentOverview } from '@/components/agent-detail/AgentOverview'
import { AgentConfig } from '@/components/agent-detail/AgentConfig'
import { AgentLogs } from '@/components/agent-detail/AgentLogs'
import { AgentConnections } from '@/components/agent-detail/AgentConnections'
import { AgentEvaluation } from '@/components/agent-detail/AgentEvaluation'

interface AgentDetailClientProps {
  readonly id: string
}

export function AgentDetailClient({ id }: AgentDetailClientProps) {
  const agent = agents.find((a) => a.id === id)

  if (!agent) {
    return (
      <AppLayout>
        <div className="p-8 text-text-primary">Agent not found: {id}</div>
      </AppLayout>
    )
  }

  const logs = agentLogs.filter((log) => log.agentId === id)

  return (
    <AppLayout>
      <div className="space-y-6 p-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AgentOverview agent={agent} />
          </TabsContent>

          <TabsContent value="configuration">
            <AgentConfig agent={agent} />
          </TabsContent>

          <TabsContent value="logs">
            <AgentLogs logs={logs} agentId={id} />
          </TabsContent>

          <TabsContent value="connections">
            <AgentConnections agent={agent} allAgents={[...agents]} />
          </TabsContent>

          <TabsContent value="evaluation">
            <AgentEvaluation results={[...evalResults]} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
