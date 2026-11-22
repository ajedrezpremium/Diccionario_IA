import type { APIRoute } from 'astro';
import { sbInsert, supabaseConfigurado } from '../../lib/server/supabase';
import { hashIp, limitarPeticiones } from '../../lib/server/rate-limit';
import { avisarNuevoDiagnostico } from '../../lib/server/mailer';
import { SITE } from '../../lib/site';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    clientAddress ||
    'anonima';

  const hash = await hashIp(ip);
  const limite = await limitarPeticiones(`diagnostico:${hash}`, 5, 3600);
  if (!limite.ok) {
    return json(
      {
        error: 'rate_limit',
        mensaje: 'Demasiadas solicitudes desde esta conexión. Prueba dentro de un rato.',
      },
      429,
    );
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'json_invalido', mensaje: 'La petición no es válida.' }, 400);
  }

  // Honeypot
  if (typeof cuerpo.empresa_hp === 'string' && cuerpo.empresa_hp.trim() !== '') {
    return json({ ok: true, guardado: false });
  }

  const nombre = String(cuerpo.nombre || '').trim().slice(0, 120);
  const email = String(cuerpo.email || '').trim().toLowerCase().slice(0, 180);
  const empresa = String(cuerpo.empresa || '').trim().slice(0, 120);
  const telefono = String(cuerpo.telefono || '').trim().slice(0, 40);
  const empleados = String(cuerpo.empleados || '').trim().slice(0, 20);
  const p1 = String(cuerpo.p1 || '').trim().slice(0, 1000);
  const p2 = String(cuerpo.p2 || '').trim().slice(0, 500);
  const p3 = String(cuerpo.p3 || '').trim().slice(0, 500);
  const p4 = String(cuerpo.p4 || '').trim().slice(0, 500);
  const p5 = String(cuerpo.p5 || '').trim().slice(0, 40);
  const consentimiento = cuerpo.consentimiento === 'on' || cuerpo.consentimiento === true;

  if (!nombre || !email || !empresa || !p1) {
    return json({ error: 'campos_obligatorios', mensaje: 'Completa los campos obligatorios.' }, 400);
  }
  if (!EMAIL.test(email)) {
    return json({ error: 'email_invalido', mensaje: 'Escribe un email válido.' }, 400);
  }
  if (!consentimiento) {
    return json(
      { error: 'consentimiento', mensaje: 'Necesitamos tu consentimiento para contactarte.' },
      400,
    );
  }

  if (!supabaseConfigurado) {
    if (import.meta.env.DEV) {
      return json({ ok: true, guardado: false, demo: true, mensaje: 'Modo local: configura Supabase.' });
    }
    return json(
      {
        error: 'servicio_no_configurado',
        mensaje: 'El servicio no está disponible ahora. Escríbenos a ' + SITE.email,
      },
      503,
    );
  }

  const guardado = await sbInsert('diagnosticos', {
    nombre,
    email,
    empresa,
    telefono: telefono || null,
    empleados: empleados || null,
    p1,
    p2: p2 || null,
    p3: p3 || null,
    p4: p4 || null,
    p5: p5 || null,
    consentimiento: true,
    ip_hash: hash,
    user_agent: (request.headers.get('user-agent') || '').slice(0, 300),
    creado_en: new Date().toISOString(),
  });

  if (!guardado.ok) {
    return json(
      { error: 'guardado_fallido', mensaje: 'No hemos podido guardar tu solicitud. Inténtalo de nuevo.' },
      500,
    );
  }

  void avisarNuevoDiagnostico({ nombre, email, empresa, telefono, empleados, p1, p2, p3, p4, p5 });

  return json({
    ok: true,
    guardado: true,
    mensaje: 'Solicitud recibida. Te contactamos en menos de 48 horas.',
  });
};
