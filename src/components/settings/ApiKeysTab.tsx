'use client'

import type { ApiKey } from '@/lib/types'
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
import { Copy, Trash2 } from 'lucide-react'

interface ApiKeysTabProps {
  readonly keys: readonly ApiKey[]
}

export function ApiKeysTab({ keys }: ApiKeysTabProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-text-primary">API Keys</CardTitle>
        <Button size="sm">Generate New Key</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border-default">
              <TableHead className="text-text-secondary">Name</TableHead>
              <TableHead className="text-text-secondary">Key</TableHead>
              <TableHead className="text-text-secondary">Created</TableHead>
              <TableHead className="text-text-secondary">Last Used</TableHead>
              <TableHead className="text-text-secondary">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.id} className="border-border-default/50">
                <TableCell className="text-text-primary">{key.name}</TableCell>
                <TableCell className="font-mono text-xs text-text-primary">
                  {key.key}
                </TableCell>
                <TableCell className="text-text-primary">
                  {key.createdAt}
                </TableCell>
                <TableCell className="text-text-primary">
                  {key.lastUsed}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Copy"
                    >
                      <Copy />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Revoke"
                      className="text-red-400"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
