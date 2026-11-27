import { workflows } from '@/lib/mock-data'
import { WorkflowDetailClient } from './client'

export function generateStaticParams() {
  return workflows.map(workflow => ({ id: workflow.id }))
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <WorkflowDetailClient id={id} />
}
