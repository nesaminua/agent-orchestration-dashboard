'use client'

import { cn } from '@/lib/utils'
import { getStatusColor } from '@/lib/topology-layout'
import type { AgentStatus } from '@/lib/types'

interface StatusDotProps {
  readonly status: AgentStatus
  readonly size?: 'sm' | 'md' | 'lg'
  readonly pulse?: boolean
}

const SIZE_CLASSES: Readonly<Record<string, string>> = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
}

export function StatusDot({ status, size = 'md', pulse = false }: StatusDotProps) {
  const color = getStatusColor(status)

  return (
    <span
      className={cn(
        'inline-block rounded-full shrink-0',
        SIZE_CLASSES[size],
        pulse && 'animate-[status-pulse_2s_ease-in-out_infinite]'
      )}
      style={{ backgroundColor: color }}
      aria-label={`Status: ${status}`}
    />
  )
}
