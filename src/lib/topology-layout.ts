import type { AgentType, AgentStatus, MessageType, Position } from './types'

/**
 * Compute a cubic bezier SVG path between two positions.
 * Returns: "M x1,y1 C cx1,cy1 cx2,cy2 x2,y2"
 * Control points are offset by ~40% of the distance for smooth curves.
 */
export function computeEdgePath(from: Readonly<Position>, to: Readonly<Position>): string {
  const dx = to.x - from.x
  const dy = to.y - from.y

  // Offset control points to create a smooth curve
  // Primarily vertical offset for visual interest
  const offsetX = dx * 0.1
  const offsetY = dy * 0.4

  const cx1 = from.x + offsetX
  const cy1 = from.y + offsetY
  const cx2 = to.x - offsetX
  const cy2 = to.y - offsetY

  return `M ${from.x},${from.y} C ${cx1},${cy1} ${cx2},${cy2} ${to.x},${to.y}`
}

const AGENT_TYPE_COLORS: Readonly<Record<AgentType, string>> = {
  orchestrator: '#22d3ee',
  worker: '#a78bfa',
  rag: '#f59e0b',
  tool: '#60a5fa',
  router: '#34d399',
  human: '#fb923c',
}

const STATUS_COLORS: Readonly<Record<AgentStatus, string>> = {
  healthy: '#22d3ee',
  active: '#a78bfa',
  idle: '#94a3b8',
  degraded: '#f59e0b',
  failed: '#ef4444',
  starting: '#60a5fa',
}

interface MessageTypeInfo {
  readonly color: string
  readonly label: string
}

const MESSAGE_TYPE_MAP: Readonly<Record<MessageType, MessageTypeInfo>> = {
  TASK_ASSIGN: { color: '#22d3ee', label: 'TASK_ASSIGN' },
  TOOL_REQUEST: { color: '#60a5fa', label: 'TOOL_REQUEST' },
  TOOL_RESULT: { color: '#34d399', label: 'TOOL_RESULT' },
  TASK_COMPLETE: { color: '#34d399', label: 'TASK_COMPLETE' },
  ERROR: { color: '#ef4444', label: 'ERROR' },
  HUMAN_REVIEW: { color: '#fb923c', label: 'HUMAN_REVIEW' },
}

/**
 * Get the hex color for an agent type.
 */
export function getAgentTypeColor(type: AgentType): string {
  return AGENT_TYPE_COLORS[type]
}

/**
 * Get the hex color for an agent status.
 */
export function getStatusColor(status: AgentStatus): string {
  return STATUS_COLORS[status]
}

/**
 * Get color and label for a message type.
 */
export function getMessageTypeColor(type: MessageType): MessageTypeInfo {
  return MESSAGE_TYPE_MAP[type]
}

/**
 * Get just the display label for a message type.
 */
export function getMessageTypeLabel(type: MessageType): string {
  return MESSAGE_TYPE_MAP[type].label
}
