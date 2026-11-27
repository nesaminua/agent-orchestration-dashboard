'use client'

import { Badge } from '@/components/ui/badge'
import { getMessageTypeColor } from '@/lib/topology-layout'
import type { MessageType } from '@/lib/types'

interface MessageTypeBadgeProps {
  readonly type: MessageType
}

export function MessageTypeBadge({ type }: MessageTypeBadgeProps) {
  const { color, label } = getMessageTypeColor(type)

  return (
    <Badge
      variant="outline"
      className="font-mono text-[10px] uppercase tracking-wider"
      style={{
        borderColor: `${color}40`,
        color,
        backgroundColor: `${color}10`,
      }}
    >
      {label}
    </Badge>
  )
}
