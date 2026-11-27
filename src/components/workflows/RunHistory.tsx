'use client'

import type { WorkflowRun } from '@/lib/types'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface RunHistoryProps {
  readonly runs: readonly WorkflowRun[]
}

function statusVariant(status: WorkflowRun['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'success':
      return 'default'
    case 'failed':
      return 'destructive'
    case 'timeout':
      return 'outline'
  }
}

export function RunHistory({ runs }: RunHistoryProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Run ID</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tokens</TableHead>
          <TableHead>Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runs.map((run) => (
          <TableRow key={run.id}>
            <TableCell className="font-mono text-xs">{run.id}</TableCell>
            <TableCell className="text-text-secondary text-sm">
              {run.timestamp}
            </TableCell>
            <TableCell className="text-text-secondary text-sm">
              {run.duration}s
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant(run.status)}>{run.status}</Badge>
            </TableCell>
            <TableCell className="text-text-secondary text-sm">
              {run.tokensUsed.toLocaleString()}
            </TableCell>
            <TableCell className="text-text-secondary text-sm">
              ${run.cost.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
