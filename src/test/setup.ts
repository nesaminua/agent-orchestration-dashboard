import '@testing-library/jest-dom/vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
vi.mock('next/image', async () => {
  const React = await import('react')
  return {
    default: (props: Record<string, unknown>) => {
      return React.createElement('img', props)
    },
  }
})

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(
    private callback: IntersectionObserverCallback
  ) {
    // Immediately trigger with isIntersecting: true so whileInView works
    setTimeout(() => {
      this.callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            target: document.createElement('div'),
            time: 0,
          },
        ],
        this
      )
    }, 0)
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

global.IntersectionObserver = MockIntersectionObserver

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

global.ResizeObserver = MockResizeObserver

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
    context: vi.fn(() => ({
      revert: vi.fn(),
      add: vi.fn(),
    })),
  },
  gsap: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
    context: vi.fn(() => ({
      revert: vi.fn(),
      add: vi.fn(),
    })),
  },
  ScrollTrigger: {
    update: vi.fn(),
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
    killAll: vi.fn(),
  },
  SplitText: vi.fn(() => ({
    chars: [],
    words: [],
    lines: [],
    revert: vi.fn(),
  })),
}))

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void) => {
    // Execute callback immediately for testing
    callback()
  },
}))

// Mock lenis
vi.mock('lenis', () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    destroy: vi.fn(),
    raf: vi.fn(),
  })),
}))

// Mock motion/react (Framer Motion) — render children as-is, no animation
vi.mock('motion/react', async () => {
  const React = await import('react')

  const motionPropsToFilter = [
    'initial',
    'animate',
    'exit',
    'variants',
    'transition',
    'whileInView',
    'whileHover',
    'whileTap',
    'viewport',
    'custom',
    'layout',
    'layoutId',
    'onAnimationComplete',
  ]

  const createMotionProxy = (): Record<string, unknown> => {
    return new Proxy(
      {},
      {
        get(_target: object, prop: string) {
          const MotionComponent = React.forwardRef(
            (allProps: Record<string, unknown>, ref: unknown) => {
              const htmlProps: Record<string, unknown> = {}
              const { children, ...rest } = allProps
              for (const [key, value] of Object.entries(rest)) {
                if (!motionPropsToFilter.includes(key)) {
                  htmlProps[key] = value
                }
              }
              return React.createElement(prop, { ...htmlProps, ref }, children as unknown)
            }
          )
          MotionComponent.displayName = `motion.${prop}`
          return MotionComponent
        },
      }
    )
  }

  return {
    motion: createMotionProxy(),
    AnimatePresence: (props: Record<string, unknown>) => props.children,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
      on: vi.fn(),
    }),
    useSpring: (value: unknown) => value,
    useTransform: (_value: unknown, transform: (v: number) => string) => ({
      get: () => transform(0),
    }),
    useInView: () => true,
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
    }),
  }
})
