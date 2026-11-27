'use client'

import { useMemo } from 'react'
import { cn, formatLatency, formatTokens, formatCurrency, formatPercent } from '@/lib/utils'
import { getAgentTypeColor } from '@/lib/topology-layout'
import { Sparkline } from '@/components/shared/Sparkline'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Agent, SystemMetrics } from '@/lib/types'

interface LiveMetricsProps {
  readonly agents: readonly Agent[]
  readonly metrics: SystemMetrics
}

const PANEL_CLASSES = 'bg-[#111827] border border-[#1e293b] rounded-xl p-4 h-full'
const SECTION_TITLE_CLASSES = 'text-xs font-semibold uppercase tracking-wider text-[#475569] mb-2'
const LARGE_NUMBER_CLASSES = 'text-2xl font-bold font-mono tabular-nums text-[#f1f5f9]'
const MONO_MUTED_CLASSES = 'font-mono tabular-nums text-[#94a3b8]'

interface SectionHeaderProps {
  readonly title: string
}

function SectionHeader({ title }: SectionHeaderProps) {
  return <h3 className={SECTION_TITLE_CLASSES}>{title}</h3>
}

interface MessagesPerSecSectionProps {
  readonly messagesPerMin: number
  readonly latencyHistory: readonly number[]
}

function MessagesPerSecSection({ messagesPerMin, latencyHistory }: MessagesPerSecSectionProps) {
  const messagesPerSec = (messagesPerMin / 60).toFixed(1)

  return (
    <section className="mb-5">
      <SectionHeader title="Messages/sec" />
      <div className="flex items-center gap-3">
        <span className={LARGE_NUMBER_CLASSES}>{messagesPerSec}</span>
        <Sparkline data={latencyHistory} color="#22d3ee" width={80} height={28} />
      </div>
    </section>
  )
}

interface AgentLatencyRowProps {
  readonly agent: Agent
}

function AgentLatencyRow({ agent }: AgentLatencyRowProps) {
  const color = getAgentTypeColor(agent.type)

  return (
    <div className="flex items-center gap-2 py-1">
      <span
        className="text-xs font-mono w-24 truncate"
        style={{ color }}
      >
        {agent.name}
      </span>
      <span className={cn('text-xs w-14 text-right', MONO_MUTED_CLASSES)}>
        {formatLatency(agent.latencyMs)}
      </span>
      <Sparkline
        data={agent.latencyHistory}
        color={color}
        width={60}
        height={20}
      />
    </div>
  )
}

interface AgentLatencySectionProps {
  readonly agents: readonly Agent[]
}

function AgentLatencySection({ agents }: AgentLatencySectionProps) {
  return (
    <section className="mb-5">
      <SectionHeader title="Agent Latency (P95)" />
      <div className="space-y-0.5">
        {agents.map((agent) => (
          <AgentLatencyRow key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  )
}

interface TokenUsageSectionProps {
  readonly tokenBudgetUsed: number
  readonly totalTokens: number
  readonly totalCost: number
}

function TokenUsageSection({ tokenBudgetUsed, totalTokens, totalCost }: TokenUsageSectionProps) {
  return (
    <section className="mb-5">
      <SectionHeader title="Token Usage (last hour)" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Progress
            value={tokenBudgetUsed}
            className="flex-1 bg-[#1e293b] h-2"
          />
          <span className={cn('text-xs', MONO_MUTED_CLASSES)}>
            {formatPercent(tokenBudgetUsed)}
          </span>
        </div>
        <p className={cn('text-xs', MONO_MUTED_CLASSES)}>
          {formatTokens(totalTokens)} tokens &middot; {formatCurrency(totalCost)}
        </p>
      </div>
    </section>
  )
}

interface ErrorRateSectionProps {
  readonly errorRate: number
  readonly errorHistory: readonly number[]
}

function ErrorRateSection({ errorRate, errorHistory }: ErrorRateSectionProps) {
  const errorColor = errorRate > 1 ? '#ef4444' : '#34d399'

  return (
    <section>
      <SectionHeader title="Error Rate" />
      <div className="flex items-center gap-3">
        <Sparkline data={errorHistory} color={errorColor} width={100} height={24} />
        <span className={cn('text-sm', MONO_MUTED_CLASSES)}>
          {formatPercent(errorRate)}
        </span>
      </div>
      <p className={cn('text-xs mt-1', MONO_MUTED_CLASSES)}>
        {errorRate === 0 ? 'No recent errors' : `Error rate: ${formatPercent(errorRate)}`}
      </p>
    </section>
  )
}

export function LiveMetrics({ agents, metrics }: LiveMetricsProps) {
  const sortedAgents = useMemo(
    () => [...agents].sort((a, b) => b.latencyMs - a.latencyMs),
    [agents]
  )

  const aggregatedLatencyHistory = useMemo(() => {
    if (agents.length === 0) return Array.from({ length: 20 }, () => 0)
    const historyLength = agents[0].latencyHistory.length
    return Array.from({ length: historyLength }, (_, i) => {
      const sum = agents.reduce((acc, agent) => acc + (agent.latencyHistory[i] ?? 0), 0)
      return sum / agents.length
    })
  }, [agents])

  const errorHistory = useMemo(() => {
    const history: number[] = []
    for (let i = 0; i < 20; i++) {
      const seed = (metrics.errorRate * 1000 + i) % 100
      const pseudoRandom = (seed / 100 - 0.5)
      history.push(metrics.errorRate + pseudoRandom * metrics.errorRate * 0.3)
    }
    return history
  }, [metrics.errorRate])

  return (
    <div className={PANEL_CLASSES}>
      <ScrollArea className="h-full">
        <div className="pr-2">
          <h2 className="text-sm font-semibold text-[#f1f5f9] mb-4">
            Live Metrics
          </h2>

          <MessagesPerSecSection
            messagesPerMin={metrics.messagesPerMin}
            latencyHistory={aggregatedLatencyHistory}
          />

          <AgentLatencySection agents={sortedAgents} />

          <TokenUsageSection
            tokenBudgetUsed={metrics.tokenBudgetUsed}
            totalTokens={metrics.totalTokens}
            totalCost={metrics.totalCost}
          />

          <ErrorRateSection
            errorRate={metrics.errorRate}
            errorHistory={errorHistory}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
