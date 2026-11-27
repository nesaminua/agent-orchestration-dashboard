'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface Stat {
  readonly value: number
  readonly suffix: string
  readonly label: string
}

const STATS: readonly Stat[] = [
  { value: 5200, suffix: '+', label: 'agent swarms deployed' },
  { value: 89, suffix: 'M+', label: 'inter-agent messages/month' },
  { value: 23, suffix: 'ms', label: 'avg agent-to-agent latency' },
  { value: 99.99, suffix: '%', label: 'orchestrator uptime' },
] as const

const ANIMATION_DURATION_MS = 1500

function formatValue(raw: number, target: number): string {
  if (target >= 1000) {
    return Math.round(raw).toLocaleString('en-US')
  }
  if (target % 1 !== 0) {
    return raw.toFixed(2)
  }
  return Math.round(raw).toLocaleString('en-US')
}

interface StatCounterProps {
  readonly value: number
  readonly suffix: string
}

function StatCounter({ value, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(formatValue(0, value))
  const animationRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value

      setDisplay(formatValue(current, value))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick)
      }
    }

    animationRef.current = requestAnimationFrame(tick)
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <div ref={ref} className="text-4xl font-bold font-mono tabular-nums text-text-primary">
      {display}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="border-y border-border-default bg-bg-secondary py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <StatCounter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
