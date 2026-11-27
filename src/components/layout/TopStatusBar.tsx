'use client'

import { StatusDot } from '@/components/shared/StatusDot'
import { formatNumber, formatLatency, formatPercent } from '@/lib/utils'
import type { SystemMetrics } from '@/lib/types'

interface TopStatusBarProps {
  readonly metrics: SystemMetrics
}

export function TopStatusBar({ metrics }: TopStatusBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#1e293b] bg-[#1e293b] px-4 font-mono text-xs">
      {/* Left: System status */}
      <div className="flex items-center gap-2">
        <span className="text-[#94a3b8] uppercase tracking-wider">
          System Status:
        </span>
        <StatusDot status="healthy" size="sm" pulse />
        <span className="font-semibold text-[#22d3ee]">OPERATIONAL</span>
      </div>

      {/* Center: Metrics */}
      <div className="hidden items-center gap-4 text-[#94a3b8] md:flex">
        <span>
          Agents:{' '}
          <span className="text-text-primary">
            {metrics.healthyAgents}/{metrics.totalAgents} Healthy
          </span>
        </span>
        <span className="text-[#475569]">&middot;</span>
        <span>
          Messages:{' '}
          <span className="text-text-primary">
            {formatNumber(metrics.messagesPerMin)}/min
          </span>
        </span>
        <span className="text-[#475569]">&middot;</span>
        <span>
          Avg Latency:{' '}
          <span className="text-text-primary">
            {formatLatency(metrics.avgLatencyMs)}
          </span>
        </span>
        <span className="text-[#475569]">&middot;</span>
        <span>
          Errors:{' '}
          <span className="text-text-primary">
            {formatPercent(metrics.errorRate)}
          </span>
        </span>
      </div>

      {/* Right: Live indicator */}
      <div className="flex items-center gap-2 text-[#94a3b8]">
        <span className="text-text-primary">[Live]</span>
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#22d3ee]"
          style={{ animation: 'blink 1.5s ease-in-out infinite' }}
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
