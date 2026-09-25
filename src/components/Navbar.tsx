import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../lib/constants'
import { scrollToId } from '../lib/lenis'
import Logo from './Logo'

/**
 * Navbar flotante tipo píldora — `top-4 z-40 mx-auto max-w-6xl`.
 * Se vuelve más sólida al hacer scroll para conservar legibilidad.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="sticky top-4 z-40 mx-auto w-[calc(100%-2rem)] max-w-6xl"
    >
      <nav
        aria-label="Navegación principal"
        className={[
          'glass-nav flex items-center justify-between rounded-full px-5 py-3 md:px-6',
          'transition-all duration-500',
          scrolled ? 'shadow-glass-xl backdrop-blur-xl' : 'backdrop-blur-md',
        ].join(' ')}
      >
        {/* Logo de marca */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('#inicio', -10)
          }}
          className="group focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-brand-pink rounded-full"
        >
          <span className="transition-transform duration-300 group-hover:scale-[1.03]">
            <Logo markClassName="h-9 w-9" />
          </span>
        </a>

        {/* Enlaces */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted
                           transition-colors duration-300 hover:bg-white/[0.07] hover:text-ink
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA principal */}
        <a
          href="#agendar"
          className="rounded-full bg-brand-magenta px-4 py-2.5 text-xs font-semibold
                     tracking-wide text-white shadow-glow-magenta transition-all duration-300
                     hover:bg-brand-pink hover:shadow-glow-pink hover:scale-[1.03]
                     active:scale-[0.98] focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2
                     focus-visible:ring-offset-midnight-950 md:px-5 md:text-sm"
        >
          Agendar Sesión
        </a>
      </nav>
    </motion.header>
  )
}
