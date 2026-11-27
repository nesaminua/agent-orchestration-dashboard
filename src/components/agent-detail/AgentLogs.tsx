'use client'

import type { AgentLog } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AgentLogsProps {
  readonly logs: readonly AgentLog[]
  readonly agentId: string
}

function severityVariant(severity: AgentLog['severity']): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (severity) {
    case 'ERROR':
      return 'destructive'
    case 'WARN':
      return 'outline'
    default:
      return 'secondary'
  }
}

export function AgentLogs({ logs }: AgentLogsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-text-primary text-sm font-medium">Logs</h3>
        <Button variant="outline" size="sm" name="export">
          Export
        </Button>
      </div>

      <ScrollArea className="h-[480px]">
        <ul className="space-y-2">
          {logs.map((log) => (
            <li
              key={log.id}
              className="bg-bg-secondary border-border-default flex items-start gap-3 rounded-md border p-3"
            >
              <Badge variant={severityVariant(log.severity)} className="shrink-0">
                {log.severity}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="text-text-primary text-sm">{log.message}</p>
                <p className="text-text-muted mt-1 text-xs">{log.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
