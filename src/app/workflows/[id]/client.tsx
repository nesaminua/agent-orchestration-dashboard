'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { workflows } from '@/lib/mock-data'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { WorkflowDAG } from '@/components/workflows/WorkflowDAG'
import { WorkflowYAML } from '@/components/workflows/WorkflowYAML'
import { RunHistory } from '@/components/workflows/RunHistory'

interface WorkflowDetailClientProps {
  readonly id: string
}

export function WorkflowDetailClient({ id }: WorkflowDetailClientProps) {
  const workflow = workflows.find((w) => w.id === id)

  if (!workflow) {
    return (
      <AppLayout>
        <div className="p-8 text-text-primary">Workflow not found: {id}</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-8">
        <h1 className="text-text-primary text-2xl font-bold">{workflow.name}</h1>

        <Tabs defaultValue="visual">
          <TabsList>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="yaml">YAML</TabsTrigger>
          </TabsList>

          <TabsContent value="visual">
            <WorkflowDAG workflow={workflow} />
          </TabsContent>

          <TabsContent value="yaml">
            <WorkflowYAML yaml={workflow.yaml} />
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h2 className="text-text-primary text-lg font-semibold">Run History</h2>
          <RunHistory runs={[...workflow.runs]} />
        </div>
      </div>
    </AppLayout>
  )
}
