'use client'

import { AreaChart, Area, ResponsiveContainer } from 'recharts'

interface SparklineProps {
  readonly data: readonly number[]
  readonly color?: string
  readonly width?: number
  readonly height?: number
}

export function Sparkline({
  data,
  color = '#22d3ee',
  width = 80,
  height = 30,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }))
  const gradientId = `sparkline-gradient-${color.replace('#', '')}`

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
