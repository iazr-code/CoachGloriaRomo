/** Constantes de dominio compartidas por toda la Landing. */

export const WHATSAPP_URL =
  'https://wa.me/573113449349?text=Hola%20Gloria,%20estoy%20interesado/a%20en%20conocer%20m%C3%A1s%20sobre%20las%20sesiones%20de%20coaching%20ontol%C3%B3gico'

export const CALENDLY_URL =
  'https://calendly.com/gloriamarinaromopantoja/sesion-de-coaching-ontologico'

export const BRAND_NAME = 'Gloria Marina Romo'
export const BRAND_FULL = 'Gloria Marina Romo Pantoja'

/**
 * Dominio canónico de la Landing — úsalo para canonical / Open Graph / sitemap.
 */
export const SITE_URL = 'https://coach-gloria-romo.vercel.app'

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

export type SocialKind = 'instagram' | 'facebook' | 'tiktok'

export interface SocialLink {
  label: string
  href: string
  kind: SocialKind
}

/** Redes sociales oficiales de Gloria Marina Romo Pantoja. */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/glomar0305/', kind: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/gloria.romo.9', kind: 'facebook' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@marina.pantoja1', kind: 'tiktok' },
]

/** URL del formulario de testimonios (se comparte con pacientes por WhatsApp). */
export const TESTIMONIAL_URL = `${SITE_URL}/testimonio`
