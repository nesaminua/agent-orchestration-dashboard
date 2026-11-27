'use client'

import { useEffect, useRef, useCallback } from 'react'
import { computeEdgePath } from '@/lib/topology-layout'
import type { Position } from '@/lib/types'

interface TopologyEdgeProps {
  readonly id: string
  readonly from: Readonly<Position>
  readonly to: Readonly<Position>
  readonly index: number
}

const STROKE_COLOR = '#1e293b'
const STROKE_WIDTH = 1.5
const ANIMATION_DURATION_MS = 500
const STAGGER_MS = 100

function useDrawAnimation(
  delay: number
): React.RefCallback<SVGPathElement> {
  const animationRef = useRef<number | null>(null)

  const cleanupAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const ref = useCallback(
    (node: SVGPathElement | null) => {
      cleanupAnimation()

      if (!node) return

      const el = node
      const totalLength = el.getTotalLength()
      el.style.strokeDasharray = String(totalLength)
      el.style.strokeDashoffset = String(totalLength)

      const startTime = performance.now() + delay

      function animate(currentTime: number) {
        const elapsed = currentTime - startTime
        if (elapsed < 0) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }

        const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const offset = totalLength * (1 - eased)

        el.style.strokeDashoffset = String(offset)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [delay, cleanupAnimation]
  )

  useEffect(() => {
    return cleanupAnimation
  }, [cleanupAnimation])

  return ref
}

export function TopologyEdge({ from, to, index }: TopologyEdgeProps) {
  const pathD = computeEdgePath(from, to)
  const delay = index * STAGGER_MS
  const pathRef = useDrawAnimation(delay)

  return (
    <path
      ref={pathRef}
      d={pathD}
      fill="none"
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
    />
  )
}
