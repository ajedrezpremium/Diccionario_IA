import type { APIRoute } from 'astro';
import { sbInsert, supabaseConfigurado } from '../../lib/server/supabase';
import { hashIp, limitarPeticiones } from '../../lib/server/rate-limit';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    clientAddress ||
    'anonima';
  const hash = await hashIp(ip);

  const limite = await limitarPeticiones(`sugerencia:${hash}`, 20, 3600);
  if (!limite.ok) return json({ ok: false, error: 'rate_limit' }, 429);

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'json_invalido' }, 400);
  }

  const termino = String(cuerpo.termino || '')
    .replace(/[\u0000-\u001f]/g, ' ')
    .trim()
    .slice(0, 90);

  if (termino.length < 2) return json({ ok: false, error: 'termino_invalido' }, 400);

  if (!supabaseConfigurado) {
    console.info('[sugerencia] Supabase no configurado; término recibido:', termino);
    return json({ ok: true, guardado: false });
  }

  const resultado = await sbInsert('sugerencias', {
    termino,
    origen: String(cuerpo.origen || 'agente').slice(0, 40),
    estado: 'pendiente',
    ip_hash: hash,
  });

  return json({ ok: resultado.ok, guardado: resultado.ok });
};
