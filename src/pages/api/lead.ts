import type { APIRoute } from 'astro';
import { enviarLibroPorEmail, avisarNuevoLead } from '../../lib/server/mailer';
import { sbInsert, supabaseConfigurado } from '../../lib/server/supabase';
import { hashIp, limitarPeticiones } from '../../lib/server/rate-limit';
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

  const limite = await limitarPeticiones(`lead:${hash}`, 6, 3600);
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

  // Honeypot: si viene relleno, respondemos como si todo hubiera ido bien.
  if (typeof cuerpo.empresa === 'string' && cuerpo.empresa.trim() !== '') {
    return json({ ok: true, guardado: false });
  }

  const email = String(cuerpo.email || '').trim().toLowerCase();
  const consentimiento = cuerpo.consent === true;
  const origen = String(cuerpo.origen || 'desconocido').slice(0, 60);

  if (!EMAIL.test(email) || email.length > 180) {
    return json({ error: 'email_invalido', mensaje: 'Escribe un email válido.' }, 400);
  }
  if (!consentimiento) {
    return json(
      {
        error: 'consentimiento',
        mensaje: 'Necesitamos tu consentimiento explícito para enviarte el libro.',
      },
      400,
    );
  }

  if (!supabaseConfigurado) {
    if (import.meta.env.DEV) {
      return json({
        ok: true,
        guardado: false,
        emailEnviado: false,
        demo: true,
        mensaje: 'Modo local: configura Supabase y Gmail para activar el flujo real.',
        descarga: SITE.pdf,
      });
    }
    return json(
      {
        error: 'servicio_no_configurado',
        mensaje:
          'El servicio de descargas aún no está disponible. Inténtalo más tarde o escribe a chessagencyai@gmail.com.',
      },
      503,
    );
  }

  const guardado = await sbInsert(
    'leads',
    {
      email,
      consentimiento: true,
      origen,
      ip_hash: hash,
      user_agent: (request.headers.get('user-agent') || '').slice(0, 300),
      actualizado_en: new Date().toISOString(),
    },
    { upsert: true },
  );

  if (!guardado.ok) {
    return json(
      {
        error: 'guardado_fallido',
        mensaje: 'No hemos podido guardar tu solicitud. Inténtalo de nuevo en unos segundos.',
      },
      500,
    );
  }

  const envio = await enviarLibroPorEmail(email);
  void avisarNuevoLead(email, origen);

  return json({
    ok: true,
    guardado: true,
    emailEnviado: envio.ok,
    descarga: SITE.pdf,
    mensaje: envio.ok
      ? 'Te hemos enviado el libro por email. También puedes descargarlo ahora.'
      : 'Solicitud registrada. Descarga el libro directamente desde el enlace.',
  });
};
