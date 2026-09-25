import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, Sparkles } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/constants'
import { trackWhatsApp } from '../lib/analytics'
import { EASE_OUT_EXPO, staggerContainer, fadeInUp, fadeIn } from '../lib/motion'

/**
 * Hero editorial sobre el mar de pensamientos (WebGL de fondo).
 * Jerarquía: badge → H1 serif → subtítulo → doble CTA → micro-prueba social.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-5 pt-28 pb-20 text-center md:pt-36"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-4xl flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp}>
          <span
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2
                       text-[11px] font-medium tracking-[0.14em] text-ink-muted uppercase md:text-xs"
          >
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-brand-pink" />
            Coaching Ontológico · Sesiones Virtuales y Presenciales
          </span>
        </motion.div>

        {/* H1 editorial */}
        <motion.h1
          id="hero-title"
          variants={fadeInUp}
          className="mt-8 font-serif text-balance text-[2.65rem] leading-[1.04] font-semibold
                     tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          Transforma tu Realidad a través del{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
              Poder de tus Palabras
            </span>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.9 }}
              className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full
                         bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo/60"
            />
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeInUp}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-ink-muted md:text-lg"
        >
          Soy <span className="font-semibold text-ink">Gloria Marina Romo</span>, Coach
          Ontológica en formación. Acompaño procesos de introspección, claridad emocional y
          rediseño personal para que el lenguaje que usas contigo deje de ser una jaula y se
          convierta en dirección.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <motion.a
            href="#agendar"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full
                       bg-brand-magenta px-7 py-4 text-sm font-semibold tracking-wide text-white
                       shadow-glow-magenta transition-colors duration-300 hover:bg-brand-pink
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink
                       focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-950 sm:w-auto"
          >
            <CalendarCheck aria-hidden="true" className="h-4 w-4" />
            Agenda tu sesión gratuita
          </motion.a>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsApp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="glass-cta inline-flex w-full items-center justify-center gap-2.5 rounded-full
                       px-7 py-4 text-sm font-semibold tracking-wide text-ink backdrop-blur-xl
                       transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-brand-pink focus-visible:ring-offset-2
                       focus-visible:ring-offset-midnight-950 sm:w-auto"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4 text-brand-pink" />
            Hablemos por WhatsApp
          </motion.a>
        </motion.div>

        {/* Micro-prueba social */}
        <motion.div
          variants={fadeIn}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-muted"
        >
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-livePulse"
            />
            Reservas abiertas esta semana
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Sesión de descubrimiento sin costo</span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Virtual · Presencial</span>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-brand-pink"
          />
        </div>
      </motion.div>
    </section>
  )
}
