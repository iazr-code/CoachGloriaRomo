-- =============================================================
-- Tabla de experiencias de clientes (testimonios en vivo)
-- Proyecto: Gloria Marina Romo · Coach Ontológica
-- Ejecutar en el SQL Editor de Supabase (Dashboard → SQL Editor)
-- =============================================================

create table if not exists public.patient_experiences (
  id             uuid primary key default gen_random_uuid(),
  patient_name   text        not null,
  experience_text text       not null,
  rating         int         not null default 5 check (rating between 1 and 5),
  created_at     timestamptz not null default now()
);

create index if not exists patient_experiences_created_at_idx
  on public.patient_experiences (created_at desc);

-- -------------------------------------------------------------
-- Row Level Security: lectura pública + inserción pública
-- (la landing es de acceso público; ajusta a tu gusto)
-- -------------------------------------------------------------
alter table public.patient_experiences enable row level security;

drop policy if exists "Lectura pública de experiencias" on public.patient_experiences;
create policy "Lectura pública de experiencias"
  on public.patient_experiences
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Inserción pública de experiencias" on public.patient_experiences;
create policy "Inserción pública de experiencias"
  on public.patient_experiences
  for insert
  to anon, authenticated
  with check (true);

-- -------------------------------------------------------------
-- Realtime: publicar la tabla en el canal de Supabase
-- -------------------------------------------------------------
alter publication supabase_realtime add table public.patient_experiences;

-- -------------------------------------------------------------
-- Datos de ejemplo (opcional; la landing ya trae semilla local)
-- -------------------------------------------------------------
insert into public.patient_experiences (patient_name, experience_text, rating, created_at)
values
  ('Laura Mendoza', 'Llegué sintiéndome atascada y hoy observo mis pensamientos con más distancia y calma. La palabra, entendida de otra forma, cambió mi semana.', 5, now() - interval '12 days'),
  ('Andrés Villalba', 'La sesión me ayudó a definir una meta concreta y a alinear lo que digo con lo que hago. Salí con un mapa claro.', 5, now() - interval '9 days'),
  ('Carolina Pineda', 'Un espacio seguro para nombrar lo que sentía. Descubrí fortalezas que no estaba usando y ahora las lidero distinto.', 5, now() - interval '6 days'),
  ('Jorge Alfredo Ruiz', 'Práctico y profundo a la vez. Volví a mirar mi historia sin juicio y aparecieron posibilidades que no veía.', 4, now() - interval '2 days')
on conflict do nothing;

-- -------------------------------------------------------------
-- Verificación
-- -------------------------------------------------------------
select count(*) as total from public.patient_experiences;
