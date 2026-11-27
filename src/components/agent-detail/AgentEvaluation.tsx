'use client'

import type { EvalResult } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AgentEvaluationProps {
  readonly results: readonly EvalResult[]
}

interface GroupedTest {
  readonly testName: string
  readonly scores: readonly EvalResult[]
}

function groupByTestName(results: readonly EvalResult[]): readonly GroupedTest[] {
  const map = new Map<string, EvalResult[]>()

  for (const r of results) {
    const existing = map.get(r.testName)
    if (existing) {
      existing.push(r)
    } else {
      map.set(r.testName, [r])
    }
  }

  return Array.from(map.entries()).map(([testName, scores]) => ({
    testName,
    scores,
  }))
}

function hasRegression(scores: readonly EvalResult[]): boolean {
  if (scores.length < 2) return false
  const sorted = [...scores].sort((a, b) => a.accuracy - b.accuracy)
  const best = sorted[sorted.length - 1]
  const worst = sorted[0]
  return best.accuracy - worst.accuracy > 1.5
}

export function AgentEvaluation({ results }: AgentEvaluationProps) {
  const grouped = groupByTestName(results)
  const hasAnyRegression = grouped.some((g) => hasRegression(g.scores))
  const uniqueModels = Array.from(new Set(results.map((r) => r.model)))

  return (
    <div className="space-y-6">
      {hasAnyRegression && (
        <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
          <p className="text-sm font-medium text-yellow-400">
            Regression detected in model comparison
          </p>
        </div>
      )}

      <p className="text-text-secondary text-sm">
        {uniqueModels.join(' vs ')}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {grouped.map((group) => (
          <Card key={group.testName} className="bg-bg-secondary border-border-default">
            <CardHeader>
              <CardTitle className="text-text-primary text-sm">{group.testName}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.scores.map((score) => (
                  <li key={score.id} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{score.accuracy}%</span>
                    <span className="text-text-muted">{score.latencyMs}ms</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
