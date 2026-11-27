'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { WorkflowSuccessRateEntry } from '@/lib/types'

interface WorkflowSuccessChartProps {
  readonly data: readonly WorkflowSuccessRateEntry[]
}

export function WorkflowSuccessChart({ data }: WorkflowSuccessChartProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">
          Workflow Success Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[...data]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" domain={[90, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
