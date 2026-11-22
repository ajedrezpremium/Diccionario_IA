-- ============================================================
-- Diccionario IA — esquema de Supabase
-- Pega este archivo completo en:
--   Supabase > SQL Editor > New query > Run
-- Es idempotente: puedes ejecutarlo varias veces.
-- ============================================================

-- ---------- Leads (descarga del libro / contacto) ----------
create table if not exists public.leads (
  id            bigint generated always as identity primary key,
  email         text        not null,
  consentimiento boolean    not null default true,
  origen        text        not null default 'desconocido',
  ip_hash       text,
  user_agent    text,
  creado_en     timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint leads_email_key unique (email)
);

create index if not exists leads_creado_en_idx on public.leads (creado_en desc);
create index if not exists leads_origen_idx on public.leads (origen);

-- ---------- Sugerencias de términos del agente ----------
create table if not exists public.sugerencias (
  id         bigint generated always as identity primary key,
  termino    text        not null,
  origen     text        not null default 'agente',
  estado     text        not null default 'pendiente',
  ip_hash    text,
  creado_en  timestamptz not null default now()
);

create index if not exists sugerencias_estado_idx on public.sugerencias (estado, creado_en desc);

-- ---------- Rate limit persistente ----------
create table if not exists public.rate_limits (
  clave   text        not null,
  ventana timestamptz not null,
  conteo  integer     not null default 0,
  primary key (clave, ventana)
);

create index if not exists rate_limits_ventana_idx on public.rate_limits (ventana);

-- Devuelve true si la petición está permitida.
create or replace function public.hit_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ventana timestamptz;
  v_conteo  integer;
begin
  if p_limit <= 0 or p_window_seconds <= 0 then
    return true;
  end if;

  v_ventana := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );

  insert into public.rate_limits (clave, ventana, conteo)
  values (p_key, v_ventana, 1)
  on conflict (clave, ventana)
  do update set conteo = public.rate_limits.conteo + 1
  returning conteo into v_conteo;

  -- Limpieza oportunista de ventanas antiguas.
  delete from public.rate_limits where ventana < now() - interval '2 days';

  return v_conteo <= p_limit;
end;
$$;

revoke all on function public.hit_rate_limit(text, integer, integer) from public;
grant execute on function public.hit_rate_limit(text, integer, integer)
  to anon, authenticated, service_role;

-- ---------- Seguridad ----------
-- RLS activado y sin políticas públicas: solo la clave secreta
-- (service_role / sb_secret_...) puede leer y escribir desde el servidor.
alter table public.leads       enable row level security;
alter table public.sugerencias enable row level security;
alter table public.rate_limits enable row level security;

-- ---------- Comprobación ----------
select 'leads' as tabla, count(*) as filas from public.leads
union all
select 'sugerencias', count(*) from public.sugerencias
union all
select 'rate_limits', count(*) from public.rate_limits;
