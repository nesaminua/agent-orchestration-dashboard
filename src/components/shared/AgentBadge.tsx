'use client'

import { Badge } from '@/components/ui/badge'
import { getAgentTypeColor } from '@/lib/topology-layout'
import type { AgentType } from '@/lib/types'
import {
  Brain,
  Pickaxe,
  BookOpen,
  Wrench,
  GitFork,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface AgentBadgeProps {
  readonly type: AgentType
  readonly name?: string
}

const AGENT_TYPE_ICONS: Readonly<Record<AgentType, LucideIcon>> = {
  orchestrator: Brain,
  worker: Pickaxe,
  rag: BookOpen,
  tool: Wrench,
  router: GitFork,
  human: UserCheck,
}

const AGENT_TYPE_LABELS: Readonly<Record<AgentType, string>> = {
  orchestrator: 'Orchestrator',
  worker: 'Worker',
  rag: 'RAG',
  tool: 'Tool',
  router: 'Router',
  human: 'Human',
}

export function AgentBadge({ type, name }: AgentBadgeProps) {
  const color = getAgentTypeColor(type)
  const Icon = AGENT_TYPE_ICONS[type]
  const label = name ?? AGENT_TYPE_LABELS[type]

  return (
    <Badge
      variant="outline"
      className="gap-1 font-mono text-xs"
      style={{
        borderColor: `${color}40`,
        color,
        backgroundColor: `${color}10`,
      }}
    >
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}
