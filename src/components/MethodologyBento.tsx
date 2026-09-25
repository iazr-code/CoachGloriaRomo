import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Brain, Compass, Target, Telescope, TrendingUp, Users } from 'lucide-react'
import { EASE_OUT_EXPO, VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion'

interface Pillar {
  icon: LucideIcon
  title: string
  description: string
  /** Clase de ancho para el bento asimétrico (md:col-span-*). */
  span: string
  accent: string
  viz: React.ReactNode
}

/* ── Micro-visualizaciones (SVG ligeros, sin dependencias) ─────────────── */

const CalmWave = () => (
  <svg viewBox="0 0 200 48" className="h-12 w-full" aria-hidden="true">
    <defs>
      <linearGradient id="calmGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      d="M0 36 C 20 8, 34 44, 52 26 S 84 6, 104 28 S 140 46, 160 24 S 188 12, 200 22"
      fill="none"
      stroke="url(#calmGrad)"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M0 42 C 26 34, 46 46, 70 40 S 120 34, 150 42 S 184 44, 200 38"
      fill="none"
      stroke="#94A3B8"
      strokeWidth="1"
      strokeDasharray="3 5"
      opacity="0.45"
    />
  </svg>
)

const GoalRings = () => (
  <svg viewBox="0 0 120 48" className="h-12 w-full" aria-hidden="true">
    {[44, 32, 20, 9].map((r, i) => (
      <circle
        key={r}
        cx="60"
        cy="24"
        r={r / 1.4}
        fill="none"
        stroke={i === 3 ? '#EC4899' : 'rgba(248,250,252,0.22)'}
        strokeWidth={i === 3 ? 2 : 1}
      />
    ))}
    <circle cx="60" cy="24" r="3" fill="#EC4899" />
  </svg>
)

const ShiftGraph = () => (
  <svg viewBox="0 0 200 48" className="h-12 w-full" aria-hidden="true">
    <path
      d="M0 40 L40 40 L60 40"
      stroke="rgba(148,163,184,0.5)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 4"
    />
    <path
      d="M60 40 C 92 40, 104 26, 132 16 S 176 6, 200 4"
      stroke="#D91B5C"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="200" cy="4" r="3.5" fill="#F5C518" />
    <circle cx="60" cy="40" r="3" fill="#6366F1" />
  </svg>
)

const StrengthBars = () => (
  <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
    {[34, 52, 44, 72, 60, 92, 78, 100].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 4 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT_EXPO }}
        className="w-full rounded-t-sm bg-gradient-to-t from-brand-indigo/40 to-brand-pink"
        style={{ opacity: 0.55 + i * 0.055 }}
      />
    ))}
  </div>
)

/* ── Datos ─────────────────────────────────────────────────────────────── */

const PILLARS: Pillar[] = [
  {
    icon: Brain,
    title: 'Gestionar emociones y pensamientos',
    description:
      'Transforma los diálogos internos limitantes en estados de calma y claridad. Aprendés a observar la emoción sin fusionarte con ella y a elegir qué historia repetir.',
    span: 'md:col-span-2',
    accent: 'from-brand-magenta/25 to-transparent',
    viz: <CalmWave />,
  },
  {
    icon: Target,
    title: 'Definir metas y objetivos',
    description:
      'Un mapa de acción coherente entre lo que piensas, lo que dices y lo que hacés. La intención deja de ser deseo y pasa a ser dirección.',
    span: 'md:col-span-1',
    accent: 'from-brand-indigo/25 to-transparent',
    viz: <GoalRings />,
  },
  {
    icon: Telescope,
    title: 'Generar cambios reales en tu vida',
    description:
      'Intervenimos en tu forma de observar el mundo para abrir nuevas posibilidades. Cuando cambia el observador, cambia lo observable.',
    span: 'md:col-span-1',
    accent: 'from-brand-pink/25 to-transparent',
    viz: <ShiftGraph />,
  },
  {
    icon: Compass,
    title: 'Identificar fortalezas y habilidades',
    description:
      'Reconocés los recursos que ya están en vos y los convertís en liderazgo personal sostenido, no en una motivación que se apaga en tres días.',
    span: 'md:col-span-2',
    accent: 'from-brand-gold/20 to-transparent',
    viz: <StrengthBars />,
  },
]

/* ── Componente ────────────────────────────────────────────────────────── */

export default function MethodologyBento() {
  return (
    <section
      id="metodologia"
      aria-labelledby="method-title"
      className="section-pad relative px-5"
    >
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <motion.span variants={fadeInUp} className="eyebrow block text-brand-pink">
            Metodología
          </motion.span>
          <motion.h2
            id="method-title"
            variants={fadeInUp}
            className="mt-4 font-serif text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-6xl"
          >
            Cuatro movimientos para{' '}
            <em className="not-italic text-brand-pink">rediseñar tu conversación</em> contigo
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
            El coaching ontológico no trabaja sobre consejos, sino sobre el lugar desde donde
            observás. Cada sesión es un proceso guiado, con método y con escucha.
          </motion.p>
        </motion.div>

        {/* Bento asimétrico */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
        >
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className={[
                  'group relative overflow-hidden rounded-2xl p-7 md:p-8',
                  'glass transition-colors duration-500 hover:border-pink-500/40',
                  'focus-within:border-pink-500/40',
                  pillar.span,
                ].join(' ')}
              >
                {/* Halo de acento en hover */}
                <div
                  aria-hidden="true"
                  className={[
                    'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0',
                    'transition-opacity duration-500 group-hover:opacity-100',
                    pillar.accent,
                  ].join(' ')}
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                                 bg-white/[0.08] text-brand-pink ring-1 ring-white/15
                                 transition-all duration-500 group-hover:bg-brand-magenta
                                 group-hover:text-white group-hover:shadow-glow-magenta"
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-serif text-5xl font-semibold leading-none text-white/[0.06]
                                 transition-colors duration-500 group-hover:text-brand-pink/25"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[1.7rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>

                  <div className="mt-7 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                    {pillar.viz}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Franja de autoridad */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mt-6 flex flex-col items-start gap-6 rounded-2xl glass p-7 md:mt-8 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="flex items-center gap-4">
            <TrendingUp aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-gold" />
            <p className="text-[15px] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">Progreso observable:</span> cada proceso
              se mide en decisiones concretas, no en promesas vagas.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <Users aria-hidden="true" className="h-4 w-4 text-brand-pink" />
            Acompañamiento uno a uno, confidencial y a tu ritmo.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
