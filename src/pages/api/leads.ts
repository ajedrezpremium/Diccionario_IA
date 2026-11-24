import type { APIRoute } from 'astro';
import { supabaseConfigurado } from '../../lib/server/supabase';

export const prerender = false;

const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';
const ADMIN_TOKEN = process.env.LEADS_ADMIN_TOKEN || '';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

async function leer(tabla: string, columnas: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${tabla}?select=${columnas}&order=creado_en.desc&limit=500`,
    { headers: { apikey: KEY, authorization: `Bearer ${KEY}` } },
  );
  if (!res.ok) throw new Error(`${tabla}: ${res.status} ${(await res.text()).slice(0, 120)}`);
  return (await res.json()) as Record<string, unknown>[];
}

export const GET: APIRoute = async ({ request, url }) => {
  if (!ADMIN_TOKEN) return json({ error: 'token_no_configurado' }, 503);

  const cabecera = request.headers.get('authorization') || '';
  const token = cabecera.replace(/^Bearer\s+/i, '').trim();
  if (token !== ADMIN_TOKEN) return json({ error: 'no_autorizado' }, 401);

  if (!supabaseConfigurado) return json({ error: 'supabase_no_configurado' }, 503);

  try {
    const [leads, diagnosticos] = await Promise.all([
      leer('leads', 'email,consentimiento,origen,creado_en'),
      leer('diagnosticos', 'nombre,email,empresa,empleados,creado_en'),
    ]);

    if (url.searchParams.get('format') === 'csv') {
      const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const lineas = ['Tipo;Email;Nombre / Empresa;Origen;Fecha;Consentimiento'];
      for (const l of leads) {
        lineas.push(
          ['Guía', l.email, '', l.origen, l.creado_en, l.consentimiento ? 'sí' : 'no']
            .map(esc)
            .join(';'),
        );
      }
      for (const d of diagnosticos) {
        lineas.push(
          ['Diagnóstico', d.email, `${d.nombre ?? ''} / ${d.empresa ?? ''}`, '', d.creado_en, '']
            .map(esc)
            .join(';'),
        );
      }
      return new Response('\uFEFF' + lineas.join('\r\n'), {
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="leads-diccionario-ia.csv"',
          'cache-control': 'no-store',
        },
      });
    }

    return json({ leads, diagnosticos, generado: new Date().toISOString() });
  } catch (error) {
    return json({ error: 'error_supabase', mensaje: String(error) }, 500);
  }
};
