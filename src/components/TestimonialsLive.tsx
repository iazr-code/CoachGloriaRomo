import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, RefreshCw, Star, Radio } from 'lucide-react';
import {
  EXPERIENCES_TABLE,
  isSupabaseConfigured,
  supabase,
} from '../lib/supabase';
import { seedTestimonials, type Experience } from '../data/seedTestimonials';
import { EASE_OUT_EXPO, VIEWPORT_ONCE, fadeInUp, staggerContainer } from '../lib/motion';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function Stars({ rating }: { rating: number }) {
  const safe = Math.min(Math.max(rating, 0), 5);
  return (
    <div className="flex items-center gap-1" aria-label={`Calificación ${safe} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 transition-colors duration-300 ${
            i < safe ? 'fill-brand-gold text-brand-gold' : 'text-white/25'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialsLive() {
  const [items, setItems] = useState<Experience[]>(seedTestimonials);
  const [isLive, setIsLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const client = supabase
    if (!client) return;

    let cancelled = false;

    const load = async () => {
      setRefreshing(true);
      try {
        const { data, error } = await client
          .from(EXPERIENCES_TABLE)
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0 && !cancelled) {
          setItems(data as Experience[]);
        }
      } catch {
        /* resiliencia: mantenemos la semilla */
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    };

    void load();

    const channel = client
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: EXPERIENCES_TABLE },
        (payload) => {
          const incoming = payload.new as Experience;
          if (!incoming) return;
          setItems((prev) => [incoming, ...prev]);
        },
      )
      .subscribe((status) => {
        if (!cancelled) setIsLive(status === 'SUBSCRIBED');
      });

    return () => {
      cancelled = true;
      void client.removeChannel(channel);
    };
  }, []);

  const live = isSupabaseConfigured && isLive;

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-title"
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
            <Quote className="h-3.5 w-3.5" aria-hidden="true" />
            Testimonios
          </motion.p>

          <motion.h2
            id="testimonials-title"
            className="mt-6 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl"
            variants={fadeInUp}
          >
            Lo que dicen quienes ya{' '}
            <span className="italic bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-indigo bg-clip-text text-transparent">
              transformaron
            </span>{' '}
            su conversación
          </motion.h2>

          <motion.p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg" variants={fadeInUp}>
            Historias reales de personas que decidieron observarse distinto y
            empezar a hablar consigo mismas con más claridad.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {live ? 'En vivo' : isSupabaseConfigured ? 'Conectando' : 'Modo demo'}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-ink-muted backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 text-brand-pink" aria-hidden="true" />
            {live
              ? 'Reseñas en tiempo real al finalizar cada sesión'
              : isSupabaseConfigured
                ? 'Sincronizando testimonios…'
                : 'Vista previa con testimonios de ejemplo'}
            {refreshing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-brand-indigo" aria-hidden="true" />
            ) : null}
          </span>
        </motion.div>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((t) => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="glass group relative flex h-full flex-col gap-4 rounded-2xl p-6 transition-colors duration-500 hover:border-pink-500/40 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <Stars rating={t.rating} />
                  <Quote
                    className="h-7 w-7 text-white/15 transition-colors duration-500 group-hover:text-brand-pink/70"
                    aria-hidden="true"
                  />
                </div>

                <p className="flex-1 text-[0.98rem] leading-relaxed text-ink/90">
                  “{t.experience_text}”
                </p>

                <div className="mt-1 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-magenta/80 to-brand-indigo/80 font-serif text-base text-white ring-1 ring-white/20">
                    {t.patient_name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{t.patient_name}</p>
                    <p className="truncate text-xs text-ink-muted">{formatDate(t.created_at)}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
