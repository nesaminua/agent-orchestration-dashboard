'use client'

import { useMemo } from 'react'

interface TopologyParticleProps {
  readonly pathString: string
  readonly color?: string
  readonly count?: number
  readonly duration?: number
}

const DEFAULT_COLOR = '#22d3ee'
const DEFAULT_COUNT = 2
const DEFAULT_DURATION = 3
const PARTICLE_RADIUS = 2
const PARTICLE_OPACITY = 0.8
const DURATION_JITTER = 1.5

interface ParticleConfig {
  readonly key: number
  readonly dur: string
  readonly begin: string
}

function buildParticleConfigs(
  count: number,
  duration: number
): readonly ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    dur: `${duration + i * (DURATION_JITTER / count)}s`,
    begin: `${(i * duration) / count}s`,
  }))
}

export function TopologyParticle({
  pathString,
  color = DEFAULT_COLOR,
  count = DEFAULT_COUNT,
  duration = DEFAULT_DURATION,
}: TopologyParticleProps) {
  const particles = useMemo(
    () => buildParticleConfigs(count, duration),
    [count, duration]
  )

  return (
    <g aria-hidden="true">
      {/* Glow filter for particle trail effect */}
      <defs>
        <filter
          id={`particle-glow-${color.replace('#', '')}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {particles.map((particle) => (
        <circle
          key={particle.key}
          r={PARTICLE_RADIUS}
          fill={color}
          opacity={PARTICLE_OPACITY}
          filter={`url(#particle-glow-${color.replace('#', '')})`}
        >
          <animateMotion
            dur={particle.dur}
            repeatCount="indefinite"
            path={pathString}
            begin={particle.begin}
            calcMode="linear"
          />
        </circle>
      ))}
    </g>
  )
}
