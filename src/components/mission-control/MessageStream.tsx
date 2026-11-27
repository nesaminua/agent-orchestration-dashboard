'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { truncateId } from '@/lib/utils'
import { getAgentTypeColor } from '@/lib/topology-layout'
import { MessageTypeBadge } from '@/components/shared/MessageTypeBadge'
// Using native overflow div instead of ScrollArea for proper onScroll handling
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Agent, Message } from '@/lib/types'

interface MessageStreamProps {
  readonly messages: readonly Message[]
  readonly agents: readonly Agent[]
}

const PANEL_CLASSES = 'bg-[#111827] border border-[#1e293b] rounded-xl p-4 h-full flex flex-col'
const MAX_VISIBLE_MESSAGES = 50
const ALL_FILTER = 'ALL'

const FILTER_OPTIONS: readonly string[] = [
  ALL_FILTER,
  'TASK_ASSIGN',
  'TOOL_REQUEST',
  'TOOL_RESULT',
  'TASK_COMPLETE',
  'ERROR',
  'HUMAN_REVIEW',
] as const

const MESSAGE_SPRING = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
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

function filterMessages(
  messages: readonly Message[],
  filter: string
): readonly Message[] {
  const sliced = messages.slice(-MAX_VISIBLE_MESSAGES)
  if (filter === ALL_FILTER) return sliced
  return sliced.filter((msg) => msg.type === filter)
}

interface StreamHeaderProps {
  readonly filter: string
  readonly onFilterChange: (value: string) => void
  readonly isPaused: boolean
  readonly onTogglePause: () => void
}

function StreamHeader({ filter, onFilterChange, isPaused, onTogglePause }: StreamHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-[#f1f5f9]">
        Message Stream
      </h2>
      <div className="flex items-center gap-2">
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger size="sm" className="h-7 text-xs bg-[#0d1117] border-[#1e293b] text-[#94a3b8] w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0d1117] border-[#1e293b]">
            {FILTER_OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="text-xs font-mono text-[#94a3b8]"
              >
                {option === ALL_FILTER ? 'All' : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onTogglePause}
          className="text-[#94a3b8] hover:text-[#f1f5f9]"
          aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
        >
          {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
        </Button>
      </div>
    </div>
  )
}

interface MetadataLineProps {
  readonly message: Message
}

function MetadataLine({ message }: MetadataLineProps) {
  const { metadata } = message
  const parts: readonly string[] = [
    metadata.priority ? `Priority: ${metadata.priority}` : '',
    metadata.timeout ? `Timeout: ${metadata.timeout}s` : '',
    metadata.tokens ? `Tokens: ${metadata.tokens}` : '',
    metadata.duration ? `Duration: ${metadata.duration}ms` : '',
    metadata.confidence ? `Confidence: ${(metadata.confidence * 100).toFixed(0)}%` : '',
    metadata.sources ? `Sources: ${metadata.sources}` : '',
    metadata.resultCount ? `Results: ${metadata.resultCount}` : '',
  ].filter(Boolean)

  if (parts.length === 0) return null

  return (
    <p className="text-[10px] font-mono text-[#475569] mt-1">
      {parts.join(' \u00b7 ')}
    </p>
  )
}

interface MessageItemProps {
  readonly message: Message
  readonly agentColorMap: ReadonlyMap<string, string>
}

function MessageItem({ message, agentColorMap }: MessageItemProps) {
  const fromColor = lookupAgentColor(message.from, agentColorMap)
  const toColor = lookupAgentColor(message.to, agentColorMap)

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={MESSAGE_SPRING}
      className="py-2 border-b border-[#1e293b]/50 last:border-b-0"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono text-[#475569]">
          {message.timestamp}
        </span>
        <span className="text-xs font-mono">
          <span style={{ color: fromColor }}>{truncateId(message.from)}</span>
          <span className="text-[#475569]">{' \u2192 '}</span>
          <span style={{ color: toColor }}>{truncateId(message.to)}</span>
        </span>
      </div>
      <div className="mb-1">
        <MessageTypeBadge type={message.type} />
      </div>
      <div className="bg-[#0d1117] rounded px-2 py-1.5">
        <p className="text-xs font-mono text-[#e2e8f0] break-words whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
      <MetadataLine message={message} />
    </motion.div>
  )
}

export function MessageStream({ messages, agents }: MessageStreamProps) {
  const [filter, setFilter] = useState<string>(ALL_FILTER)
  const [isPaused, setIsPaused] = useState(false)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const agentColorMap = useMemo(() => buildAgentColorMap(agents), [agents])

  const visibleMessages = useMemo(
    () => filterMessages(messages, filter),
    [messages, filter]
  )

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev
      if (!next) setIsAutoScroll(true)
      else setIsAutoScroll(false)
      return next
    })
  }, [])

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value)
  }, [])

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 40
    setIsAutoScroll(isNearBottom)
  }, [])

  useEffect(() => {
    if (!isPaused && isAutoScroll && scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [visibleMessages, isPaused, isAutoScroll])

  return (
    <div className={PANEL_CLASSES}>
      <StreamHeader
        filter={filter}
        onFilterChange={handleFilterChange}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pr-2"
      >
        <AnimatePresence initial={false}>
          {visibleMessages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              agentColorMap={agentColorMap}
            />
          ))}
        </AnimatePresence>
        <div ref={scrollEndRef} />
      </div>
    </div>
  )
}
