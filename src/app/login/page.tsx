'use client'

import { useState, useCallback } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Logo } from '@/components/shared/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      router.push('/mission-control')
    },
    [router]
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary hero-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-xl border border-border-default bg-bg-secondary p-8"
      >
        <div className="mb-8 flex justify-center">
          <Logo variant="mark" className="w-12" />
        </div>

        <h1 className="mb-6 text-center text-xl font-semibold text-text-primary">
          Sign in to SwarmOps
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm text-text-secondary"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm text-text-secondary"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="mt-2 w-full">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don&apos;t have an account?{' '}
          <span className="cursor-pointer text-cyan-accent hover:underline">
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  )
}
