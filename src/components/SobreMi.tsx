import { motion } from 'framer-motion'
import { Award, CalendarHeart, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { BRAND_FULL } from '../lib/constants'
import { VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion'

interface Credential {
  icon: typeof Award
  title: string
  detail: string
}

const CREDENTIALS: Credential[] = [
  {
    icon: Sparkles,
    title: 'Coach Ontológica en formación',
    detail: 'Formación continua en la escuela del coaching ontológico y su mirada del ser humano.',
  },
  {
    icon: CalendarHeart,
    title: 'Sesiones virtuales y presenciales',
    detail: 'Elige el formato que te dé mejor: desde donde estés o en persona.',
  },
  {
    icon: HeartHandshake,
    title: 'Acompañamiento 1 a 1',
    detail: 'Procesos individuales, personalizados y a tu ritmo, sin paquetes impuestos.',
  },
  {
    icon: ShieldCheck,
    title: 'Confidencialidad total',
    detail: 'Un espacio seguro, sin juicios, donde hablar con libertad de lo que importa.',
  },
]

/**
 * Sección "Sobre mí" — historia y credenciales con la estética glass,
 * sobre el océano WebGL de fondo (el canvas es fixed -z-10 global).
 */
export default function SobreMi() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-title" className="section-pad relative px-5">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 lg:gap-20"
      >
        {/* Retrato de cuerpo completo */}
        <motion.figure variants={fadeInUp} className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-magenta/25 via-brand-indigo/15 to-transparent blur-2xl"
          />
          <div className="glass overflow-hidden rounded-[2rem] p-2.5 transition-colors duration-500 hover:border-pink-500/40">
            <img
              src="/gloria-romo.jpeg"
              alt={`${BRAND_FULL}, Coach Ontológica, de cuerpo completo en un espacio de trabajo`}
              width={972}
              height={1600}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <figcaption className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold text-ink md:text-sm">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-pink shadow-glow-pink" />
            Acompañamiento con calma y método
          </figcaption>
        </motion.figure>

        {/* Historia + credenciales */}
        <div>
          <motion.p variants={fadeInUp} className="eyebrow text-brand-pink">
            Sobre mí
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            id="sobre-title"
            className="mt-4 font-serif text-4xl leading-[1.06] text-ink md:text-5xl lg:text-[3.4rem]"
          >
            Hola, soy{' '}
            <span className="bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
              {BRAND_FULL}
            </span>
          </motion.h2>

          <motion.div variants={fadeInUp} className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-muted md:text-base">
            <p>
              Coach Ontológica en formación, acompañar a personas a mirarse de otra
              forma es el oficio que hoy me define. Creo profundamente que{' '}
              <strong className="font-semibold text-ink">
                el lenguaje crea realidades
              </strong>
              : la conversación que sostienes contigo mismo determina lo que puedes
              ver, decidir y construir en tu vida.
            </p>
            <p>
              Mi historia llegó a este lugar después de años de vida profesional y
              personal en las que entendí que casi todos nuestros bloqueos no vienen
              de las circunstancias, sino de cómo las nombramos. Hoy traduzco esa
              experiencia en un proceso de introspección, claridad emocional y
              rediseño personal: un espacio sereno pero exigente, donde dejamos de
              repetir los mismos relatos y empezamos a escribir otros nuevos.
            </p>
            <p>
              Trabajo con personas que sienten que es momento de un cambio real —no
              un ajuste de superficie— y están dispuestas a conversar sobre eso con
              honestidad. Si esa eres tú, será un gusto acompañarte.
            </p>
          </motion.div>

          <motion.ul
            variants={fadeInUp}
            className="mt-9 grid gap-3 sm:grid-cols-2"
          >
            {CREDENTIALS.map((credential) => (
              <li
                key={credential.title}
                className="glass group rounded-2xl p-4 transition-colors duration-500 hover:border-pink-500/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-brand-pink transition-all duration-300 group-hover:bg-brand-magenta group-hover:text-white group-hover:shadow-glow-magenta">
                    <credential.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{credential.title}</p>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  {credential.detail}
                </p>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#metodologia"
              className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white
                         shadow-glow-magenta transition-all duration-300 hover:bg-brand-pink
                         hover:shadow-glow-pink hover:scale-[1.02] active:scale-[0.98]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink
                         focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-950"
            >
              Conoce mi metodología
            </a>
            <a
              href="#agendar"
              className="glass-cta rounded-full px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
            >
              Agenda tu sesión gratuita
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
