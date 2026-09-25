import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  EXPERIENCES_TABLE,
  isSupabaseConfigured,
  supabase,
} from '../lib/supabase';
import { BRAND_FULL, SITE_URL } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { EASE_OUT_EXPO } from '../lib/motion';
import Logo from './Logo';

const CONFETTI_COLORS = ['#D91B5C', '#EC4899', '#6366F1', '#F5C518', '#FDE68A'];
const MAX_LENGTH = 600;

function localToday(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  confetti({
    particleCount: 140,
    spread: 85,
    origin: { y: 0.65 },
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
  }, 250);
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function TestimonialPage() {
  const [name, setName] = useState('');
  const [sessionDate, setSessionDate] = useState(localToday());
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Deja tu testimonio · ${BRAND_FULL}`;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const visibleRating = hoverRating || rating;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    if (name.trim().length < 2) {
      setErrorMessage('Escribe tu nombre completo.');
      setStatus('error');
      return;
    }
    if (rating < 1) {
      setErrorMessage('Elige una calificación de 1 a 5 estrellas.');
      setStatus('error');
      return;
    }
    if (comment.trim().length < 10) {
      setErrorMessage('Cuéntanos un poco más (mínimo 10 caracteres).');
      setStatus('error');
      return;
    }
    if (!consent) {
      setErrorMessage('Debes autorizar la publicación de tu testimonio.');
      setStatus('error');
      return;
    }

    const client = supabase;
    if (!client) {
      setErrorMessage(
        'El formulario no está conectado a Supabase en este despliegue. Configura las variables de entorno en Vercel y vuelve a desplegar.',
      );
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const row = {
      patient_name: name.trim(),
      experience_text: comment.trim(),
      rating,
      session_date: sessionDate,
    };

    try {
      let { error } = await client.from(EXPERIENCES_TABLE).insert(row);
      // Resiliencia: si la columna session_date aún no existe en la tabla, insertamos sin ella.
      if (error && /session_date/i.test(error.message)) {
        ({ error } = await client.from(EXPERIENCES_TABLE).insert({
          patient_name: row.patient_name,
          experience_text: row.experience_text,
          rating: row.rating,
        }));
      }

      if (error) throw new Error(error.message);

      trackEvent('testimonial_submitted', { rating });
      setStatus('success');
      celebrate();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? `No pudimos guardar tu testimonio: ${err.message}`
          : 'Ocurrió un error inesperado. Inténtalo de nuevo.',
      );
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-ink placeholder:text-ink-muted/60 outline-none transition-colors duration-300 focus:border-brand-pink/50 focus:bg-white/[0.09]';

  return (
    <div className="relative min-h-screen px-5 py-8 sm:py-12">
      <header className="mx-auto flex max-w-xl items-center justify-between">
        <a
          href="/"
          className="transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded"
        >
          <Logo markClassName="h-10 w-10" />
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted backdrop-blur-md transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Volver
        </a>
      </header>

      <main className="mx-auto mt-10 max-w-xl">
        <div className="text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-brand-pink backdrop-blur-md">
            <MessageSquareHeart className="h-3.5 w-3.5" aria-hidden="true" />
            Testimonio de paciente
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl">
            Tu experiencia{' '}
            <span className="italic bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
              puede transformar
            </span>{' '}
            a otra persona
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">
            Gracias por tomarte este momento. En menos de dos minutos cuentas cómo fue tu sesión
            y tu reseña aparece en la página principal en tiempo real.
          </p>
        </div>

        <div className="glass relative mt-8 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-brand-magenta/25 blur-3xl"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="relative text-center"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-magenta to-brand-indigo shadow-glow-magenta ring-1 ring-white/20">
                  <CheckCircle2 className="h-8 w-8 text-white" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-serif text-3xl text-ink">¡Gracias por tu confianza!</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                  Tu testimonio ya quedó registrado y aparecerá en la sección de testimonios de la
                  página. Gracias por ayudarnos a mostrar el cambio real del coaching ontológico.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={`/#testimonios`}
                    className="w-full rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-glow-magenta transition-colors duration-300 hover:bg-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink sm:w-auto"
                  >
                    Ver los testimonios
                  </a>
                  <a
                    href="/"
                    className="glass-cta w-full rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink sm:w-auto"
                  >
                    Volver al inicio
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="relative space-y-5"
                noValidate
              >
                <div>
                  <label
                    htmlFor="patient-name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted"
                  >
                    Tu nombre completo
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: María González"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="session-date"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-brand-pink" aria-hidden="true" />
                    Fecha de tu sesión
                  </label>
                  <input
                    id="session-date"
                    type="date"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    <Star className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
                    Calificación
                  </legend>
                  <div
                    className="flex items-center gap-2"
                    onMouseLeave={() => setHoverRating(0)}
                    role="radiogroup"
                    aria-label="Calificación de 1 a 5 estrellas"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} estrella${value > 1 ? 's' : ''}`}
                        onMouseEnter={() => setHoverRating(value)}
                        onFocus={() => setHoverRating(value)}
                        onBlur={() => setHoverRating(0)}
                        onClick={() => setRating(value)}
                        className="rounded-lg p-1 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors duration-200 ${
                            value <= visibleRating
                              ? 'fill-brand-gold text-brand-gold'
                              : 'text-white/25'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-ink-muted">
                      {visibleRating > 0 ? `${visibleRating} de 5` : 'Sin calificar'}
                    </span>
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="patient-comment"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted"
                  >
                    Tu experiencia
                  </label>
                  <textarea
                    id="patient-comment"
                    required
                    rows={5}
                    maxLength={MAX_LENGTH}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos cómo viviste la sesión, qué descubriste de ti y qué cambió después…"
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-1 text-right text-xs text-ink-muted/70">
                    {comment.length}/{MAX_LENGTH}
                  </p>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/10 accent-[#EC4899]"
                  />
                  <span>
                    Acepto que mi nombre y mi testimonio se publiquen públicamente en la página
                    web de Gloria Marina Romo.
                  </span>
                </label>

                {status === 'error' && errorMessage ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                {!isSupabaseConfigured && status !== 'error' ? (
                  <p className="rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm text-amber-100/90">
                    Modo demo: Supabase no está configurado en este entorno, así que el envío no
                    se guardará.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-magenta px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-glow-magenta transition-all duration-300 hover:bg-brand-pink hover:shadow-glow-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Publicar mi testimonio
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-ink-muted/70">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                  Tus datos solo se usan para mostrar este testimonio.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted/70">
          {BRAND_FULL} · Coach Ontológica ·{' '}
          <a
            href={SITE_URL}
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-ink"
          >
            coach-gloria-romo.vercel.app
          </a>
        </p>
      </main>
    </div>
  );
}
