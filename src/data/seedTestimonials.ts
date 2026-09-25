export interface Experience {
  id: string
  patient_name: string
  experience_text: string
  rating: number
  created_at: string
  /** Fecha de la sesión (columna opcional `session_date` en Supabase). */
  session_date?: string | null
}

/** Testimonios semilla: se muestran cuando Supabase no está configurado
 *  o cuando la tabla aún no tiene registros. Realistas y coherentes con el
 *  tono de la marca (introspección, claridad, cambio real). */
export const seedTestimonials: Experience[] = [
  {
    id: 'seed-1',
    patient_name: 'Laura Mendoza',
    experience_text:
      'Llegué convencida de que no podía cambiar. En tres sesiones aprendí a observar el diálogo interno que me frenaba. Hoy tomo decisiones con una calma que no conocía.',
    rating: 5,
    created_at: '2026-09-18T14:05:00.000Z',
  },
  {
    id: 'seed-2',
    patient_name: 'Andrés Villalba',
    experience_text:
      'El trabajo con Gloria me ayudó a separar los hechos de las historias que yo mismo me contaba. Esa distancia cambió por completo mi forma de liderar mi equipo.',
    rating: 5,
    created_at: '2026-09-11T09:40:00.000Z',
  },
  {
    id: 'seed-3',
    patient_name: 'Carolina Pineda',
    experience_text:
      'Me sorprendió lo profundo que puede ser una conversación bien acompañada. Salí de cada sesión con más claridad y un paso concreto que sí podía dar.',
    rating: 5,
    created_at: '2026-09-02T18:20:00.000Z',
  },
  {
    id: 'seed-4',
    patient_name: 'Jorge Alfredo Ruiz',
    experience_text:
      'No buscaba motivación, buscaba entender por qué me sabotéo. Aquí encontré un espacio seguro, con método y mucha escucha. Totalmente recomendado.',
    rating: 4,
    created_at: '2026-08-24T12:15:00.000Z',
  },
]
