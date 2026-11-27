'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { HourlyMessageEntry } from '@/lib/types'

interface MessagesChartProps {
  readonly data: readonly HourlyMessageEntry[]
}

export function MessagesChart({ data }: MessagesChartProps) {
  return (
    <Card className="border-border-default bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={[...data]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="hour" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
