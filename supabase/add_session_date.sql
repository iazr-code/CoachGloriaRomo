-- Migración opcional: agrega la fecha de la sesión al formulario de testimonios
-- Ejecutar en el SQL Editor de Supabase (junto con patient_experiences.sql).
--
-- Si aún no ejecutas esta migración, el formulario sigue funcionando: guarda
-- el testimonio sin la fecha de sesión (usa la fecha de registro automática).

alter table public.patient_experiences
  add column if not exists session_date date;

comment on column public.patient_experiences.session_date is
  'Fecha en que el paciente recibió la sesión (la ingresa en /testimonio)';

-- Verificación
select id, patient_name, session_date, rating, created_at
from public.patient_experiences
order by created_at desc
limit 20;
