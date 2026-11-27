'use client'

import {
  Network,
  GitBranch,
  Activity,
  Search,
  TrendingUp,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

interface Feature {
  readonly title: string
  readonly description: string
  readonly icon: LucideIcon
}

const FEATURES: readonly Feature[] = [
  {
    title: 'Agent Topology Map',
    description:
      'Visualize your entire agent network with real-time status and relationship graphs.',
    icon: Network,
  },
  {
    title: 'Orchestration Workflows',
    description:
      'Design and deploy multi-agent workflows with drag-and-drop pipeline builders.',
    icon: GitBranch,
  },
  {
    title: 'Real-Time Monitoring',
    description:
      'Track agent health, latency, and throughput with live dashboards and alerting.',
    icon: Activity,
  },
  {
    title: 'Message Tracing',
    description:
      'Trace every message between agents with full payload inspection and filtering.',
    icon: Search,
  },
  {
    title: 'Auto-Scaling',
    description:
      'Automatically scale agent pools based on queue depth and latency targets.',
    icon: TrendingUp,
  },
  {
    title: 'Human-in-the-Loop',
    description:
      'Insert human review checkpoints at any stage of an agent workflow.',
    icon: UserCheck,
  },
] as const

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader title="Everything for multi-agent infrastructure" />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <StaggerItem key={feature.title}>
              <div className="rounded-xl border border-border-default bg-bg-secondary p-6 transition hover:border-cyan-accent/30">
                <Icon className="h-6 w-6 text-cyan-accent" />
                <h3 className="mt-3 font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </section>
  )
}
