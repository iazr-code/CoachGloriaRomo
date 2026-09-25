import type { Transition, Variants } from 'framer-motion'

/** Easing editorial: desaceleración suave, nunca rebote. Ver DESIGN.md §5. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const VIEWPORT_ONCE = { once: true, margin: '-15%' } as const

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO } satisfies Transition,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } satisfies Transition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO } satisfies Transition,
  },
}
