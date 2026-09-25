import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import confetti from 'canvas-confetti';
import { CalendarCheck, CheckCircle2, HeartHandshake, X } from 'lucide-react';
import { CALENDLY_URL } from '../lib/constants';
import { trackSchedule } from '../lib/analytics';
import { EASE_OUT_EXPO, VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion';

const CONFETTI_COLORS = ['#D91B5C', '#EC4899', '#6366F1', '#F5C518', '#FDE68A'];

function fireCelebration() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const end = Date.now() + 900;

  confetti({ particleCount: 90, spread: 78, origin: { y: 0.6 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
  confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
  confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });

  (function frame() {
    confetti({ particleCount: 4, spread: 70, startVelocity: 42, origin: { y: 0.55 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function CalendlySection() {
  const [scheduled, setScheduled] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useCalendlyEventListener({
    onEventScheduled: () => {
      setScheduled(true);
      fireCelebration();
      trackSchedule();
    },
  });

  const closeModal = useCallback(() => setScheduled(false), []);

  useEffect(() => {
    if (!scheduled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    modalRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [scheduled, closeModal]);

  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="section-pad relative px-5"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
        >
          <motion.p
            className="eyebrow inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-brand-pink backdrop-blur-md"
            variants={fadeInUp}
          >
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Agenda tu espacio
          </motion.p>

          <motion.h2
            id="agendar-title"
            className="mt-6 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl"
            variants={fadeInUp}
          >
            Da el primer paso hacia{' '}
            <span className="italic bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
              una vida más consciente
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
            variants={fadeInUp}
          >
            Reserva tu sesión de coaching ontológico con Gloria Marina Romo.
            Elige el horario que mejor te acompañe: trabajamos desde la palabra
            para reescribir tu forma de estar en el mundo.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="mt-12"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-3 sm:p-4 md:p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-magenta/25 blur-[110px]"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
              <InlineWidget
                url={CALENDLY_URL}
                styles={{
                  width: '100%',
                  minHeight: '720px',
                  overflow: 'auto',
                }}
                pageSettings={{
                  backgroundColor: '0a1128',
                  primaryColor: 'd91b5c',
                  textColor: 'f8fafc',
                  hideLandingPageDetails: false,
                  hideEventTypeDetails: false,
                }}
              />
            </div>

            <div className="relative mt-5 grid gap-3 px-1 pb-1 sm:grid-cols-3">
              {[
                { icon: CalendarCheck, text: 'Sesiones virtuales y presenciales' },
                { icon: HeartHandshake, text: 'Primera conversación sin costo' },
                { icon: CheckCircle2, text: 'Confirmación inmediata por correo' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs text-ink-muted backdrop-blur-md"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand-pink" aria-hidden="true" />
                  <span className="text-center">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {scheduled && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheduled-title"
          >
            <div
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
              onClick={closeModal}
              aria-hidden="true"
            />

            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="glass relative w-full max-w-lg rounded-3xl p-8 text-center outline-none sm:p-10"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Cerrar mensaje de bienvenida"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-ink-muted transition hover:bg-white/[0.12] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-magenta to-brand-pink shadow-glow-magenta">
                <HeartHandshake className="h-8 w-8 text-white" aria-hidden="true" />
              </span>

              <h3
                id="scheduled-title"
                className="mt-6 font-serif text-3xl leading-tight text-ink sm:text-4xl"
              >
                ¡Gracias por dar el{' '}
                <span className="italic text-brand-pink">primer paso</span>!
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                Tu sesión ha quedado reservada. Recibirás la confirmación en tu
                correo. Prepara una pregunta sincera para vos mism@: ahí empieza
                el trabajo.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-glow-magenta transition hover:bg-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-950"
                >
                  Perfecto, gracias
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
