import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format milliseconds into human-readable latency.
 * "34ms" or "1.2s"
 */
export function formatLatency(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }
  return `${(ms / 1000).toFixed(1)}s`
}

/**
 * Format number with commas. "1,247"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/**
 * Format as USD currency. "$4.23"
 */
export function formatCurrency(n: number): string {
  return `$${n.toFixed(2)}`
}

/**
 * Format as percentage. "99.8%"
 */
export function formatPercent(n: number): string {
  if (Number.isInteger(n)) {
    return `${n}%`
  }
  return `${n.toFixed(1)}%`
}

/**
 * Format large token counts. "234K" or "1.2M"
 */
export function formatTokens(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(0)}K`
  }
  return String(n)
}

/**
 * Convert a timestamp string to relative time. "23 min ago"
 * Accepts HH:MM:SS.mmm or ISO strings.
 */
export function timeAgo(timestamp: string): string {
  let targetDate: Date

  // Handle HH:MM:SS.mmm format
  if (/^\d{2}:\d{2}:\d{2}/.test(timestamp)) {
    const today = new Date()
    const parts = timestamp.split(':')
    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    const secParts = parts[2].split('.')
    const seconds = parseInt(secParts[0], 10)
    targetDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes,
      seconds
    )
  } else {
    targetDate = new Date(timestamp)
  }

  const now = new Date()
  const diffMs = now.getTime() - targetDate.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHrs < 24) return `${diffHrs}h ago`
  return `${diffDays}d ago`
}

/**
 * Truncate agent ID. "orch-001" from "agent-orch-001"
 */
export function truncateId(id: string): string {
  return id.replace(/^agent-/, '')
}

/**
 * Generate a random message ID. "msg-" + 6 hex chars
 */
export function generateId(): string {
  const hex = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  return `msg-${hex}`
}
