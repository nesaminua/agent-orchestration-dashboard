'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { CostByAgentEntry } from '@/lib/types'

interface CostChartProps {
  readonly data: readonly CostByAgentEntry[]
}

export function CostChart({ data }: CostChartProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">Cost by Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[...data]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="agentName" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="cost" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
