/** Constantes de dominio compartidas por toda la Landing. */

export const WHATSAPP_URL =
  'https://wa.me/573113449349?text=Hola%20Gloria,%20estoy%20interesado/a%20en%20conocer%20m%C3%A1s%20sobre%20las%20sesiones%20de%20coaching%20ontol%C3%B3gico'

export const CALENDLY_URL =
  'https://calendly.com/gloriamarinaromopantoja/sesion-de-coaching-ontologico'

export const BRAND_NAME = 'Gloria Marina Romo'
export const BRAND_FULL = 'Gloria Marina Romo Pantoja'

/**
 * Dominio canónico de la Landing — úsalo para canonical / Open Graph / sitemap.
 * REEMPLAZA este valor cuando el sitio tenga dominio propio de producción.
 */
export const SITE_URL = 'https://gloriamarinoromo.com'

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Agendar', href: '#agendar' },
]

/**
 * Redes sociales — añade las URLs reales cuando estén disponibles
 * (el carrd https://coachgloriaromo.carrd.co/ las lista como pendientes).
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = []
