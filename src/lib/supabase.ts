import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Resiliencia crítica: si `.env` aún no está definido, `supabase` es `null`
 * y la UI cae en un modo degradado con testimonios semilla (nunca rompe React).
 */
export const isSupabaseConfigured: boolean = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: false },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null

/** Tabla de social proof (ver `supabase/patient_experiences.sql`). */
export const EXPERIENCES_TABLE = 'patient_experiences'
