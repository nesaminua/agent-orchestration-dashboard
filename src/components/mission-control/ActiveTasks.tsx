'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import { cn, truncateId } from '@/lib/utils'
import { getAgentTypeColor } from '@/lib/topology-layout'
import { StatusDot } from '@/components/shared/StatusDot'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Agent, SwarmTask } from '@/lib/types'

interface ActiveTasksProps {
  readonly tasks: readonly SwarmTask[]
  readonly agents: readonly Agent[]
}

const PANEL_CLASSES = 'bg-[#111827] border border-[#1e293b] rounded-xl p-4 h-full flex flex-col'
const MONO_MUTED_CLASSES = 'font-mono tabular-nums text-[#94a3b8]'
const STAGGER_DELAY_MS = 60

const TASK_SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 24,
}

interface TaskPartition {
  readonly active: readonly SwarmTask[]
  readonly completed: readonly SwarmTask[]
}

function partitionTasks(tasks: readonly SwarmTask[]): TaskPartition {
  const active: SwarmTask[] = []
  const completed: SwarmTask[] = []

  for (const task of tasks) {
    if (task.status === 'active') {
      active.push(task)
    } else if (task.status === 'completed') {
      completed.push(task)
    }
  }

  return { active, completed }
}

function buildAgentColorMap(agents: readonly Agent[]): ReadonlyMap<string, string> {
  return new Map(agents.map((agent) => [agent.id, getAgentTypeColor(agent.type)]))
}

function lookupAgentColor(
  agentId: string,
  colorMap: ReadonlyMap<string, string>
): string {
  return colorMap.get(agentId) ?? '#94a3b8'
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(1)}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs.toFixed(0)}s`
}

interface TaskHeaderProps {
  readonly activeCount: number
  readonly totalCount: number
}

function TaskHeader({ activeCount, totalCount }: TaskHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-[#f1f5f9]">
        Active Tasks
      </h2>
      <Badge
        variant="outline"
        className="font-mono text-[10px] border-[#1e293b] text-[#94a3b8]"
      >
        {activeCount} / {totalCount}
      </Badge>
    </div>
  )
}

interface AgentChainProps {
  readonly agentIds: readonly string[]
  readonly agentColorMap: ReadonlyMap<string, string>
}

function AgentChain({ agentIds, agentColorMap }: AgentChainProps) {
  return (
    <span className="text-xs font-mono">
      {agentIds.map((agentId, index) => {
        const color = lookupAgentColor(agentId, agentColorMap)
        return (
          <span key={agentId}>
            {index > 0 && <span className="text-[#475569]">{' \u2192 '}</span>}
            <span style={{ color }}>{truncateId(agentId)}</span>
          </span>
        )
      })}
    </span>
  )
}

interface ActiveTaskItemProps {
  readonly task: SwarmTask
  readonly index: number
  readonly agentColorMap: ReadonlyMap<string, string>
}

function ActiveTaskItem({ task, index, agentColorMap }: ActiveTaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        ...TASK_SPRING,
        delay: index * (STAGGER_DELAY_MS / 1000),
      }}
      className="py-2.5"
    >
      <div className="flex items-center gap-2 mb-1">
        <StatusDot status="active" size="sm" pulse />
        <span className="text-sm font-medium text-[#f1f5f9] truncate">
          {task.name}
        </span>
      </div>

      <div className="ml-4 mb-1.5">
        <AgentChain agentIds={task.agents} agentColorMap={agentColorMap} />
      </div>

      <div className="ml-4 flex items-center gap-2">
        <Progress
          value={task.progress}
          className="flex-1 bg-[#1e293b] h-1.5 transition-all duration-500 ease-out"
        />
        <span className={cn('text-xs shrink-0', MONO_MUTED_CLASSES)}>
          {task.progress}% &middot; {formatDuration(task.duration)}
        </span>
      </div>
    </motion.div>
  )
}

interface CompletedTaskItemProps {
  readonly task: SwarmTask
  readonly index: number
}

function CompletedTaskItem({ task, index }: CompletedTaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: index * (STAGGER_DELAY_MS / 1000),
      }}
      className="flex items-center justify-between py-1.5"
    >
      <div className="flex items-center gap-2 min-w-0">
        <Check className="size-3.5 text-[#34d399] shrink-0" />
        <span className="text-sm text-[#475569] truncate">
          {task.name}
        </span>
      </div>
      <span className={cn('text-xs shrink-0 ml-2', 'font-mono tabular-nums text-[#475569]')}>
        {formatDuration(task.duration)}
      </span>
    </motion.div>
  )
}

interface CompletedSectionProps {
  readonly tasks: readonly SwarmTask[]
}

function CompletedSection({ tasks }: CompletedSectionProps) {
  if (tasks.length === 0) return null

  return (
    <>
      <div className="flex items-center gap-3 my-3">
        <Separator className="flex-1 bg-[#1e293b]" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#475569]">
          Completed
        </span>
        <Separator className="flex-1 bg-[#1e293b]" />
      </div>

      <AnimatePresence>
        {tasks.map((task, index) => (
          <CompletedTaskItem key={task.id} task={task} index={index} />
        ))}
      </AnimatePresence>
    </>
  )
}

export function ActiveTasks({ tasks, agents }: ActiveTasksProps) {
  const agentColorMap = useMemo(() => buildAgentColorMap(agents), [agents])

  const { active, completed } = useMemo(() => partitionTasks(tasks), [tasks])

  return (
    <div className={PANEL_CLASSES}>
      <TaskHeader activeCount={active.length} totalCount={tasks.length} />

      <ScrollArea className="flex-1">
        <div className="pr-2">
          <AnimatePresence>
            {active.map((task, index) => (
              <ActiveTaskItem
                key={task.id}
                task={task}
                index={index}
                agentColorMap={agentColorMap}
              />
            ))}
          </AnimatePresence>

          <CompletedSection tasks={completed} />
        </div>
      </ScrollArea>
    </div>
  )
}
