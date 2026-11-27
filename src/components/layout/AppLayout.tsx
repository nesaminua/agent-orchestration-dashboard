'use client'

import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopStatusBar } from './TopStatusBar'
import { CommandPalette } from './CommandPalette'
import { SwarmProvider, useSwarm } from '@/lib/swarm-context'

interface AppLayoutProps {
  readonly children: ReactNode
}

function AppLayoutInner({ children }: AppLayoutProps) {
  const { metrics } = useSwarm()

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1a]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopStatusBar metrics={metrics} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SwarmProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </SwarmProvider>
  )
}
