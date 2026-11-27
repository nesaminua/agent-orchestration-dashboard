'use client'

import type { AlertRule } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Bell } from 'lucide-react'

interface AlertsTabProps {
  readonly rules: readonly AlertRule[]
}

export function AlertsTab({ rules }: AlertsTabProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-text-primary">Alert Rules</CardTitle>
        <Button size="sm">Add Rule</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {rules.map((rule, index) => (
            <div key={rule.id}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-text-muted" />
                  <div className="space-y-1">
                    <span className="text-text-primary font-medium">
                      {rule.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-text-muted bg-bg-code px-2 py-1 rounded">
                        {rule.condition}
                      </code>
                      <span className="text-text-secondary text-xs">
                        Threshold: {rule.threshold}
                      </span>
                    </div>
                  </div>
                </div>
                <Switch checked={rule.enabled} />
              </div>
              {index < rules.length - 1 && (
                <Separator className="bg-border-default" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
