'use client'

import { motion } from 'motion/react'
import { getAgentTypeColor, getStatusColor } from '@/lib/topology-layout'
import { formatLatency, truncateId } from '@/lib/utils'
import type { Agent, AgentType } from '@/lib/types'

interface TopologyNodeProps {
  readonly agent: Agent
  readonly index: number
}

const AGENT_EMOJI: Readonly<Record<AgentType, string>> = {
  orchestrator: '\u{1F9E0}',
  worker: '\u{1F50D}',
  rag: '\u{1F4DA}',
  tool: '\u{1F527}',
  router: '\u{1F500}',
  human: '\u{1F464}',
}

const ORCHESTRATOR_RADIUS = 40
const DEFAULT_RADIUS = 32
const ORCHESTRATOR_STROKE = 3
const DEFAULT_STROKE = 2
const STATUS_DOT_RADIUS = 6
const STATUS_DOT_CX = 20
const STATUS_DOT_CY = 20
const STAGGER_MS = 100

function isActiveAgent(agent: Agent): boolean {
  return agent.status === 'active' || agent.status === 'healthy'
}

function getNodeRadius(type: AgentType): number {
  return type === 'orchestrator' ? ORCHESTRATOR_RADIUS : DEFAULT_RADIUS
}

function getStrokeWidth(type: AgentType): number {
  return type === 'orchestrator' ? ORCHESTRATOR_STROKE : DEFAULT_STROKE
}

interface OuterRingProps {
  readonly type: AgentType
  readonly status: Agent['status']
  readonly color: string
}

function OuterRing({ type, status, color }: OuterRingProps) {
  const radius = getNodeRadius(type)
  const strokeWidth = getStrokeWidth(type)
  const isOrchestrator = type === 'orchestrator'
  const isProcessing = status === 'active'

  return (
    <circle
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={0.8}
      style={{
        ...(isOrchestrator
          ? {
              filter: `drop-shadow(0 0 12px ${color}40)`,
              animation: 'orchestrator-pulse 3s ease-in-out infinite',
            }
          : {}),
        ...(isProcessing
          ? {
              transformOrigin: '0 0',
              strokeDasharray: `${radius * 1.2} ${radius * 0.8}`,
              animation: 'spin-ring 3s linear infinite',
            }
          : {}),
      }}
    />
  )
}

interface FillCircleProps {
  readonly type: AgentType
}

function FillCircle({ type }: FillCircleProps) {
  const radius = getNodeRadius(type) - 4
  return <circle r={radius} fill="#111827" />
}

interface StatusIndicatorProps {
  readonly status: Agent['status']
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusColor = getStatusColor(status)
  const isPulsing = status === 'active' || status === 'healthy'

  return (
    <circle
      cx={STATUS_DOT_CX}
      cy={STATUS_DOT_CY}
      r={STATUS_DOT_RADIUS}
      fill={statusColor}
      stroke="#111827"
      strokeWidth={2}
      style={
        isPulsing
          ? { animation: 'status-pulse 2s ease-in-out infinite' }
          : undefined
      }
    />
  )
}

interface AgentIconProps {
  readonly type: AgentType
}

function AgentIcon({ type }: AgentIconProps) {
  return (
    <text
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={type === 'orchestrator' ? 22 : 18}
      style={{ pointerEvents: 'none' }}
    >
      {AGENT_EMOJI[type]}
    </text>
  )
}

interface AgentLabelProps {
  readonly id: string
  readonly latencyMs: number
  readonly type: AgentType
}

function AgentLabel({ id, latencyMs, type }: AgentLabelProps) {
  const labelY = getNodeRadius(type) + 16
  const latencyY = labelY + 14

  return (
    <>
      <text
        y={labelY}
        textAnchor="middle"
        fill="#f1f5f9"
        fontSize={10}
        fontFamily="var(--font-mono)"
      >
        {truncateId(id)}
      </text>
      <text
        y={latencyY}
        textAnchor="middle"
        fill="#475569"
        fontSize={9}
        fontFamily="var(--font-mono)"
      >
        {formatLatency(latencyMs)}
      </text>
    </>
  )
}

export function TopologyNode({ agent, index }: TopologyNodeProps) {
  const color = getAgentTypeColor(agent.type)
  const active = isActiveAgent(agent)

  return (
    <motion.g
      transform={`translate(${agent.position.x}, ${agent.position.y})`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: active ? 1.0 : 0.6 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * (STAGGER_MS / 1000),
      }}
      style={{ transformOrigin: `${agent.position.x}px ${agent.position.y}px` }}
    >
      <OuterRing type={agent.type} status={agent.status} color={color} />
      <FillCircle type={agent.type} />
      <StatusIndicator status={agent.status} />
      <AgentIcon type={agent.type} />
      <AgentLabel
        id={agent.id}
        latencyMs={agent.latencyMs}
        type={agent.type}
      />
    </motion.g>
  )
}
