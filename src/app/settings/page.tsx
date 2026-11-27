'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ApiKeysTab } from '@/components/settings/ApiKeysTab'
import { WebhooksTab } from '@/components/settings/WebhooksTab'
import { IntegrationsTab } from '@/components/settings/IntegrationsTab'
import { AlertsTab } from '@/components/settings/AlertsTab'
import { TeamTab } from '@/components/settings/TeamTab'
import {
  apiKeys,
  webhooks,
  integrations,
  alertRules,
  teamMembers,
} from '@/lib/mock-data'

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-8">
        <SectionHeader
          title="Settings"
          subtitle="Manage API keys, integrations, alerts, and team access."
        />

        <Tabs defaultValue="api-keys">
          <TabsList>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <ApiKeysTab keys={apiKeys} />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhooksTab webhooks={webhooks} />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab integrations={integrations} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab rules={alertRules} />
          </TabsContent>

          <TabsContent value="team">
            <TeamTab members={teamMembers} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
