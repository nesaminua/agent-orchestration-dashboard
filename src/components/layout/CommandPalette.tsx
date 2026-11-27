'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Radar,
  LayoutDashboard,
  GitBranch,
  Settings,
  Bot,
} from 'lucide-react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { agents, workflows } from '@/lib/mock-data'

interface CommandEntry {
  readonly label: string
  readonly href: string
  readonly icon: React.ComponentType<{ className?: string }>
}

const PAGE_ENTRIES: readonly CommandEntry[] = [
  { label: 'Mission Control', href: '/mission-control', icon: Radar },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Workflows', href: '/workflows', icon: GitBranch },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, agents, workflows..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {PAGE_ENTRIES.map(entry => {
            const Icon = entry.icon
            return (
              <CommandItem
                key={entry.href}
                onSelect={() => handleSelect(entry.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{entry.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading="Agents">
          {agents.map(agent => (
            <CommandItem
              key={agent.id}
              onSelect={() => handleSelect(`/agents/${agent.id}`)}
            >
              <Bot className="mr-2 h-4 w-4" />
              <span>{agent.name}</span>
              <span className="ml-auto text-xs text-[#94a3b8]">
                {agent.type}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Workflows">
          {workflows.map(workflow => (
            <CommandItem
              key={workflow.id}
              onSelect={() => handleSelect(`/workflows/${workflow.id}`)}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              <span>{workflow.name}</span>
              <span className="ml-auto text-xs text-[#94a3b8]">
                {workflow.pattern}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
