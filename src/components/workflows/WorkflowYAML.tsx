'use client'

import { Button } from '@/components/ui/button'

interface WorkflowYAMLProps {
  readonly yaml: string
}

export function WorkflowYAML({ yaml }: WorkflowYAMLProps) {
  function handleCopy() {
    void navigator.clipboard.writeText(yaml)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-text-primary text-sm font-medium">YAML Definition</h3>
        <Button variant="outline" size="sm" name="copy" onClick={handleCopy}>
          Copy
        </Button>
      </div>

      <pre className="bg-bg-secondary border-border-default overflow-x-auto rounded-md border p-4 text-sm text-text-secondary">
        {yaml}
      </pre>
    </div>
  )
}
