'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  readonly variant: 'full' | 'mark'
  readonly className?: string
}

export function Logo({ variant, className }: LogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src="/logo/logo-full.svg"
        alt="SwarmOps"
        width={200}
        height={48}
        className={cn('h-auto', className)}
        priority
      />
    )
  }

  return (
    <Image
      src="/logo/logo-mark.svg"
      alt="SwarmOps"
      width={48}
      height={48}
      className={cn('h-auto', className)}
      priority
    />
  )
}
