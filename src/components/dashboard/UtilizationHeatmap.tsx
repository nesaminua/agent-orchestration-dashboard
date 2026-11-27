'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { HeatmapCell, Agent } from '@/lib/types'

interface UtilizationHeatmapProps {
  readonly data: readonly HeatmapCell[]
  readonly agents: readonly Agent[]
}

const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23,
] as const

const HOUR_LABELS = [0, 6, 12, 18] as const

function getCellColor(utilization: number): string {
  if (utilization >= 90) return 'bg-cyan-400'
  if (utilization >= 70) return 'bg-cyan-500'
  if (utilization >= 50) return 'bg-cyan-600'
  if (utilization >= 30) return 'bg-cyan-700'
  if (utilization >= 10) return 'bg-cyan-800'
  return 'bg-cyan-900/30'
}

function getCellForAgent(
  data: readonly HeatmapCell[],
  agentId: string,
  hour: number
): HeatmapCell | undefined {
  return data.find((cell) => cell.agentId === agentId && cell.hour === hour)
}

export function UtilizationHeatmap({ data, agents }: UtilizationHeatmapProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">
          Agent Utilization Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Hour labels row */}
          <div className="mb-1 flex">
            <div className="w-32 shrink-0" />
            <div className="grid flex-1 grid-cols-24 gap-px">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="text-center text-xs text-text-secondary"
                >
                  {(HOUR_LABELS as readonly number[]).includes(hour)
                    ? String(hour)
                    : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Agent rows */}
          {agents.map((agent) => (
            <div key={agent.id} className="mb-px flex items-center">
              <div className="w-32 shrink-0 truncate pr-2 text-xs text-text-primary">
                {agent.name}
              </div>
              <div className="grid flex-1 grid-cols-24 gap-px">
                {HOURS.map((hour) => {
                  const cell = getCellForAgent(data, agent.id, hour)
                  const utilization = cell?.utilization ?? 0
                  return (
                    <div
                      key={`${agent.id}-${hour}`}
                      data-testid="heatmap-cell"
                      className={`h-6 rounded-sm ${getCellColor(utilization)}`}
                      title={`${agent.name} - ${hour}:00 - ${utilization}%`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
