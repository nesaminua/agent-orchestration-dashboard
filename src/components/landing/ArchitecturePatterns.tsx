'use client'

import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

interface PatternCard {
  readonly title: string
  readonly description: string
  readonly diagram: React.ReactNode
}

function SequentialDiagram() {
  return (
    <svg viewBox="0 0 200 60" className="mt-4 w-full" aria-hidden="true">
      <circle cx={30} cy={30} r={10} fill="#22d3ee" opacity={0.8} />
      <line x1={40} y1={30} x2={90} y2={30} stroke="#1e293b" strokeWidth={2} />
      <circle cx={100} cy={30} r={10} fill="#a78bfa" opacity={0.8} />
      <line x1={110} y1={30} x2={160} y2={30} stroke="#1e293b" strokeWidth={2} />
      <circle cx={170} cy={30} r={10} fill="#34d399" opacity={0.8} />
    </svg>
  )
}

function HierarchicalDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="mt-4 w-full" aria-hidden="true">
      <circle cx={100} cy={15} r={10} fill="#22d3ee" opacity={0.8} />
      <line x1={100} y1={25} x2={40} y2={55} stroke="#1e293b" strokeWidth={2} />
      <line x1={100} y1={25} x2={100} y2={55} stroke="#1e293b" strokeWidth={2} />
      <line x1={100} y1={25} x2={160} y2={55} stroke="#1e293b" strokeWidth={2} />
      <circle cx={40} cy={65} r={10} fill="#a78bfa" opacity={0.8} />
      <circle cx={100} cy={65} r={10} fill="#60a5fa" opacity={0.8} />
      <circle cx={160} cy={65} r={10} fill="#34d399" opacity={0.8} />
    </svg>
  )
}

function PeerToPeerDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="mt-4 w-full" aria-hidden="true">
      <line x1={50} y1={20} x2={150} y2={20} stroke="#1e293b" strokeWidth={2} />
      <line x1={50} y1={20} x2={50} y2={60} stroke="#1e293b" strokeWidth={2} />
      <line x1={150} y1={20} x2={150} y2={60} stroke="#1e293b" strokeWidth={2} />
      <line x1={50} y1={60} x2={150} y2={60} stroke="#1e293b" strokeWidth={2} />
      <line x1={50} y1={20} x2={150} y2={60} stroke="#1e293b" strokeWidth={2} />
      <line x1={150} y1={20} x2={50} y2={60} stroke="#1e293b" strokeWidth={2} />
      <circle cx={50} cy={20} r={10} fill="#22d3ee" opacity={0.8} />
      <circle cx={150} cy={20} r={10} fill="#a78bfa" opacity={0.8} />
      <circle cx={50} cy={60} r={10} fill="#60a5fa" opacity={0.8} />
      <circle cx={150} cy={60} r={10} fill="#34d399" opacity={0.8} />
    </svg>
  )
}

const PATTERNS: readonly PatternCard[] = [
  {
    title: 'Sequential Pipeline',
    description:
      'Chain agents in a linear flow where each agent processes and passes results to the next.',
    diagram: <SequentialDiagram />,
  },
  {
    title: 'Hierarchical Orchestration',
    description:
      'A central orchestrator delegates tasks to specialized worker agents and aggregates results.',
    diagram: <HierarchicalDiagram />,
  },
  {
    title: 'Peer-to-Peer Swarm',
    description:
      'Fully connected agents collaborate and negotiate without a central coordinator.',
    diagram: <PeerToPeerDiagram />,
  },
] as const

export function ArchitecturePatterns() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader title="Built for any multi-agent architecture" />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
        {PATTERNS.map((pattern) => (
          <StaggerItem key={pattern.title}>
            <div className="rounded-xl border border-border-default bg-bg-secondary p-6 transition hover:border-cyan-accent/30">
              <h3 className="text-lg font-semibold text-text-primary">
                {pattern.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {pattern.description}
              </p>
              {pattern.diagram}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
