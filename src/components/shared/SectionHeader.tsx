interface SectionHeaderProps {
  readonly title: string
  readonly subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-text-secondary">{subtitle}</p>
      )}
    </div>
  )
}
