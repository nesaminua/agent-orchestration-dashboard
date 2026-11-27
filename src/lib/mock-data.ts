import type {
  Agent,
  Message,
  SwarmTask,
  Workflow,
  SystemMetrics,
  DashboardStats,
  AlertRule,
  ApiKey,
  AgentLog,
  EvalResult,
  HeatmapCell,
  HourlyMessageEntry,
  CostByAgentEntry,
  WorkflowSuccessRateEntry,
  Webhook,
  Integration,
  TeamMember,
} from './types'

// ============================================================
// Agents (8 total)
// ============================================================

export const agents: readonly Agent[] = [
  {
    id: 'agent-orch-001',
    name: 'Orchestrator',
    type: 'orchestrator',
    model: 'gpt-4o',
    status: 'healthy',
    latencyMs: 34,
    latencyHistory: [32, 35, 31, 34, 36, 33, 34, 35, 34, 33, 32, 34, 35, 34, 33, 34, 35, 34, 33, 34],
    messagesPerMin: 847,
    taskCount: 1245,
    successRate: 99.8,
    tokenUsage: 45670,
    costToday: 12.34,
    connectedTo: ['agent-research-001', 'agent-writer-001', 'agent-tool-001', 'agent-reviewer-001', 'agent-router-001'],
    position: { x: 400, y: 60 },
    uptime: '99.98%',
    role: 'Central orchestrator responsible for task delegation, workflow coordination, and agent lifecycle management. Routes incoming requests to specialized agents based on task type and current load.',
    memoryConfig: { type: 'summary', maxTokens: 8192 },
    tools: [
      { name: 'delegate_task', description: 'Assign a task to a worker agent', parameters: { task_id: 'string', agent_id: 'string', priority: 'HIGH|MEDIUM|LOW' } },
      { name: 'check_status', description: 'Query agent health and progress', parameters: { agent_id: 'string' } },
      { name: 'escalate', description: 'Escalate task to human reviewer', parameters: { task_id: 'string', reason: 'string' } },
    ],
    retryPolicy: { maxRetries: 3, backoffMs: 1000, timeoutMs: 30000 },
  },
  {
    id: 'agent-research-001',
    name: 'Research Agent',
    type: 'worker',
    model: 'gpt-4o',
    status: 'active',
    latencyMs: 12,
    latencyHistory: [11, 13, 10, 12, 14, 11, 12, 13, 12, 11, 10, 12, 13, 12, 15, 12, 11, 10, 12, 14],
    messagesPerMin: 234,
    taskCount: 456,
    successRate: 97.3,
    tokenUsage: 23450,
    costToday: 5.67,
    connectedTo: ['agent-orch-001', 'agent-tool-001', 'agent-rag-001', 'agent-reviewer-001'],
    position: { x: 180, y: 200 },
    uptime: '99.92%',
    role: 'Research specialist that gathers, analyzes, and synthesizes information from multiple sources. Uses web search and knowledge base tools to build comprehensive research reports.',
    memoryConfig: { type: 'buffer', maxTokens: 16384 },
    tools: [
      { name: 'web_search', description: 'Search the web for relevant information', parameters: { query: 'string', max_results: 'number' } },
      { name: 'summarize', description: 'Summarize a long document', parameters: { text: 'string', max_length: 'number' } },
    ],
    retryPolicy: { maxRetries: 2, backoffMs: 2000, timeoutMs: 60000 },
  },
  {
    id: 'agent-writer-001',
    name: 'Writer Agent',
    type: 'worker',
    model: 'claude-3.5-sonnet',
    status: 'active',
    latencyMs: 156,
    latencyHistory: [145, 160, 152, 148, 155, 163, 158, 150, 146, 155, 161, 157, 149, 153, 160, 156, 148, 152, 158, 156],
    messagesPerMin: 89,
    taskCount: 312,
    successRate: 98.7,
    tokenUsage: 67890,
    costToday: 8.92,
    connectedTo: ['agent-orch-001', 'agent-reviewer-001', 'agent-output-001'],
    position: { x: 400, y: 200 },
    uptime: '99.95%',
    role: 'Content creation specialist. Generates reports, emails, summaries, and documentation from research findings. Optimizes for clarity, tone, and audience appropriateness.',
    memoryConfig: { type: 'buffer', maxTokens: 32768 },
    tools: [
      { name: 'generate_text', description: 'Generate structured text content', parameters: { prompt: 'string', format: 'markdown|html|plain', tone: 'string' } },
      { name: 'check_grammar', description: 'Check text for grammar and style issues', parameters: { text: 'string' } },
    ],
    retryPolicy: { maxRetries: 2, backoffMs: 3000, timeoutMs: 120000 },
  },
  {
    id: 'agent-tool-001',
    name: 'Tool Executor',
    type: 'tool',
    model: 'gpt-4o-mini',
    status: 'healthy',
    latencyMs: 8,
    latencyHistory: [7, 9, 8, 6, 8, 10, 7, 8, 9, 8, 7, 8, 6, 8, 9, 8, 7, 8, 10, 8],
    messagesPerMin: 412,
    taskCount: 2340,
    successRate: 99.2,
    tokenUsage: 12340,
    costToday: 1.23,
    connectedTo: ['agent-orch-001', 'agent-research-001', 'agent-router-001'],
    position: { x: 620, y: 200 },
    uptime: '99.99%',
    role: 'Executes external API calls, database queries, and tool operations. Handles web searches, file operations, and third-party integrations with built-in rate limiting.',
    memoryConfig: { type: 'buffer', maxTokens: 4096 },
    tools: [
      { name: 'http_request', description: 'Make an HTTP request to an API', parameters: { url: 'string', method: 'GET|POST|PUT|DELETE', body: 'string' } },
      { name: 'db_query', description: 'Execute a database query', parameters: { query: 'string', database: 'string' } },
      { name: 'file_read', description: 'Read a file from storage', parameters: { path: 'string' } },
    ],
    retryPolicy: { maxRetries: 5, backoffMs: 500, timeoutMs: 15000 },
  },
  {
    id: 'agent-rag-001',
    name: 'Knowledge Agent',
    type: 'rag',
    model: 'text-embedding-3-large',
    status: 'healthy',
    latencyMs: 23,
    latencyHistory: [22, 24, 21, 23, 25, 22, 23, 24, 23, 22, 21, 23, 24, 23, 22, 23, 24, 23, 22, 23],
    messagesPerMin: 167,
    taskCount: 890,
    successRate: 99.5,
    tokenUsage: 34560,
    costToday: 2.45,
    connectedTo: ['agent-research-001', 'agent-reviewer-001'],
    position: { x: 120, y: 360 },
    uptime: '99.97%',
    role: 'Knowledge retrieval agent using vector search over indexed documents. Provides contextual information from company knowledge base, documentation, and historical data.',
    memoryConfig: { type: 'vector', maxTokens: 8192 },
    tools: [
      { name: 'vector_search', description: 'Search the vector knowledge base', parameters: { query: 'string', top_k: 'number', threshold: 'number' } },
      { name: 'index_document', description: 'Index a new document into the knowledge base', parameters: { content: 'string', metadata: 'string' } },
    ],
    retryPolicy: { maxRetries: 3, backoffMs: 1000, timeoutMs: 20000 },
  },
  {
    id: 'agent-reviewer-001',
    name: 'Reviewer Agent',
    type: 'worker',
    model: 'gpt-4o',
    status: 'idle',
    latencyMs: 15,
    latencyHistory: [14, 16, 13, 15, 17, 14, 15, 16, 15, 14, 13, 15, 16, 15, 14, 15, 16, 15, 14, 15],
    messagesPerMin: 56,
    taskCount: 678,
    successRate: 99.1,
    tokenUsage: 18920,
    costToday: 4.56,
    connectedTo: ['agent-orch-001', 'agent-writer-001', 'agent-research-001', 'agent-rag-001', 'agent-output-001'],
    position: { x: 400, y: 360 },
    uptime: '99.94%',
    role: 'Quality assurance reviewer that validates agent outputs for accuracy, completeness, and adherence to guidelines. Can escalate to human review when confidence is low.',
    memoryConfig: { type: 'summary', maxTokens: 16384 },
    tools: [
      { name: 'evaluate_quality', description: 'Score content quality on multiple dimensions', parameters: { content: 'string', criteria: 'string' } },
      { name: 'fact_check', description: 'Verify factual claims against sources', parameters: { claims: 'string', sources: 'string' } },
    ],
    retryPolicy: { maxRetries: 2, backoffMs: 2000, timeoutMs: 45000 },
  },
  {
    id: 'agent-router-001',
    name: 'Router Agent',
    type: 'router',
    model: 'gpt-4o-mini',
    status: 'healthy',
    latencyMs: 5,
    latencyHistory: [4, 6, 5, 4, 5, 7, 5, 4, 6, 5, 4, 5, 6, 5, 4, 5, 6, 5, 4, 5],
    messagesPerMin: 523,
    taskCount: 3456,
    successRate: 99.9,
    tokenUsage: 8900,
    costToday: 0.89,
    connectedTo: ['agent-orch-001', 'agent-tool-001', 'agent-output-001'],
    position: { x: 620, y: 360 },
    uptime: '99.99%',
    role: 'Intelligent message router that classifies incoming requests and directs them to the appropriate agent or workflow based on content analysis and current system load.',
    memoryConfig: { type: 'buffer', maxTokens: 2048 },
    tools: [
      { name: 'classify', description: 'Classify a message by intent and topic', parameters: { message: 'string', categories: 'string' } },
      { name: 'route', description: 'Route a message to the best available agent', parameters: { message_id: 'string', target_pool: 'string' } },
    ],
    retryPolicy: { maxRetries: 1, backoffMs: 500, timeoutMs: 5000 },
  },
  {
    id: 'agent-output-001',
    name: 'Output Agent',
    type: 'human',
    model: 'claude-3.5-sonnet',
    status: 'healthy',
    latencyMs: 45,
    latencyHistory: [42, 48, 44, 43, 46, 50, 45, 43, 47, 45, 42, 44, 46, 45, 43, 45, 47, 44, 43, 45],
    messagesPerMin: 34,
    taskCount: 234,
    successRate: 99.6,
    tokenUsage: 15670,
    costToday: 3.78,
    connectedTo: ['agent-writer-001', 'agent-reviewer-001', 'agent-router-001'],
    position: { x: 400, y: 480 },
    uptime: '99.96%',
    role: 'Final output formatting and delivery agent. Prepares results for human consumption, handles response formatting, and manages the human-in-the-loop approval workflow.',
    memoryConfig: { type: 'summary', maxTokens: 8192 },
    tools: [
      { name: 'format_output', description: 'Format agent output for end user', parameters: { content: 'string', format: 'email|report|chat|api' } },
      { name: 'request_approval', description: 'Send output for human approval', parameters: { content: 'string', reviewer_id: 'string' } },
    ],
    retryPolicy: { maxRetries: 2, backoffMs: 1000, timeoutMs: 30000 },
  },
] as const

// ============================================================
// Messages (25+ entries) — Full task lifecycle
// ============================================================

export const messageStream: readonly Message[] = [
  {
    id: 'msg-001',
    timestamp: '10:23:45.234',
    from: 'agent-orch-001',
    to: 'agent-research-001',
    type: 'TASK_ASSIGN',
    content: 'Research competitor pricing for Q1 2026',
    metadata: { priority: 'HIGH', timeout: 30 },
  },
  {
    id: 'msg-002',
    timestamp: '10:23:45.246',
    from: 'agent-research-001',
    to: 'agent-tool-001',
    type: 'TOOL_REQUEST',
    content: 'web_search("competitor pricing SaaS Q1 2026")',
    metadata: { timeout: 15 },
  },
  {
    id: 'msg-003',
    timestamp: '10:23:46.891',
    from: 'agent-tool-001',
    to: 'agent-research-001',
    type: 'TOOL_RESULT',
    content: '12 results found (1.645s)',
    metadata: { tokens: 2340, duration: 1.645, resultCount: 12 },
  },
  {
    id: 'msg-004',
    timestamp: '10:23:47.102',
    from: 'agent-research-001',
    to: 'agent-rag-001',
    type: 'TOOL_REQUEST',
    content: 'vector_search("internal pricing benchmarks 2025-2026")',
    metadata: { timeout: 10 },
  },
  {
    id: 'msg-005',
    timestamp: '10:23:47.534',
    from: 'agent-rag-001',
    to: 'agent-research-001',
    type: 'TOOL_RESULT',
    content: '8 relevant documents retrieved (0.432s)',
    metadata: { tokens: 1890, duration: 0.432, resultCount: 8 },
  },
  {
    id: 'msg-006',
    timestamp: '10:23:48.567',
    from: 'agent-research-001',
    to: 'agent-orch-001',
    type: 'TASK_COMPLETE',
    content: 'Analysis ready (3.333s total)',
    metadata: { confidence: 0.92, sources: 12, tokens: 4560, duration: 3.333 },
  },
  {
    id: 'msg-007',
    timestamp: '10:23:48.570',
    from: 'agent-orch-001',
    to: 'agent-writer-001',
    type: 'TASK_ASSIGN',
    content: 'Write executive summary from research findings',
    metadata: { priority: 'MEDIUM', timeout: 60 },
  },
  {
    id: 'msg-008',
    timestamp: '10:23:52.123',
    from: 'agent-writer-001',
    to: 'agent-reviewer-001',
    type: 'TASK_ASSIGN',
    content: 'Review executive summary for accuracy and tone',
    metadata: { priority: 'MEDIUM', timeout: 30 },
  },
  {
    id: 'msg-009',
    timestamp: '10:23:54.890',
    from: 'agent-reviewer-001',
    to: 'agent-writer-001',
    type: 'TASK_COMPLETE',
    content: 'Review passed with minor suggestions',
    metadata: { confidence: 0.95, duration: 2.767 },
  },
  {
    id: 'msg-010',
    timestamp: '10:23:55.012',
    from: 'agent-writer-001',
    to: 'agent-orch-001',
    type: 'TASK_COMPLETE',
    content: 'Executive summary generated (6.442s)',
    metadata: { tokens: 8920, duration: 6.442 },
  },
  {
    id: 'msg-011',
    timestamp: '10:23:55.034',
    from: 'agent-orch-001',
    to: 'agent-output-001',
    type: 'TASK_ASSIGN',
    content: 'Format and deliver executive summary to user',
    metadata: { priority: 'LOW', timeout: 15 },
  },
  {
    id: 'msg-012',
    timestamp: '10:23:56.789',
    from: 'agent-output-001',
    to: 'agent-orch-001',
    type: 'TASK_COMPLETE',
    content: 'Output delivered to user endpoint',
    metadata: { duration: 1.755, tokens: 1230 },
  },
  {
    id: 'msg-013',
    timestamp: '10:24:01.345',
    from: 'agent-router-001',
    to: 'agent-orch-001',
    type: 'TASK_ASSIGN',
    content: 'Incoming request: customer email draft for Acme Corp',
    metadata: { priority: 'HIGH' },
  },
  {
    id: 'msg-014',
    timestamp: '10:24:01.356',
    from: 'agent-orch-001',
    to: 'agent-writer-001',
    type: 'TASK_ASSIGN',
    content: 'Draft customer email re: Q1 pricing update for Acme Corp',
    metadata: { priority: 'HIGH', timeout: 45 },
  },
  {
    id: 'msg-015',
    timestamp: '10:24:03.456',
    from: 'agent-tool-001',
    to: 'agent-orch-001',
    type: 'ERROR',
    content: 'API rate limit exceeded on external pricing endpoint',
    metadata: { duration: 2.100 },
  },
  {
    id: 'msg-016',
    timestamp: '10:24:03.678',
    from: 'agent-orch-001',
    to: 'agent-tool-001',
    type: 'TASK_ASSIGN',
    content: 'Retry with exponential backoff (attempt 2/5)',
    metadata: { priority: 'MEDIUM', timeout: 15 },
  },
  {
    id: 'msg-017',
    timestamp: '10:24:05.234',
    from: 'agent-tool-001',
    to: 'agent-orch-001',
    type: 'TOOL_RESULT',
    content: 'Retry successful. Data retrieved.',
    metadata: { tokens: 890, duration: 1.556 },
  },
  {
    id: 'msg-018',
    timestamp: '10:24:08.567',
    from: 'agent-writer-001',
    to: 'agent-reviewer-001',
    type: 'TASK_ASSIGN',
    content: 'Review customer email draft before sending',
    metadata: { priority: 'HIGH', timeout: 20 },
  },
  {
    id: 'msg-019',
    timestamp: '10:24:10.890',
    from: 'agent-reviewer-001',
    to: 'agent-output-001',
    type: 'HUMAN_REVIEW',
    content: 'Customer email requires human approval (pricing commitment detected)',
    metadata: { confidence: 0.78 },
  },
  {
    id: 'msg-020',
    timestamp: '10:24:12.123',
    from: 'agent-orch-001',
    to: 'agent-research-001',
    type: 'TASK_ASSIGN',
    content: 'Validate data integrity for batch lead scoring',
    metadata: { priority: 'LOW', timeout: 120 },
  },
  {
    id: 'msg-021',
    timestamp: '10:24:14.456',
    from: 'agent-research-001',
    to: 'agent-tool-001',
    type: 'TOOL_REQUEST',
    content: 'db_query("SELECT COUNT(*) FROM leads WHERE score IS NULL")',
    metadata: { timeout: 10 },
  },
  {
    id: 'msg-022',
    timestamp: '10:24:14.789',
    from: 'agent-tool-001',
    to: 'agent-research-001',
    type: 'TOOL_RESULT',
    content: 'Query complete: 47 leads with null scores',
    metadata: { tokens: 340, duration: 0.333, resultCount: 47 },
  },
  {
    id: 'msg-023',
    timestamp: '10:24:16.234',
    from: 'agent-router-001',
    to: 'agent-tool-001',
    type: 'TOOL_REQUEST',
    content: 'http_request("GET", "https://api.internal/health")',
    metadata: { timeout: 5 },
  },
  {
    id: 'msg-024',
    timestamp: '10:24:16.567',
    from: 'agent-tool-001',
    to: 'agent-router-001',
    type: 'TOOL_RESULT',
    content: 'Health check OK (200, 0.089s)',
    metadata: { duration: 0.089 },
  },
  {
    id: 'msg-025',
    timestamp: '10:24:18.890',
    from: 'agent-research-001',
    to: 'agent-orch-001',
    type: 'TASK_COMPLETE',
    content: 'Data validation complete. 47 leads need rescoring.',
    metadata: { confidence: 0.99, duration: 6.434, tokens: 2100 },
  },
  {
    id: 'msg-026',
    timestamp: '10:24:20.123',
    from: 'agent-orch-001',
    to: 'agent-router-001',
    type: 'TASK_ASSIGN',
    content: 'Route lead rescoring batch to available worker',
    metadata: { priority: 'LOW', timeout: 60 },
  },
  {
    id: 'msg-027',
    timestamp: '10:24:22.456',
    from: 'agent-rag-001',
    to: 'agent-research-001',
    type: 'ERROR',
    content: 'Vector index stale: last refresh 4h ago. Results may be outdated.',
    metadata: {},
  },
  {
    id: 'msg-028',
    timestamp: '10:24:24.789',
    from: 'agent-output-001',
    to: 'agent-orch-001',
    type: 'TASK_COMPLETE',
    content: 'Human approved customer email. Sent to Acme Corp.',
    metadata: { duration: 14.233, tokens: 560 },
  },
] as const

// ============================================================
// Tasks (8 total — 3 active, 5 completed)
// ============================================================

export const activeTasks: readonly SwarmTask[] = [
  {
    id: 'task-001',
    name: 'Competitor Analysis',
    status: 'active',
    agents: ['agent-research-001', 'agent-writer-001'],
    progress: 67,
    duration: 3.3,
    startedAt: '10:23:45',
  },
  {
    id: 'task-002',
    name: 'Customer Email Draft',
    status: 'active',
    agents: ['agent-writer-001'],
    progress: 15,
    duration: 1.2,
    startedAt: '10:24:01',
  },
  {
    id: 'task-003',
    name: 'Data Validation',
    status: 'active',
    agents: ['agent-tool-001', 'agent-reviewer-001'],
    progress: 89,
    duration: 5.7,
    startedAt: '10:24:12',
  },
  {
    id: 'task-004',
    name: 'API Status Check',
    status: 'completed',
    agents: ['agent-tool-001'],
    progress: 100,
    duration: 0.8,
    startedAt: '10:22:30',
  },
  {
    id: 'task-005',
    name: 'Lead Scoring Batch',
    status: 'completed',
    agents: ['agent-research-001', 'agent-tool-001'],
    progress: 100,
    duration: 12.3,
    startedAt: '10:21:15',
  },
  {
    id: 'task-006',
    name: 'Report Generation',
    status: 'completed',
    agents: ['agent-writer-001', 'agent-reviewer-001'],
    progress: 100,
    duration: 8.9,
    startedAt: '10:20:45',
  },
  {
    id: 'task-007',
    name: 'Sentiment Analysis',
    status: 'completed',
    agents: ['agent-research-001', 'agent-rag-001'],
    progress: 100,
    duration: 2.1,
    startedAt: '10:22:10',
  },
  {
    id: 'task-008',
    name: 'Invoice Processing',
    status: 'completed',
    agents: ['agent-tool-001', 'agent-output-001'],
    progress: 100,
    duration: 4.5,
    startedAt: '10:21:50',
  },
] as const

// ============================================================
// Workflows (4 total)
// ============================================================

export const workflows: readonly Workflow[] = [
  {
    id: 'wf-001',
    name: 'Customer Support Pipeline',
    pattern: 'sequential',
    agentCount: 4,
    status: 'active',
    description: 'Handles incoming customer support queries through classification, research, drafting, and delivery stages.',
    agents: [
      { id: 'wf1-router', agentId: 'agent-router-001', role: 'Classifier', model: 'gpt-4o-mini', position: { x: 100, y: 200 } },
      { id: 'wf1-research', agentId: 'agent-research-001', role: 'Researcher', model: 'gpt-4o', position: { x: 300, y: 200 } },
      { id: 'wf1-writer', agentId: 'agent-writer-001', role: 'Drafter', model: 'claude-3.5-sonnet', position: { x: 500, y: 200 } },
      { id: 'wf1-output', agentId: 'agent-output-001', role: 'Delivery', model: 'claude-3.5-sonnet', position: { x: 700, y: 200 } },
    ],
    edges: [
      { from: 'wf1-router', to: 'wf1-research' },
      { from: 'wf1-research', to: 'wf1-writer' },
      { from: 'wf1-writer', to: 'wf1-output' },
    ],
    runs: [
      { id: 'run-wf1-01', timestamp: '2026-02-16T09:15:00Z', duration: 4.2, status: 'success', pathTaken: ['wf1-router', 'wf1-research', 'wf1-writer', 'wf1-output'], tokensUsed: 8900, cost: 0.12 },
      { id: 'run-wf1-02', timestamp: '2026-02-16T09:32:00Z', duration: 3.8, status: 'success', pathTaken: ['wf1-router', 'wf1-research', 'wf1-writer', 'wf1-output'], tokensUsed: 7200, cost: 0.09 },
      { id: 'run-wf1-03', timestamp: '2026-02-16T09:48:00Z', duration: 12.5, status: 'timeout', pathTaken: ['wf1-router', 'wf1-research'], tokensUsed: 3400, cost: 0.05 },
      { id: 'run-wf1-04', timestamp: '2026-02-16T10:05:00Z', duration: 5.1, status: 'success', pathTaken: ['wf1-router', 'wf1-research', 'wf1-writer', 'wf1-output'], tokensUsed: 9100, cost: 0.13 },
      { id: 'run-wf1-05', timestamp: '2026-02-16T10:22:00Z', duration: 4.6, status: 'success', pathTaken: ['wf1-router', 'wf1-research', 'wf1-writer', 'wf1-output'], tokensUsed: 8500, cost: 0.11 },
    ],
    yaml: `name: customer_support_pipeline
orchestrator: agent-orch-001
pattern: sequential
agents:
  - id: classifier
    model: gpt-4o-mini
    role: Classify incoming query
    output_to: researcher
  - id: researcher
    model: gpt-4o
    tools: [web_search, kb_search]
    output_to: drafter
  - id: drafter
    model: claude-3.5-sonnet
    role: Draft customer response
    output_to: delivery
  - id: delivery
    model: claude-3.5-sonnet
    role: Format and send response`,
  },
  {
    id: 'wf-002',
    name: 'Content Creation Swarm',
    pattern: 'hierarchical',
    agentCount: 6,
    status: 'active',
    description: 'Hierarchical content creation workflow with an orchestrator delegating to research, writing, and review agents.',
    agents: [
      { id: 'wf2-orch', agentId: 'agent-orch-001', role: 'Coordinator', model: 'gpt-4o', position: { x: 400, y: 80 } },
      { id: 'wf2-research', agentId: 'agent-research-001', role: 'Researcher', model: 'gpt-4o', position: { x: 200, y: 220 } },
      { id: 'wf2-rag', agentId: 'agent-rag-001', role: 'Knowledge Base', model: 'text-embedding-3-large', position: { x: 100, y: 360 } },
      { id: 'wf2-writer', agentId: 'agent-writer-001', role: 'Writer', model: 'claude-3.5-sonnet', position: { x: 400, y: 220 } },
      { id: 'wf2-reviewer', agentId: 'agent-reviewer-001', role: 'Reviewer', model: 'gpt-4o', position: { x: 600, y: 220 } },
      { id: 'wf2-output', agentId: 'agent-output-001', role: 'Publisher', model: 'claude-3.5-sonnet', position: { x: 400, y: 360 } },
    ],
    edges: [
      { from: 'wf2-orch', to: 'wf2-research' },
      { from: 'wf2-orch', to: 'wf2-writer' },
      { from: 'wf2-orch', to: 'wf2-reviewer' },
      { from: 'wf2-research', to: 'wf2-rag' },
      { from: 'wf2-research', to: 'wf2-writer', condition: 'research_complete' },
      { from: 'wf2-writer', to: 'wf2-reviewer', condition: 'draft_ready' },
      { from: 'wf2-reviewer', to: 'wf2-output', condition: 'approved' },
      { from: 'wf2-reviewer', to: 'wf2-writer', condition: 'needs_revision' },
    ],
    runs: [
      { id: 'run-wf2-01', timestamp: '2026-02-16T08:00:00Z', duration: 18.5, status: 'success', pathTaken: ['wf2-orch', 'wf2-research', 'wf2-rag', 'wf2-writer', 'wf2-reviewer', 'wf2-output'], tokensUsed: 24500, cost: 0.45 },
      { id: 'run-wf2-02', timestamp: '2026-02-16T08:45:00Z', duration: 22.3, status: 'success', pathTaken: ['wf2-orch', 'wf2-research', 'wf2-rag', 'wf2-writer', 'wf2-reviewer', 'wf2-writer', 'wf2-reviewer', 'wf2-output'], tokensUsed: 31200, cost: 0.58 },
      { id: 'run-wf2-03', timestamp: '2026-02-16T09:30:00Z', duration: 15.7, status: 'success', pathTaken: ['wf2-orch', 'wf2-research', 'wf2-writer', 'wf2-reviewer', 'wf2-output'], tokensUsed: 19800, cost: 0.36 },
      { id: 'run-wf2-04', timestamp: '2026-02-16T10:00:00Z', duration: 8.2, status: 'failed', pathTaken: ['wf2-orch', 'wf2-research'], tokensUsed: 5600, cost: 0.08 },
      { id: 'run-wf2-05', timestamp: '2026-02-16T10:15:00Z', duration: 20.1, status: 'success', pathTaken: ['wf2-orch', 'wf2-research', 'wf2-rag', 'wf2-writer', 'wf2-reviewer', 'wf2-output'], tokensUsed: 26100, cost: 0.48 },
    ],
    yaml: `name: content_creation_swarm
orchestrator: agent-orch-001
pattern: hierarchical
agents:
  - id: coordinator
    model: gpt-4o
    role: Coordinate content creation pipeline
    delegates_to: [researcher, writer, reviewer]
  - id: researcher
    model: gpt-4o
    tools: [web_search, vector_search]
    output_to: writer
  - id: knowledge_base
    model: text-embedding-3-large
    role: Provide relevant context from docs
  - id: writer
    model: claude-3.5-sonnet
    role: Create content from research
    output_to: reviewer
  - id: reviewer
    model: gpt-4o
    role: Quality review
    routes:
      approved: publisher
      needs_revision: writer
  - id: publisher
    model: claude-3.5-sonnet
    role: Format and publish`,
  },
  {
    id: 'wf-003',
    name: 'Data Processing DAG',
    pattern: 'dag',
    agentCount: 8,
    status: 'draft',
    description: 'Complex data processing pipeline with parallel extraction, transformation, and loading stages. Supports conditional branching.',
    agents: [
      { id: 'wf3-input', agentId: 'agent-router-001', role: 'Input Parser', model: 'gpt-4o-mini', position: { x: 400, y: 60 } },
      { id: 'wf3-extract-a', agentId: 'agent-tool-001', role: 'Extractor A', model: 'gpt-4o-mini', position: { x: 200, y: 180 } },
      { id: 'wf3-extract-b', agentId: 'agent-tool-001', role: 'Extractor B', model: 'gpt-4o-mini', position: { x: 600, y: 180 } },
      { id: 'wf3-transform', agentId: 'agent-research-001', role: 'Transformer', model: 'gpt-4o', position: { x: 200, y: 300 } },
      { id: 'wf3-validate', agentId: 'agent-reviewer-001', role: 'Validator', model: 'gpt-4o', position: { x: 600, y: 300 } },
      { id: 'wf3-merge', agentId: 'agent-orch-001', role: 'Merger', model: 'gpt-4o', position: { x: 400, y: 300 } },
      { id: 'wf3-load', agentId: 'agent-tool-001', role: 'Loader', model: 'gpt-4o-mini', position: { x: 400, y: 420 } },
      { id: 'wf3-notify', agentId: 'agent-output-001', role: 'Notifier', model: 'claude-3.5-sonnet', position: { x: 400, y: 540 } },
    ],
    edges: [
      { from: 'wf3-input', to: 'wf3-extract-a' },
      { from: 'wf3-input', to: 'wf3-extract-b' },
      { from: 'wf3-extract-a', to: 'wf3-transform' },
      { from: 'wf3-extract-b', to: 'wf3-validate' },
      { from: 'wf3-transform', to: 'wf3-merge' },
      { from: 'wf3-validate', to: 'wf3-merge', condition: 'validation_passed' },
      { from: 'wf3-merge', to: 'wf3-load' },
      { from: 'wf3-load', to: 'wf3-notify' },
    ],
    runs: [
      { id: 'run-wf3-01', timestamp: '2026-02-15T22:00:00Z', duration: 45.2, status: 'success', pathTaken: ['wf3-input', 'wf3-extract-a', 'wf3-extract-b', 'wf3-transform', 'wf3-validate', 'wf3-merge', 'wf3-load', 'wf3-notify'], tokensUsed: 42000, cost: 0.78 },
      { id: 'run-wf3-02', timestamp: '2026-02-15T23:00:00Z', duration: 38.7, status: 'success', pathTaken: ['wf3-input', 'wf3-extract-a', 'wf3-extract-b', 'wf3-transform', 'wf3-validate', 'wf3-merge', 'wf3-load', 'wf3-notify'], tokensUsed: 38900, cost: 0.72 },
      { id: 'run-wf3-03', timestamp: '2026-02-16T00:00:00Z', duration: 62.1, status: 'timeout', pathTaken: ['wf3-input', 'wf3-extract-a', 'wf3-extract-b', 'wf3-transform'], tokensUsed: 18500, cost: 0.34 },
      { id: 'run-wf3-04', timestamp: '2026-02-16T01:00:00Z', duration: 41.3, status: 'success', pathTaken: ['wf3-input', 'wf3-extract-a', 'wf3-extract-b', 'wf3-transform', 'wf3-validate', 'wf3-merge', 'wf3-load', 'wf3-notify'], tokensUsed: 40100, cost: 0.74 },
      { id: 'run-wf3-05', timestamp: '2026-02-16T02:00:00Z', duration: 39.8, status: 'success', pathTaken: ['wf3-input', 'wf3-extract-a', 'wf3-extract-b', 'wf3-transform', 'wf3-validate', 'wf3-merge', 'wf3-load', 'wf3-notify'], tokensUsed: 39500, cost: 0.73 },
    ],
    yaml: `name: data_processing_dag
orchestrator: agent-orch-001
pattern: dag
agents:
  - id: input_parser
    model: gpt-4o-mini
    role: Parse and validate input data
    output_to: [extractor_a, extractor_b]
  - id: extractor_a
    model: gpt-4o-mini
    role: Extract structured data (source A)
    output_to: transformer
  - id: extractor_b
    model: gpt-4o-mini
    role: Extract structured data (source B)
    output_to: validator
  - id: transformer
    model: gpt-4o
    role: Transform and normalize data
    output_to: merger
  - id: validator
    model: gpt-4o
    role: Validate data integrity
    routes:
      passed: merger
      failed: input_parser
  - id: merger
    model: gpt-4o
    role: Merge transformed data streams
    output_to: loader
  - id: loader
    model: gpt-4o-mini
    role: Load data into target systems
    output_to: notifier
  - id: notifier
    model: claude-3.5-sonnet
    role: Send completion notifications`,
  },
  {
    id: 'wf-004',
    name: 'Code Review Team',
    pattern: 'peer-to-peer',
    agentCount: 3,
    status: 'active',
    description: 'Peer-to-peer code review workflow where agents collaboratively analyze, review, and improve code submissions.',
    agents: [
      { id: 'wf4-analyzer', agentId: 'agent-research-001', role: 'Code Analyzer', model: 'gpt-4o', position: { x: 250, y: 150 } },
      { id: 'wf4-reviewer', agentId: 'agent-reviewer-001', role: 'Code Reviewer', model: 'gpt-4o', position: { x: 550, y: 150 } },
      { id: 'wf4-fixer', agentId: 'agent-writer-001', role: 'Code Fixer', model: 'claude-3.5-sonnet', position: { x: 400, y: 320 } },
    ],
    edges: [
      { from: 'wf4-analyzer', to: 'wf4-reviewer', condition: 'analysis_complete' },
      { from: 'wf4-reviewer', to: 'wf4-fixer', condition: 'issues_found' },
      { from: 'wf4-fixer', to: 'wf4-analyzer', condition: 'fix_applied' },
      { from: 'wf4-reviewer', to: 'wf4-analyzer', condition: 'review_complete' },
      { from: 'wf4-analyzer', to: 'wf4-fixer' },
    ],
    runs: [
      { id: 'run-wf4-01', timestamp: '2026-02-16T08:30:00Z', duration: 12.4, status: 'success', pathTaken: ['wf4-analyzer', 'wf4-reviewer', 'wf4-fixer', 'wf4-analyzer'], tokensUsed: 15600, cost: 0.28 },
      { id: 'run-wf4-02', timestamp: '2026-02-16T09:00:00Z', duration: 8.9, status: 'success', pathTaken: ['wf4-analyzer', 'wf4-reviewer'], tokensUsed: 9800, cost: 0.18 },
      { id: 'run-wf4-03', timestamp: '2026-02-16T09:15:00Z', duration: 15.2, status: 'success', pathTaken: ['wf4-analyzer', 'wf4-reviewer', 'wf4-fixer', 'wf4-analyzer', 'wf4-reviewer'], tokensUsed: 21300, cost: 0.39 },
      { id: 'run-wf4-04', timestamp: '2026-02-16T09:45:00Z', duration: 6.8, status: 'failed', pathTaken: ['wf4-analyzer'], tokensUsed: 4200, cost: 0.06 },
      { id: 'run-wf4-05', timestamp: '2026-02-16T10:10:00Z', duration: 11.1, status: 'success', pathTaken: ['wf4-analyzer', 'wf4-reviewer', 'wf4-fixer'], tokensUsed: 13700, cost: 0.25 },
    ],
    yaml: `name: code_review_team
orchestrator: agent-orch-001
pattern: peer-to-peer
agents:
  - id: analyzer
    model: gpt-4o
    role: Analyze code structure and patterns
    communicates_with: [reviewer, fixer]
  - id: reviewer
    model: gpt-4o
    role: Review code for bugs and style
    communicates_with: [analyzer, fixer]
  - id: fixer
    model: claude-3.5-sonnet
    role: Apply fixes and improvements
    communicates_with: [analyzer, reviewer]`,
  },
] as const

// ============================================================
// System Metrics
// ============================================================

export const systemMetrics: SystemMetrics = {
  totalAgents: 8,
  healthyAgents: 5,
  degradedAgents: 0,
  failedAgents: 0,
  startingAgents: 0,
  messagesPerMin: 1247,
  avgLatencyMs: 34,
  errorRate: 0.02,
  tokenBudgetUsed: 78,
  totalTokens: 234567,
  totalCost: 39.84,
}

// ============================================================
// Dashboard Stats
// ============================================================

export const dashboardStats: DashboardStats = {
  totalMessagesToday: 234567,
  totalMessagesChange: 12,
  avgEndToEndLatency: 2.3,
  latencyChange: -0.4,
  dailyCost: 47.23,
  costChange: 3.12,
  activeWorkflows: 4,
  failedTasks24h: 12,
  failedTasksRate: 0.005,
}

// ============================================================
// Alert Rules (5)
// ============================================================

export const alertRules: readonly AlertRule[] = [
  { id: 'alert-001', name: 'High Latency', condition: 'avg_latency_ms > threshold', threshold: 5000, enabled: true },
  { id: 'alert-002', name: 'Error Rate Spike', condition: 'error_rate > threshold', threshold: 1.0, enabled: true },
  { id: 'alert-003', name: 'Token Budget Exceeded', condition: 'token_budget_used > threshold', threshold: 90, enabled: true },
  { id: 'alert-004', name: 'Agent Down', condition: 'agent_status == failed', threshold: 0, enabled: true },
  { id: 'alert-005', name: 'Cost Overrun', condition: 'daily_cost > threshold', threshold: 100, enabled: false },
] as const

// ============================================================
// API Keys (3)
// ============================================================

export const apiKeys: readonly ApiKey[] = [
  { id: 'key-001', name: 'Production API Key', key: 'sk-prod-...x8f2', createdAt: '2026-01-15', lastUsed: '2026-02-16' },
  { id: 'key-002', name: 'Development Key', key: 'sk-dev-...a3b2', createdAt: '2026-02-01', lastUsed: '2026-02-15' },
  { id: 'key-003', name: 'CI/CD Pipeline', key: 'sk-ci-...k9m1', createdAt: '2026-02-10', lastUsed: '2026-02-16' },
] as const

// ============================================================
// Agent Logs (30+)
// ============================================================

export const agentLogs: readonly AgentLog[] = [
  { id: 'log-001', timestamp: '2026-02-16T10:24:24.789Z', agentId: 'agent-orch-001', severity: 'INFO', message: 'Task task-001 assigned to agent-research-001' },
  { id: 'log-002', timestamp: '2026-02-16T10:24:23.456Z', agentId: 'agent-research-001', severity: 'DEBUG', message: 'Starting web search with 3 parallel queries', payload: '{"queries":["competitor pricing SaaS","Q1 2026 benchmarks","pricing trends"]}' },
  { id: 'log-003', timestamp: '2026-02-16T10:24:22.123Z', agentId: 'agent-tool-001', severity: 'INFO', message: 'HTTP request completed: GET https://api.pricing.io/v2/compare (200)' },
  { id: 'log-004', timestamp: '2026-02-16T10:24:21.890Z', agentId: 'agent-tool-001', severity: 'WARN', message: 'Rate limit approaching: 85/100 requests in current window' },
  { id: 'log-005', timestamp: '2026-02-16T10:24:20.567Z', agentId: 'agent-orch-001', severity: 'INFO', message: 'Workflow wf-001 run initiated (run-wf1-05)' },
  { id: 'log-006', timestamp: '2026-02-16T10:24:19.234Z', agentId: 'agent-writer-001', severity: 'INFO', message: 'Generating executive summary (max_tokens: 2048, temperature: 0.7)' },
  { id: 'log-007', timestamp: '2026-02-16T10:24:18.901Z', agentId: 'agent-reviewer-001', severity: 'DEBUG', message: 'Quality evaluation started', payload: '{"criteria":"accuracy,completeness,tone","threshold":0.85}' },
  { id: 'log-008', timestamp: '2026-02-16T10:24:17.678Z', agentId: 'agent-rag-001', severity: 'INFO', message: 'Vector search completed: 8 documents above threshold 0.82' },
  { id: 'log-009', timestamp: '2026-02-16T10:24:16.345Z', agentId: 'agent-router-001', severity: 'DEBUG', message: 'Message classified as type=support, confidence=0.97' },
  { id: 'log-010', timestamp: '2026-02-16T10:24:15.012Z', agentId: 'agent-output-001', severity: 'INFO', message: 'Output formatted and delivered to user endpoint' },
  { id: 'log-011', timestamp: '2026-02-16T10:24:13.789Z', agentId: 'agent-tool-001', severity: 'ERROR', message: 'API rate limit exceeded on external pricing endpoint', payload: '{"endpoint":"https://api.pricing.io/v2/compare","status":429,"retry_after":2}' },
  { id: 'log-012', timestamp: '2026-02-16T10:24:12.456Z', agentId: 'agent-orch-001', severity: 'WARN', message: 'Task task-003 approaching timeout (89% of 120s budget)' },
  { id: 'log-013', timestamp: '2026-02-16T10:24:11.123Z', agentId: 'agent-research-001', severity: 'INFO', message: 'Research synthesis complete: 12 sources analyzed' },
  { id: 'log-014', timestamp: '2026-02-16T10:24:09.890Z', agentId: 'agent-writer-001', severity: 'DEBUG', message: 'Token budget check: 1,847/2,048 tokens used (90.2%)', payload: '{"used":1847,"limit":2048,"percentage":90.2}' },
  { id: 'log-015', timestamp: '2026-02-16T10:24:08.567Z', agentId: 'agent-reviewer-001', severity: 'INFO', message: 'Review passed: accuracy=0.95, completeness=0.91, tone=0.88' },
  { id: 'log-016', timestamp: '2026-02-16T10:24:07.234Z', agentId: 'agent-rag-001', severity: 'WARN', message: 'Vector index stale: last refresh 4h ago. Results may be outdated.' },
  { id: 'log-017', timestamp: '2026-02-16T10:24:05.901Z', agentId: 'agent-router-001', severity: 'INFO', message: 'Routing decision: support query -> agent-research-001' },
  { id: 'log-018', timestamp: '2026-02-16T10:24:04.678Z', agentId: 'agent-tool-001', severity: 'INFO', message: 'Database query completed in 0.089s (47 results)' },
  { id: 'log-019', timestamp: '2026-02-16T10:24:03.345Z', agentId: 'agent-orch-001', severity: 'INFO', message: 'Agent health check: 8/8 agents responding' },
  { id: 'log-020', timestamp: '2026-02-16T10:24:02.012Z', agentId: 'agent-output-001', severity: 'INFO', message: 'Human approval received for customer email' },
  { id: 'log-021', timestamp: '2026-02-16T10:24:00.789Z', agentId: 'agent-research-001', severity: 'DEBUG', message: 'Merging results from web_search and vector_search', payload: '{"web_results":12,"vector_results":8,"merged":18}' },
  { id: 'log-022', timestamp: '2026-02-16T10:23:59.456Z', agentId: 'agent-writer-001', severity: 'INFO', message: 'Customer email draft generated (format: professional, length: 342 words)' },
  { id: 'log-023', timestamp: '2026-02-16T10:23:58.123Z', agentId: 'agent-tool-001', severity: 'DEBUG', message: 'Retry attempt 2/5 with backoff 1000ms', payload: '{"attempt":2,"max_retries":5,"backoff_ms":1000}' },
  { id: 'log-024', timestamp: '2026-02-16T10:23:56.890Z', agentId: 'agent-reviewer-001', severity: 'WARN', message: 'Low confidence score (0.78) on customer email. Escalating to human review.' },
  { id: 'log-025', timestamp: '2026-02-16T10:23:55.567Z', agentId: 'agent-orch-001', severity: 'INFO', message: 'Task task-006 completed successfully in 8.9s' },
  { id: 'log-026', timestamp: '2026-02-16T10:23:54.234Z', agentId: 'agent-rag-001', severity: 'DEBUG', message: 'Embedding generated for query (dimension: 3072)', payload: '{"dimension":3072,"model":"text-embedding-3-large"}' },
  { id: 'log-027', timestamp: '2026-02-16T10:23:52.901Z', agentId: 'agent-router-001', severity: 'INFO', message: 'Health check probe completed: all downstream agents healthy' },
  { id: 'log-028', timestamp: '2026-02-16T10:23:51.678Z', agentId: 'agent-output-001', severity: 'DEBUG', message: 'Formatting output for channel: email', payload: '{"channel":"email","template":"executive_summary"}' },
  { id: 'log-029', timestamp: '2026-02-16T10:23:50.345Z', agentId: 'agent-research-001', severity: 'ERROR', message: 'Web search timeout after 15s on query "competitor pricing SaaS Q1 2026"' },
  { id: 'log-030', timestamp: '2026-02-16T10:23:49.012Z', agentId: 'agent-orch-001', severity: 'INFO', message: 'System metrics collected: 1,247 msg/min, 34ms avg latency, 0.02% error rate' },
  { id: 'log-031', timestamp: '2026-02-16T10:23:47.789Z', agentId: 'agent-tool-001', severity: 'INFO', message: 'File read completed: /data/pricing/competitors.json (2.3KB)' },
  { id: 'log-032', timestamp: '2026-02-16T10:23:46.456Z', agentId: 'agent-writer-001', severity: 'INFO', message: 'Grammar check passed with 0 issues' },
] as const

// ============================================================
// Evaluation Results (10)
// ============================================================

export const evalResults: readonly EvalResult[] = [
  { id: 'eval-001', testName: 'Email Drafting Quality', model: 'gpt-4o', accuracy: 94.2, latencyMs: 1250, cost: 0.032, timestamp: '2026-02-16T08:00:00Z' },
  { id: 'eval-002', testName: 'Email Drafting Quality', model: 'claude-3.5-sonnet', accuracy: 96.8, latencyMs: 1580, cost: 0.028, timestamp: '2026-02-16T08:00:00Z' },
  { id: 'eval-003', testName: 'Research Synthesis', model: 'gpt-4o', accuracy: 91.5, latencyMs: 2340, cost: 0.045, timestamp: '2026-02-16T08:15:00Z' },
  { id: 'eval-004', testName: 'Research Synthesis', model: 'claude-3.5-sonnet', accuracy: 89.3, latencyMs: 2890, cost: 0.041, timestamp: '2026-02-16T08:15:00Z' },
  { id: 'eval-005', testName: 'Code Analysis', model: 'gpt-4o', accuracy: 88.7, latencyMs: 890, cost: 0.022, timestamp: '2026-02-16T08:30:00Z' },
  { id: 'eval-006', testName: 'Code Analysis', model: 'claude-3.5-sonnet', accuracy: 92.1, latencyMs: 1120, cost: 0.019, timestamp: '2026-02-16T08:30:00Z' },
  { id: 'eval-007', testName: 'Query Classification', model: 'gpt-4o-mini', accuracy: 97.3, latencyMs: 120, cost: 0.002, timestamp: '2026-02-16T08:45:00Z' },
  { id: 'eval-008', testName: 'Query Classification', model: 'gpt-4o', accuracy: 98.1, latencyMs: 340, cost: 0.008, timestamp: '2026-02-16T08:45:00Z' },
  { id: 'eval-009', testName: 'Fact Checking', model: 'gpt-4o', accuracy: 93.4, latencyMs: 1890, cost: 0.038, timestamp: '2026-02-16T09:00:00Z' },
  { id: 'eval-010', testName: 'Fact Checking', model: 'claude-3.5-sonnet', accuracy: 95.2, latencyMs: 2100, cost: 0.035, timestamp: '2026-02-16T09:00:00Z' },
] as const

// ============================================================
// Heatmap Data (8 agents x 24 hours = 192 cells)
// ============================================================

function generateHeatmapData(): readonly HeatmapCell[] {
  const agentIds = agents.map(a => a.id)
  const basePatterns: Record<string, readonly number[]> = {
    'agent-orch-001':       [15, 12, 10, 8, 7, 12, 25, 45, 72, 85, 90, 88, 82, 78, 80, 85, 92, 88, 75, 60, 45, 35, 25, 18],
    'agent-research-001':   [10, 8, 5, 3, 2, 8, 20, 40, 65, 78, 85, 82, 75, 72, 76, 82, 88, 80, 68, 52, 38, 28, 18, 12],
    'agent-writer-001':     [8, 5, 3, 2, 1, 5, 15, 35, 58, 72, 80, 78, 70, 68, 72, 78, 85, 82, 72, 55, 40, 30, 15, 10],
    'agent-tool-001':       [20, 18, 15, 12, 10, 18, 35, 55, 78, 90, 95, 92, 88, 85, 87, 92, 96, 93, 82, 68, 52, 42, 32, 22],
    'agent-rag-001':        [12, 10, 8, 5, 3, 10, 22, 42, 60, 75, 80, 78, 72, 70, 74, 78, 82, 78, 65, 50, 35, 25, 18, 14],
    'agent-reviewer-001':   [5, 3, 2, 1, 1, 3, 10, 25, 48, 65, 72, 70, 62, 58, 64, 70, 78, 72, 60, 45, 32, 22, 10, 6],
    'agent-router-001':     [22, 20, 18, 15, 12, 20, 38, 58, 80, 92, 97, 95, 90, 88, 90, 95, 98, 95, 85, 70, 55, 45, 35, 25],
    'agent-output-001':     [8, 5, 3, 2, 1, 5, 12, 30, 52, 68, 75, 72, 65, 62, 68, 72, 78, 75, 62, 48, 35, 25, 12, 8],
  }

  const cells: HeatmapCell[] = []
  for (const agentId of agentIds) {
    const pattern = basePatterns[agentId] ?? Array.from({ length: 24 }, () => 50)
    for (let hour = 0; hour < 24; hour++) {
      cells.push({
        agentId,
        hour,
        utilization: pattern[hour],
      })
    }
  }
  return cells
}

export const heatmapData: readonly HeatmapCell[] = generateHeatmapData()

// ============================================================
// Hourly Messages (24 entries)
// ============================================================

export const hourlyMessages: readonly HourlyMessageEntry[] = [
  { hour: '00:00', count: 3420 },
  { hour: '01:00', count: 2810 },
  { hour: '02:00', count: 2150 },
  { hour: '03:00', count: 1680 },
  { hour: '04:00', count: 1420 },
  { hour: '05:00', count: 2890 },
  { hour: '06:00', count: 5670 },
  { hour: '07:00', count: 9450 },
  { hour: '08:00', count: 14200 },
  { hour: '09:00', count: 18900 },
  { hour: '10:00', count: 21500 },
  { hour: '11:00', count: 20800 },
  { hour: '12:00', count: 18200 },
  { hour: '13:00', count: 17500 },
  { hour: '14:00', count: 18800 },
  { hour: '15:00', count: 20200 },
  { hour: '16:00', count: 22100 },
  { hour: '17:00', count: 19800 },
  { hour: '18:00', count: 15600 },
  { hour: '19:00', count: 11200 },
  { hour: '20:00', count: 8400 },
  { hour: '21:00', count: 6200 },
  { hour: '22:00', count: 4800 },
  { hour: '23:00', count: 3900 },
] as const

// ============================================================
// Cost by Agent (8 entries)
// ============================================================

export const costByAgent: readonly CostByAgentEntry[] = [
  { agentName: 'Orchestrator', cost: 12.34 },
  { agentName: 'Research Agent', cost: 5.67 },
  { agentName: 'Writer Agent', cost: 8.92 },
  { agentName: 'Tool Executor', cost: 1.23 },
  { agentName: 'Knowledge Agent', cost: 2.45 },
  { agentName: 'Reviewer Agent', cost: 4.56 },
  { agentName: 'Router Agent', cost: 0.89 },
  { agentName: 'Output Agent', cost: 3.78 },
] as const

// ============================================================
// Workflow Success Rate (14 days)
// ============================================================

export const workflowSuccessRate: readonly WorkflowSuccessRateEntry[] = [
  { date: 'Feb 03', rate: 96.2 },
  { date: 'Feb 04', rate: 97.1 },
  { date: 'Feb 05', rate: 95.8 },
  { date: 'Feb 06', rate: 98.3 },
  { date: 'Feb 07', rate: 97.5 },
  { date: 'Feb 08', rate: 96.9 },
  { date: 'Feb 09', rate: 94.2 },
  { date: 'Feb 10', rate: 97.8 },
  { date: 'Feb 11', rate: 98.1 },
  { date: 'Feb 12', rate: 97.4 },
  { date: 'Feb 13', rate: 96.5 },
  { date: 'Feb 14', rate: 98.7 },
  { date: 'Feb 15', rate: 97.9 },
  { date: 'Feb 16', rate: 98.2 },
] as const

// ============================================================
// Webhooks (3)
// ============================================================

export const webhooks: readonly Webhook[] = [
  {
    id: 'wh-001',
    url: 'https://hooks.slack.com/services/T00000/B00000/XXXX',
    events: ['task.failed', 'agent.down'],
    enabled: true,
    createdAt: '2026-01-20',
    lastTriggered: '2026-02-16',
    successRate: 99.2,
  },
  {
    id: 'wh-002',
    url: 'https://api.internal.swarmops.dev/webhooks/tasks',
    events: ['task.complete', 'human_review.needed'],
    enabled: true,
    createdAt: '2026-01-25',
    lastTriggered: '2026-02-16',
    successRate: 100,
  },
  {
    id: 'wh-003',
    url: 'https://billing.internal.swarmops.dev/cost-alerts',
    events: ['cost.threshold'],
    enabled: false,
    createdAt: '2026-02-05',
    lastTriggered: null,
    successRate: 0,
  },
] as const

// ============================================================
// Integrations (4)
// ============================================================

export const integrations: readonly Integration[] = [
  {
    id: 'int-001',
    name: 'LangGraph',
    type: 'langgraph',
    status: 'connected',
    version: 'v0.2.14',
    lastSync: '2026-02-16T10:15:00Z',
    agentCount: 4,
    description: 'Primary orchestration framework for stateful multi-agent workflows.',
  },
  {
    id: 'int-002',
    name: 'CrewAI',
    type: 'crewai',
    status: 'connected',
    version: 'v0.51.0',
    lastSync: '2026-02-16T09:45:00Z',
    agentCount: 3,
    description: 'Collaborative agent teams with role-based task delegation.',
  },
  {
    id: 'int-003',
    name: 'AutoGen',
    type: 'autogen',
    status: 'disconnected',
    version: 'v0.4.1',
    lastSync: '2026-02-10T14:30:00Z',
    agentCount: 0,
    description: 'Microsoft multi-agent conversation framework for complex reasoning.',
  },
  {
    id: 'int-004',
    name: 'Custom Python',
    type: 'custom_python',
    status: 'connected',
    version: 'v1.0.0',
    lastSync: '2026-02-16T10:20:00Z',
    agentCount: 1,
    description: 'Custom Python agent runtime for specialized processing tasks.',
  },
] as const

// ============================================================
// Team Members (4)
// ============================================================

export const teamMembers: readonly TeamMember[] = [
  {
    id: 'tm-001',
    name: 'Alex Chen',
    email: 'alex@swarmops.dev',
    role: 'owner',
    avatarUrl: null,
    joinedAt: '2026-01-10',
    lastActive: '2026-02-16',
  },
  {
    id: 'tm-002',
    name: 'Sarah Kim',
    email: 'sarah@swarmops.dev',
    role: 'admin',
    avatarUrl: null,
    joinedAt: '2026-01-15',
    lastActive: '2026-02-16',
  },
  {
    id: 'tm-003',
    name: 'Marcus Johnson',
    email: 'marcus@swarmops.dev',
    role: 'member',
    avatarUrl: null,
    joinedAt: '2026-02-01',
    lastActive: '2026-02-15',
  },
  {
    id: 'tm-004',
    name: 'Priya Patel',
    email: 'priya@swarmops.dev',
    role: 'viewer',
    avatarUrl: null,
    joinedAt: '2026-02-05',
    lastActive: '2026-02-14',
  },
] as const
