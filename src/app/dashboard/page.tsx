'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { StatCard } from '@/components/dashboard/StatCard'
import { MessagesChart } from '@/components/dashboard/MessagesChart'
import { UtilizationHeatmap } from '@/components/dashboard/UtilizationHeatmap'
import { CostChart } from '@/components/dashboard/CostChart'
import { WorkflowSuccessChart } from '@/components/dashboard/WorkflowSuccessChart'
import { BottlenecksTable } from '@/components/dashboard/BottlenecksTable'
import {
  dashboardStats,
  hourlyMessages,
  heatmapData,
  costByAgent,
  workflowSuccessRate,
  agents,
} from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            label="Total Messages"
            value={dashboardStats.totalMessagesToday.toLocaleString()}
            change={dashboardStats.totalMessagesChange}
            changeLabel={`+${dashboardStats.totalMessagesChange}%`}
            positiveIsGood={true}
          />
          <StatCard
            label="Avg Response Time"
            value={`${dashboardStats.avgEndToEndLatency}s`}
            change={dashboardStats.latencyChange}
            changeLabel={`${dashboardStats.latencyChange}s`}
            positiveIsGood={false}
          />
          <StatCard
            label="Daily Spend"
            value={`$${dashboardStats.dailyCost.toFixed(2)}`}
            change={dashboardStats.costChange}
            changeLabel={`+$${dashboardStats.costChange.toFixed(2)}`}
            positiveIsGood={false}
          />
          <StatCard
            label="Active Workflows"
            value={String(dashboardStats.activeWorkflows)}
            change={0}
            changeLabel="No change"
          />
          <StatCard
            label="Failed Tasks (24h)"
            value={String(dashboardStats.failedTasks24h)}
            change={dashboardStats.failedTasksRate}
            changeLabel={`${(dashboardStats.failedTasksRate * 100).toFixed(1)}%`}
            positiveIsGood={false}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MessagesChart data={hourlyMessages} />
          <CostChart data={costByAgent} />
        </div>

        {/* Workflow Success Chart */}
        <WorkflowSuccessChart data={workflowSuccessRate} />

        {/* Heatmap */}
        <UtilizationHeatmap data={heatmapData} agents={agents} />

        {/* Bottlenecks Table */}
        <BottlenecksTable agents={agents} />
      </div>
    </AppLayout>
  )
}
