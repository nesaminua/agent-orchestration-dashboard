'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import {
  Radar,
  LayoutDashboard,
  Bot,
  GitBranch,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'sidebar-collapsed'

interface NavItem {
  readonly label: string
  readonly href: string
  readonly icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Mission Control', href: '/mission-control', icon: Radar },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agents', href: '/agents/agent-orch-001', icon: Bot },
  { label: 'Workflows', href: '/workflows', icon: GitBranch },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const

function getInitialCollapsed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'true'
  } catch {
    return false
  }
}

function subscribeNoop(): () => void {
  return () => {}
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed)
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const pathname = usePathname()

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable
      }
      return next
    })
  }, [])

  const isActive = useCallback(
    (href: string) => {
      if (href === '/workflows') {
        return pathname === '/workflows' || pathname.startsWith('/workflows/')
      }
      if (href.startsWith('/agents/')) {
        return pathname.startsWith('/agents/')
      }
      return pathname === href
    },
    [pathname]
  )

  const width = collapsed ? 64 : 240

  return (
    <TooltipProvider>
      <motion.aside
        initial={false}
        animate={{ width: mounted ? width : 240 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="relative flex h-screen shrink-0 flex-col border-r border-[#1e293b] bg-[#0a0f1a]"
      >
        {/* Logo */}
        <div className="flex h-16 items-center overflow-hidden px-4">
          {collapsed ? (
            <Logo variant="mark" className="w-8" />
          ) : (
            <Logo variant="full" className="w-36" />
          )}
        </div>

        <Separator className="bg-[#1e293b]" />

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
          {NAV_ITEMS.map(item => {
            const active = isActive(item.href)
            const Icon = item.icon

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-l-2 border-[#22d3ee] bg-[rgba(34,211,238,0.1)] text-white'
                    : 'border-l-2 border-transparent text-[#94a3b8] hover:bg-[#1e293b]'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <div key={item.href}>{linkContent}</div>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-2">
          <Separator className="mb-2 bg-[#1e293b]" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="w-full text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
