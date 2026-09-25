import { useEffect, useState } from 'react';
import { initSmoothScroll } from './lib/lenis';
import { initAnalytics } from './lib/analytics';
import { BRAND_FULL, NAV_LINKS, WHATSAPP_URL } from './lib/constants';
import ThoughtSeaCanvas from './components/canvas/ThoughtSeaCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SobreMi from './components/SobreMi';
import MethodologyBento from './components/MethodologyBento';
import TestimonialsLive from './components/TestimonialsLive';
import FaqSection from './components/FaqSection';
import ProcessSteps from './components/ProcessSteps';
import CalendlySection from './components/CalendlySection';
import WhatsAppFAB from './components/WhatsAppFAB';
import Logo from './components/Logo';
import SocialLinks from './components/SocialLinks';
import TestimonialPage from './components/TestimonialPage';

function currentPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  // Router mínimo: /testimonio renderiza el formulario, el resto la Landing.
  const [path, setPath] = useState<string>(currentPath);

  useEffect(() => {
    const destroySmoothScroll = initSmoothScroll();
    initAnalytics();

    const onPopState = () => setPath(currentPath());
    window.addEventListener('popstate', onPopState);
    return () => {
      destroySmoothScroll();
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const isTestimonialPage = path === '/testimonio';

  if (isTestimonialPage) {
    return (
      <div className="relative min-h-screen overflow-x-hidden font-sans text-ink antialiased">
        <ThoughtSeaCanvas />
        <TestimonialPage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-ink antialiased">
      <ThoughtSeaCanvas />

      <Navbar />

      <main id="contenido">
        <Hero />
        <SobreMi />
        <MethodologyBento />
        <TestimonialsLive />
        <FaqSection />
        <ProcessSteps />
        <CalendlySection />
      </main>

      <footer className="relative border-t border-white/10 bg-slate-950/40 px-5 py-12 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <Logo fullName />
            <p className="mt-3 text-sm text-ink-muted">
              El lenguaje crea realidades. · Sesiones virtuales y presenciales.
            </p>
            <SocialLinks className="mt-4 justify-center md:justify-start" />
          </div>

          <div className="flex flex-col items-center gap-5 md:items-end">
            <nav aria-label="Enlaces del pie de página">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/testimonio"
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded"
                  >
                    Deja tu testimonio
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </nav>

            <a
              href="https://coachgloriaromo.carrd.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-ink-muted/60 transition-colors duration-300 hover:text-ink-muted"
            >
              coachgloriaromo.carrd.co
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-ink-muted/70">
          © {new Date().getFullYear()} {BRAND_FULL}. Todos los derechos reservados.
        </p>
      </footer>

      <WhatsAppFAB />
    </div>
  );
}
