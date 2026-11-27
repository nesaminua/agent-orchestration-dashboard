'use client'

import type { Webhook } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface WebhooksTabProps {
  readonly webhooks: readonly Webhook[]
}

function formatUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.host
  } catch {
    return url
  }
}

function formatLastTriggered(lastTriggered: string | null): string {
  if (lastTriggered === null) {
    return 'Never'
  }
  return lastTriggered
}

function formatSuccessRate(rate: number): string {
  return `${rate}%`
}

export function WebhooksTab({ webhooks }: WebhooksTabProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-text-primary">Webhooks</CardTitle>
        <Button size="sm">Add Webhook</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border-default">
              <TableHead className="text-text-secondary">URL</TableHead>
              <TableHead className="text-text-secondary">Events</TableHead>
              <TableHead className="text-text-secondary">Enabled</TableHead>
              <TableHead className="text-text-secondary">
                Last Triggered
              </TableHead>
              <TableHead className="text-text-secondary">
                Success Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id} className="border-border-default/50">
                <TableCell className="font-mono text-xs text-text-primary max-w-[200px] truncate">
                  {formatUrl(webhook.url)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="secondary">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-text-primary">
                  {webhook.enabled ? 'Yes' : 'No'}
                </TableCell>
                <TableCell className="text-text-primary">
                  {formatLastTriggered(webhook.lastTriggered)}
                </TableCell>
                <TableCell className="text-text-primary">
                  {formatSuccessRate(webhook.successRate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
