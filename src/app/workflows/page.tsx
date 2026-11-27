'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { workflows } from '@/lib/mock-data'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function nameContainsPattern(name: string, pattern: string): boolean {
  return name.toLowerCase().includes(pattern.toLowerCase())
}

export default function WorkflowsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-8">
        <h1 className="text-text-primary text-2xl font-bold">Workflows</h1>

        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="bg-bg-secondary border-border-default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-text-primary">{workflow.name}</CardTitle>
                  {!nameContainsPattern(workflow.name, workflow.pattern) && (
                    <Badge variant="outline">{workflow.pattern}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>{workflow.agentCount} agents</span>
                  <span>{workflow.runs.length} runs</span>
                  <Badge variant="secondary">{workflow.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
