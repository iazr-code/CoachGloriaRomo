/**
 * Analítica de conversiones (GA4) con inicialización perezosa.
 * Si no existe `VITE_GA4_MEASUREMENT_ID` en `.env`, todo es un no-op:
 * la Landing sigue funcionando sin dependencias externas.
 */

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let initialized = false

export function initAnalytics(): void {
  if (!GA4_ID || initialized || typeof document === 'undefined') return
  initialized = true

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { send_page_view: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
  document.head.appendChild(script)
}

/** Evento de conversión. Silencioso si la analítica no está configurada. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!GA4_ID || !window.gtag) return
  window.gtag('event', name, params)
}

/** Conversión principal: agendamiento de sesión (Calendly). */
export function trackSchedule(): void {
  trackEvent('generate_lead', { method: 'calendly_inline' })
}

/** Click en cualquiera de los CTAs de WhatsApp. */
export function trackWhatsApp(): void {
  trackEvent('contact', { method: 'whatsapp' })
}

/** Envío del formulario de testimonio de paciente (/testimonio). */
export function trackTestimonial(): void {
  trackEvent('testimonial_submitted')
}
