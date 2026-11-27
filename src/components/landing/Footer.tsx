'use client'

import { Logo } from '@/components/shared/Logo'

const NAV_LINKS = ['Docs', 'API', 'Pricing', 'Status', 'GitHub'] as const

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-primary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Logo variant="mark" className="w-8" />
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-text-muted">&copy; 2026 SwarmOps. All rights reserved.</p>
      </div>
    </footer>
  )
}
