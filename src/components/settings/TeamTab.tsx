'use client'

import type { TeamMember, TeamRole } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'

interface TeamTabProps {
  readonly members: readonly TeamMember[]
}

function getRoleBadgeClass(role: TeamRole): string {
  switch (role) {
    case 'owner':
      return 'bg-cyan-500/20 text-cyan-400'
    case 'admin':
      return 'bg-violet-500/20 text-violet-400'
    case 'member':
      return 'bg-blue-500/20 text-blue-400'
    case 'viewer':
      return 'bg-slate-500/20 text-slate-400'
  }
}

function getInitials(name: string): string {
  const parts = name.split(' ')
  const first = parts[0]?.[0] ?? ''
  const last = parts[1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function TeamTab({ members }: TeamTabProps) {
  return (
    <Card className="bg-bg-secondary border-border-default">
      <CardHeader>
        <CardTitle className="text-text-primary">Team</CardTitle>
        <Button size="sm" aria-label="Invite Member">+ Invite</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border-default">
              <TableHead className="text-text-secondary">Name</TableHead>
              <TableHead className="text-text-secondary">Role</TableHead>
              <TableHead className="text-text-secondary">Joined</TableHead>
              <TableHead className="text-text-secondary">Last Active</TableHead>
              <TableHead className="text-text-secondary">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="border-border-default/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/20 text-cyan-accent text-xs font-medium">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="text-text-primary">{member.name}</div>
                      <div className="text-text-muted text-xs">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleBadgeClass(member.role)}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-text-secondary text-sm">
                  {member.joinedAt}
                </TableCell>
                <TableCell className="text-text-secondary text-sm">
                  {member.lastActive}
                </TableCell>
                <TableCell>
                  {member.role !== 'owner' && (
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
