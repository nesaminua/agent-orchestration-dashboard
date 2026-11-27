'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useSwarmSimulation } from './mock-swarm'
import type { Agent, Message, SwarmTask, SystemMetrics } from './types'

interface SwarmState {
  readonly agents: readonly Agent[]
  readonly messages: readonly Message[]
  readonly tasks: readonly SwarmTask[]
  readonly metrics: SystemMetrics
}

const SwarmContext = createContext<SwarmState | null>(null)

interface SwarmProviderProps {
  readonly children: ReactNode
}

export function SwarmProvider({ children }: SwarmProviderProps) {
  const state = useSwarmSimulation()

  return (
    <SwarmContext.Provider value={state}>
      {children}
    </SwarmContext.Provider>
  )
}

export function useSwarm(): SwarmState {
  const ctx = useContext(SwarmContext)
  if (!ctx) {
    throw new Error('useSwarm must be used within a SwarmProvider')
  }
  return ctx
}
