'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LenisModule from 'lenis'

import { Hero } from '@/components/landing/Hero'
import { MiniTopology } from '@/components/landing/MiniTopology'
import { ArchitecturePatterns } from '@/components/landing/ArchitecturePatterns'
import { FeaturesGrid } from '@/components/landing/FeaturesGrid'
import { StatsSection } from '@/components/landing/StatsSection'
import { Footer } from '@/components/landing/Footer'

// Lenis constructor may be the default export or a named property
const LenisConstructor = (
  typeof LenisModule === 'function' ? LenisModule : (LenisModule as Record<string, unknown>).default
) as new (options: { autoRaf: boolean }) => { raf: (time: number) => void; destroy: () => void }

export default function LandingPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    try {
      lenis = new LenisConstructor({ autoRaf: false })
    } catch {
      // Lenis initialization may fail in test environments
    }

    function onTick(time: number) {
      lenis?.raf(time * 1000)
    }

    gsap.ticker.add(onTick)

    return () => {
      gsap.ticker.remove(onTick)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Hero />
      <MiniTopology />
      <ArchitecturePatterns />
      <FeaturesGrid />
      <StatsSection />
      <Footer />
    </div>
  )
}
