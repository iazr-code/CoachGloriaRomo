import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { EASE_OUT_EXPO, VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion'

interface FaqItem {
  question: string
  answer: string
}

/**
 * Preguntas frecuentes — objeciones resueltas antes de llegar a Calendly.
 * El contenido se mantiene sincronizado con el JSON-LD FAQPage de index.html.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Qué es el coaching ontológico y cómo me ayuda?',
    answer:
      'El coaching ontológico parte de una premisa sencilla: el lenguaje con el que te hablas a ti mismo crea tu realidad. Trabajamos para que detectes los diálogos internos que te limitan y los transformes en conversaciones de calma, claridad y acción. No se trata de pensamientos positivos, sino de observar de otra forma tu mundo y abrir así nuevas posibilidades.',
  },
  {
    question: '¿La primera sesión es realmente gratuita?',
    answer:
      'Sí. La sesión de descubrimiento no tiene costo ni compromiso. Es un espacio para conocernos, entender tu momento actual y definir si el acompañamiento es para ti. Solo continúas si sientes que aporta valor a tu vida.',
  },
  {
    question: '¿En qué se diferencia de la terapia psicológica?',
    answer:
      'El coaching es un proceso orientado al futuro y a la acción: no diagnostica ni trata condiciones de salud mental. Si durante el proceso detectamos que necesitas apoyo clínico, te lo diremos con honestidad y te orientaremos hacia el profesional adecuado.',
  },
  {
    question: '¿Las sesiones son virtuales o presenciales?',
    answer:
      'Ambas. Puedes escoger sesiones virtuales desde donde estés, o sesiones presenciales. Lo decides tú al agendar en el calendario: cada modalidad tiene la misma duración y la misma profundidad de trabajo.',
  },
  {
    question: '¿Cuánto dura cada sesión y cuántas necesito?',
    answer:
      'Cada sesión dura aproximadamente 60 minutos. El número de sesiones depende de tu objetivo: algunas personas necesitan un proceso corto y focalizado, otros prefieren un acompañamiento más largo. Lo definimos juntas en la sesión de descubrimiento, sin paquetes impuestos.',
  },
  {
    question: '¿Qué pasa después de agendar en Calendly?',
    answer:
      'Recibirás un correo de confirmación con la fecha, la hora y el enlace (o la ubicación) de tu sesión. Un día antes te enviaremos un recordatorio. Si algo cambia, puedes reprogramar desde el mismo correo de confirmación.',
  },
  {
    question: '¿Mis sesiones son confidenciales?',
    answer:
      'Absolutamente. Todo lo que compartes en sesión queda entre nosotras. La confidencialidad es la base del acompañamiento honesto y sin juicios.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad relative px-5">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-3xl"
      >
        <motion.p variants={fadeInUp} className="eyebrow flex items-center justify-center gap-2 text-brand-pink">
          <span aria-hidden="true" className="h-px w-8 bg-brand-pink/60" />
          Preguntas frecuentes
          <span aria-hidden="true" className="h-px w-8 bg-brand-pink/60" />
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          id="faq-title"
          className="mt-4 text-center font-serif text-4xl leading-[1.08] text-ink md:text-5xl"
        >
          Lo que necesitas saber{' '}
          <span className="bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
            antes de empezar
          </span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-muted md:text-lg">
          Resolvemos las dudas más comunes con la misma honestidad con la que
          acompaño cada sesión. Si queda algo en el aire, escríbeme por WhatsApp.
        </motion.p>

        <motion.ul variants={fadeInUp} className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <li key={item.question} className="glass rounded-2xl transition-colors duration-500 hover:border-pink-500/40">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-2xl"
                  >
                    <span className="font-serif text-lg text-ink md:text-xl">{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? 'border-brand-magenta/60 bg-brand-magenta/15 text-brand-pink shadow-glow-magenta'
                          : 'border-white/15 bg-white/[0.06] text-ink-muted'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pr-16 text-[15px] leading-relaxed text-ink-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </motion.ul>
      </motion.div>
    </section>
  )
}
