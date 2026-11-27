'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { TopologyMap } from '@/components/mission-control/TopologyMap'
import { LiveMetrics } from '@/components/mission-control/LiveMetrics'
import { MessageStream } from '@/components/mission-control/MessageStream'
import { ActiveTasks } from '@/components/mission-control/ActiveTasks'
import { useSwarm } from '@/lib/swarm-context'

function MissionControlContent() {
  const { agents, messages, tasks, metrics } = useSwarm()

  return (
    <div className="grid h-[calc(100vh-48px)] grid-cols-1 gap-3 p-3 lg:grid-cols-[3fr_2fr] lg:grid-rows-[1fr_1fr]">
      {/* Panel 1: Topology Map (top left) */}
      <div className="min-h-[300px] lg:min-h-0">
        <TopologyMap agents={agents} />
      </div>

      {/* Panel 2: Live Metrics (top right) */}
      <div className="min-h-[300px] lg:min-h-0">
        <LiveMetrics agents={agents} metrics={metrics} />
      </div>

      {/* Panel 3: Message Stream (bottom left) */}
      <div className="min-h-[300px] lg:min-h-0">
        <MessageStream messages={messages} agents={agents} />
      </div>

      {/* Panel 4: Active Tasks (bottom right) */}
      <div className="min-h-[300px] lg:min-h-0">
        <ActiveTasks tasks={tasks} agents={agents} />
      </div>
    </div>
  )
}

export default function MissionControlPage() {
  return (
    <AppLayout>
      <MissionControlContent />
    </AppLayout>
  )
}
