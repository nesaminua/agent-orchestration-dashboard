'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Agent, Message, SwarmTask, SystemMetrics, MessageType, AgentStatus } from './types'
import { agents as initialAgents, messageStream as initialMessages, activeTasks as initialTasks, systemMetrics as initialMetrics } from './mock-data'
import { generateId } from './utils'

interface SwarmState {
  readonly agents: readonly Agent[]
  readonly messages: readonly Message[]
  readonly tasks: readonly SwarmTask[]
  readonly metrics: SystemMetrics
}

const MESSAGE_TYPES: readonly MessageType[] = [
  'TASK_ASSIGN',
  'TOOL_REQUEST',
  'TOOL_RESULT',
  'TASK_COMPLETE',
  'ERROR',
  'HUMAN_REVIEW',
] as const

const AGENT_STATUSES: readonly AgentStatus[] = [
  'healthy',
  'active',
  'idle',
] as const

const MESSAGE_CONTENTS: Readonly<Record<MessageType, readonly string[]>> = {
  TASK_ASSIGN: [
    'Analyze customer feedback from Q1 survey',
    'Generate monthly performance report',
    'Process incoming support tickets batch',
    'Update knowledge base with new documentation',
    'Run sentiment analysis on social media mentions',
    'Draft response to enterprise client inquiry',
  ],
  TOOL_REQUEST: [
    'web_search("market analysis 2026")',
    'db_query("SELECT * FROM metrics WHERE date > NOW() - 1h")',
    'vector_search("customer onboarding best practices")',
    'http_request("GET", "https://api.analytics.io/v2/events")',
    'file_read("/data/reports/weekly.json")',
  ],
  TOOL_RESULT: [
    '15 results found (0.892s)',
    'Query completed: 234 rows returned (0.156s)',
    '6 relevant documents above threshold (0.334s)',
    'API response received (200 OK, 1.234s)',
    'File read complete (4.7KB)',
  ],
  TASK_COMPLETE: [
    'Analysis complete with 95% confidence',
    'Report generated successfully (12.3s)',
    'Batch processed: 47/47 tickets resolved',
    'Knowledge base updated with 8 new entries',
    'Sentiment analysis ready: 78% positive',
  ],
  ERROR: [
    'Connection timeout after 30s',
    'API rate limit exceeded (429)',
    'Invalid response format from external service',
    'Memory limit approaching: 92% utilized',
    'Authentication token expired',
  ],
  HUMAN_REVIEW: [
    'Content requires human approval (sensitivity detected)',
    'Pricing commitment detected - needs manager sign-off',
    'Escalation: low confidence score (0.62)',
    'Legal review requested for contract clause',
  ],
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getCurrentTimestamp(): string {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const ms = String(now.getMilliseconds()).padStart(3, '0')
  return `${hours}:${minutes}:${seconds}.${ms}`
}

function applyJitter(value: number, percent: number): number {
  const jitter = value * (percent / 100)
  return Math.max(0, value + randomFloat(-jitter, jitter))
}

const TASK_NAMES: readonly string[] = [
  'Customer Inquiry Processing',
  'Market Research Update',
  'Content Optimization',
  'Data Quality Audit',
  'Report Compilation',
  'API Integration Test',
  'Knowledge Sync',
  'Workflow Optimization',
] as const

export function useSwarmSimulation(): SwarmState {
  const [agents, setAgents] = useState<readonly Agent[]>(initialAgents)
  const [messages, setMessages] = useState<readonly Message[]>([...initialMessages])
  const [tasks, setTasks] = useState<readonly SwarmTask[]>([...initialTasks])
  const [metrics, setMetrics] = useState<SystemMetrics>(initialMetrics)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const generateMessages = useCallback((): readonly Message[] => {
    const count = randomInt(1, 3)
    const newMessages: Message[] = []

    for (let i = 0; i < count; i++) {
      const isError = Math.random() < 0.05
      const msgType: MessageType = isError ? 'ERROR' : pickRandom(MESSAGE_TYPES)
      const agentIds = initialAgents.map(a => a.id)
      const fromId = pickRandom(agentIds)

      const possibleTargets = agentIds.filter(id => id !== fromId)
      const toId = pickRandom(possibleTargets)

      const contentOptions = MESSAGE_CONTENTS[msgType]
      const content = pickRandom(contentOptions)

      newMessages.push({
        id: generateId(),
        timestamp: getCurrentTimestamp(),
        from: fromId,
        to: toId,
        type: msgType,
        content,
        metadata: {
          priority: pickRandom(['HIGH', 'MEDIUM', 'LOW'] as const),
          tokens: randomInt(100, 5000),
          duration: randomFloat(0.1, 5.0),
          confidence: msgType === 'TASK_COMPLETE' ? randomFloat(0.85, 0.99) : undefined,
        },
      })
    }

    return newMessages
  }, [])

  const tick = useCallback(() => {
    // 1. Generate new messages
    const newMessages = generateMessages()
    setMessages(prev => {
      const updated = [...prev, ...newMessages]
      // FIFO: limit to 100
      return updated.length > 100 ? updated.slice(updated.length - 100) : updated
    })

    // 2. Randomly change 1 agent status
    setAgents(prev => {
      const targetIndex = randomInt(0, prev.length - 1)
      return prev.map((agent, i) => {
        if (i !== targetIndex) {
          // Still update latency history for all agents
          const newLatency = Math.max(1, Math.round(applyJitter(agent.latencyMs, 15)))
          const newHistory = [...agent.latencyHistory.slice(1), newLatency]
          return {
            ...agent,
            latencyMs: newLatency,
            latencyHistory: newHistory,
            messagesPerMin: Math.max(1, Math.round(applyJitter(agent.messagesPerMin, 10))),
          }
        }

        const newStatus = pickRandom(AGENT_STATUSES)
        const newLatency = Math.max(1, Math.round(applyJitter(agent.latencyMs, 15)))
        const newHistory = [...agent.latencyHistory.slice(1), newLatency]

        return {
          ...agent,
          status: newStatus,
          latencyMs: newLatency,
          latencyHistory: newHistory,
          messagesPerMin: Math.max(1, Math.round(applyJitter(agent.messagesPerMin, 10))),
          tokenUsage: agent.tokenUsage + randomInt(50, 500),
          costToday: Math.round((agent.costToday + randomFloat(0.001, 0.05)) * 100) / 100,
        }
      })
    })

    // 3. Update task progress
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.status !== 'active') return task

        const progressIncrement = randomInt(5, 15)
        const newProgress = Math.min(100, task.progress + progressIncrement)
        const newDuration = Math.round((task.duration + randomFloat(0.5, 2.0)) * 10) / 10

        if (newProgress >= 100) {
          return {
            ...task,
            status: 'completed' as const,
            progress: 100,
            duration: newDuration,
          }
        }

        return {
          ...task,
          progress: newProgress,
          duration: newDuration,
        }
      })

      // If no active tasks left, spawn a new one from queue
      const activeCount = updated.filter(t => t.status === 'active').length
      if (activeCount < 2) {
        const newTask: SwarmTask = {
          id: `task-${Date.now()}`,
          name: pickRandom(TASK_NAMES),
          status: 'active',
          agents: [pickRandom(initialAgents.map(a => a.id)), pickRandom(initialAgents.map(a => a.id))],
          progress: randomInt(5, 20),
          duration: randomFloat(0.5, 2.0),
          startedAt: getCurrentTimestamp(),
        }
        return [...updated, newTask]
      }

      return updated
    })

    // 4. Update system metrics with jitter
    setMetrics(prev => ({
      ...prev,
      messagesPerMin: Math.max(1, Math.round(applyJitter(prev.messagesPerMin, 10))),
      avgLatencyMs: Math.max(1, Math.round(applyJitter(prev.avgLatencyMs, 10))),
      errorRate: Math.max(0, Math.round(applyJitter(prev.errorRate, 15) * 100) / 100),
      totalTokens: prev.totalTokens + randomInt(500, 3000),
      totalCost: Math.round((prev.totalCost + randomFloat(0.01, 0.1)) * 100) / 100,
      tokenBudgetUsed: Math.min(100, Math.round(applyJitter(prev.tokenBudgetUsed, 3) * 10) / 10),
    }))
  }, [generateMessages])

  useEffect(() => {
    const delay = randomInt(2000, 3000)
    intervalRef.current = setInterval(tick, delay)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [tick])

  return { agents, messages, tasks, metrics }
}
