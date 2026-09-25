import { motion } from 'framer-motion'
import { CalendarCheck, MessagesSquare, Sprout } from 'lucide-react'
import { VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion'

const STEPS = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Agenda tu sesión gratuita',
    text: 'Elige fecha y hora en el calendario. Recibes confirmación al instante por correo.',
  },
  {
    icon: MessagesSquare,
    step: '02',
    title: 'Nos conocemos sin costo',
    text: 'Una conversación honesta para entender tu momento y decidir si avanzamos juntas.',
  },
  {
    icon: Sprout,
    step: '03',
    title: 'Comienza tu proceso',
    text: 'Definimos tu objetivo y empezamos a transformar la conversación contigo.',
  },
]

/** Banda compacta "cómo funciona" — reduce la fricción justo antes de Calendly. */
export default function ProcessSteps() {
  return (
    <section aria-labelledby="proceso-title" className="relative px-5 pb-4 md:pb-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={fadeInUp}
          id="proceso-title"
          className="text-center font-serif text-2xl text-ink md:text-3xl"
        >
          Empezar es más simple de lo que imaginas
        </motion.h2>

        <motion.ol variants={fadeInUp} className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="glass relative overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-pink-500/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-brand-pink">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-3xl italic text-white/15">{item.step}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  )
}
