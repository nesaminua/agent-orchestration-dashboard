// --- Agent Types ---

export type AgentType = 'orchestrator' | 'worker' | 'rag' | 'tool' | 'router' | 'human'

export type AgentStatus = 'healthy' | 'active' | 'idle' | 'degraded' | 'failed' | 'starting'

export interface Position {
  readonly x: number
  readonly y: number
}

export interface MemoryConfig {
  readonly type: 'buffer' | 'summary' | 'vector'
  readonly maxTokens: number
}

export interface ToolDefinition {
  readonly name: string
  readonly description: string
  readonly parameters: Readonly<Record<string, string>>
}

export interface RetryPolicy {
  readonly maxRetries: number
  readonly backoffMs: number
  readonly timeoutMs: number
}

export interface Agent {
  readonly id: string
  readonly name: string
  readonly type: AgentType
  readonly model: string
  readonly status: AgentStatus
  readonly latencyMs: number
  readonly latencyHistory: readonly number[]
  readonly messagesPerMin: number
  readonly taskCount: number
  readonly successRate: number
  readonly tokenUsage: number
  readonly costToday: number
  readonly connectedTo: readonly string[]
  readonly position: Readonly<Position>
  readonly uptime: string
  readonly role: string
  readonly memoryConfig: MemoryConfig
  readonly tools: readonly ToolDefinition[]
  readonly retryPolicy: RetryPolicy
}

// --- Message Types ---

export type MessageType =
  | 'TASK_ASSIGN'
  | 'TOOL_REQUEST'
  | 'TOOL_RESULT'
  | 'TASK_COMPLETE'
  | 'ERROR'
  | 'HUMAN_REVIEW'

export interface MessageMetadata {
  readonly priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  readonly timeout?: number
  readonly tokens?: number
  readonly duration?: number
  readonly confidence?: number
  readonly sources?: number
  readonly resultCount?: number
}

export interface Message {
  readonly id: string
  readonly timestamp: string
  readonly from: string
  readonly to: string
  readonly type: MessageType
  readonly content: string
  readonly metadata: MessageMetadata
}

// --- Task Types ---

export type TaskStatus = 'active' | 'completed' | 'failed' | 'queued'

export interface SwarmTask {
  readonly id: string
  readonly name: string
  readonly status: TaskStatus
  readonly agents: readonly string[]
  readonly progress: number
  readonly duration: number
  readonly startedAt: string
}

// --- Workflow Types ---

export type WorkflowPattern = 'sequential' | 'hierarchical' | 'peer-to-peer' | 'dag'

export interface WorkflowAgent {
  readonly id: string
  readonly agentId: string
  readonly role: string
  readonly model: string
  readonly position: Readonly<Position>
}

export interface WorkflowEdge {
  readonly from: string
  readonly to: string
  readonly condition?: string
}

export interface WorkflowRun {
  readonly id: string
  readonly timestamp: string
  readonly duration: number
  readonly status: 'success' | 'failed' | 'timeout'
  readonly pathTaken: readonly string[]
  readonly tokensUsed: number
  readonly cost: number
}

export interface Workflow {
  readonly id: string
  readonly name: string
  readonly pattern: WorkflowPattern
  readonly agentCount: number
  readonly status: 'active' | 'draft' | 'archived'
  readonly description: string
  readonly agents: readonly WorkflowAgent[]
  readonly edges: readonly WorkflowEdge[]
  readonly runs: readonly WorkflowRun[]
  readonly yaml: string
}

// --- Metrics & Analytics ---

export interface SystemMetrics {
  readonly totalAgents: number
  readonly healthyAgents: number
  readonly degradedAgents: number
  readonly failedAgents: number
  readonly startingAgents: number
  readonly messagesPerMin: number
  readonly avgLatencyMs: number
  readonly errorRate: number
  readonly tokenBudgetUsed: number
  readonly totalTokens: number
  readonly totalCost: number
}

export interface DashboardStats {
  readonly totalMessagesToday: number
  readonly totalMessagesChange: number
  readonly avgEndToEndLatency: number
  readonly latencyChange: number
  readonly dailyCost: number
  readonly costChange: number
  readonly activeWorkflows: number
  readonly failedTasks24h: number
  readonly failedTasksRate: number
}

// --- Settings ---

export interface AlertRule {
  readonly id: string
  readonly name: string
  readonly condition: string
  readonly threshold: number
  readonly enabled: boolean
}

export interface ApiKey {
  readonly id: string
  readonly name: string
  readonly key: string
  readonly createdAt: string
  readonly lastUsed: string
}

// --- Logs ---

export type LogSeverity = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export interface AgentLog {
  readonly id: string
  readonly timestamp: string
  readonly agentId: string
  readonly severity: LogSeverity
  readonly message: string
  readonly payload?: string
}

// --- Evaluation ---

export interface EvalResult {
  readonly id: string
  readonly testName: string
  readonly model: string
  readonly accuracy: number
  readonly latencyMs: number
  readonly cost: number
  readonly timestamp: string
}

// --- Heatmap ---

export interface HeatmapCell {
  readonly agentId: string
  readonly hour: number
  readonly utilization: number
}

// --- Settings Types ---

export type WebhookEvent = 'task.complete' | 'task.failed' | 'agent.down' | 'human_review.needed' | 'cost.threshold'

export interface Webhook {
  readonly id: string
  readonly url: string
  readonly events: readonly WebhookEvent[]
  readonly enabled: boolean
  readonly createdAt: string
  readonly lastTriggered: string | null
  readonly successRate: number
}

export type IntegrationStatus = 'connected' | 'disconnected' | 'error'

export interface Integration {
  readonly id: string
  readonly name: string
  readonly type: 'langgraph' | 'crewai' | 'autogen' | 'custom_python'
  readonly status: IntegrationStatus
  readonly version: string
  readonly lastSync: string
  readonly agentCount: number
  readonly description: string
}

export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer'

export interface TeamMember {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly role: TeamRole
  readonly avatarUrl: string | null
  readonly joinedAt: string
  readonly lastActive: string
}

// --- Chart Data Shapes ---

export interface HourlyMessageEntry {
  readonly hour: string
  readonly count: number
}

export interface CostByAgentEntry {
  readonly agentName: string
  readonly cost: number
}

export interface WorkflowSuccessRateEntry {
  readonly date: string
  readonly rate: number
}
