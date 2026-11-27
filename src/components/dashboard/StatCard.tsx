'use client'

interface StatCardProps {
  readonly label: string
  readonly value: string
  readonly change: number
  readonly changeLabel: string
  readonly positiveIsGood?: boolean
}

function getChangeColor(change: number, positiveIsGood: boolean): string {
  if (change === 0) {
    return 'text-text-secondary'
  }

  const isGood = positiveIsGood ? change > 0 : change < 0

  return isGood ? 'text-green-400' : 'text-red-400'
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  positiveIsGood = true,
}: StatCardProps) {
  const colorClass = getChangeColor(change, positiveIsGood)
  const arrow = change > 0 ? '\u2191' : change < 0 ? '\u2193' : ''

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-4">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-text-primary">{value}</p>
      <div
        data-testid="change-indicator"
        className={`mt-1 flex items-center gap-1 text-sm ${colorClass}`}
      >
        <span>{arrow}</span>
        <span>{changeLabel}</span>
      </div>
    </div>
  )
}
