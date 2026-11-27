'use client'

import { useEffect, useRef } from 'react'
import {
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  motion,
} from 'motion/react'

interface AnimatedCounterProps {
  readonly value: number
  readonly prefix?: string
  readonly suffix?: string
  readonly duration?: number
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  })
  const displayValue = useTransform(springValue, (latest) => {
    if (value >= 1000) {
      return Math.round(latest).toLocaleString('en-US')
    }
    // For small numbers or decimals, show one decimal place
    if (value % 1 !== 0) {
      return latest.toFixed(1)
    }
    return Math.round(latest).toLocaleString('en-US')
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}
