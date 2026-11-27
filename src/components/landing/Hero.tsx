'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { Logo } from '@/components/shared/Logo'

const TECH_BADGES = ['LangGraph', 'CrewAI', 'AutoGen', 'OpenAI', 'Claude', 'Python'] as const

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!headlineRef.current) return

    gsap.registerPlugin(SplitText)
    const split = new SplitText(headlineRef.current, { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power3.out',
    })
  })

  return (
    <section className="relative min-h-screen hero-gradient">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-border-default">
        <Logo variant="full" className="w-36" />
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Sign In
          </a>
          <a
            href="/login"
            className="rounded-lg bg-cyan-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-cyan-hover"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary">
          Orchestrate AI agent teams at scale.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
          Deploy, monitor, and coordinate multi-agent systems with real-time
          visibility into every interaction.
        </p>

        {/* Tech Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TECH_BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-border-default px-3 py-1 font-mono text-xs text-text-secondary"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/mission-control"
            className="rounded-lg bg-cyan-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-colors hover:bg-cyan-hover"
          >
            Start Orchestrating &rarr;
          </a>
          <a
            href="#demo"
            className="rounded-lg border border-border-default px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-cyan-accent/30"
          >
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  )
}
