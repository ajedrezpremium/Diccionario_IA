import type { APIRoute } from 'astro';
import { llamarModelo, sanearMensajes, sanearContexto, configAgente } from '../../lib/server/agente';
import { hashIp, limitarPeticiones } from '../../lib/server/rate-limit';

export const prerender = false;

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extra },
  });

function origenPermitido(request: Request): boolean {
  const origen = request.headers.get('origin');
  if (!origen) return true;
  try {
    const hostOrigen = new URL(origen).host;
    const hostPeticion = new URL(request.url).host;
    const hostSitio = process.env.PUBLIC_SITE_URL
      ? new URL(process.env.PUBLIC_SITE_URL).host
      : hostPeticion;
    return hostOrigen === hostPeticion || hostOrigen === hostSitio;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!origenPermitido(request)) {
    return json({ error: 'origen_no_permitido', mensaje: 'Petición no permitida.' }, 403);
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    clientAddress ||
    'anonima';
  const hash = await hashIp(ip);

  const porMinuto = Number(process.env.RATE_LIMIT_PER_MIN) || 12;
  const porDia = Number(process.env.RATE_LIMIT_PER_DAY) || 120;

  const minuto = await limitarPeticiones(`agente:min:${hash}`, porMinuto, 60);
  if (!minuto.ok) {
    return json(
      {
        error: 'rate_limit',
        mensaje: `Has hecho muchas preguntas seguidas. Espera ${minuto.retryAfter} s o consulta el glosario mientras tanto.`,
      },
      429,
      { 'retry-after': String(minuto.retryAfter) },
    );
  }

  const dia = await limitarPeticiones(`agente:dia:${hash}`, porDia, 86_400);
  if (!dia.ok) {
    return json(
      {
        error: 'rate_limit_diario',
        mensaje: 'Has alcanzado el límite diario del asistente. Mañana volvemos a estar disponibles.',
      },
      429,
    );
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: 'json_invalido', mensaje: 'La petición no es válida.' }, 400);
  }

  const mensajes = sanearMensajes((cuerpo as { messages?: unknown })?.messages);
  const contexto = sanearContexto((cuerpo as { contexto?: unknown })?.contexto);
  if (mensajes.length === 0 || mensajes[mensajes.length - 1].role !== 'user') {
    return json(
      { error: 'mensaje_invalido', mensaje: 'Escribe una pregunta para poder responder.' },
      400,
    );
  }

  const cfg = configAgente();
  if (!cfg.configurado) {
    return json(
      {
        error: 'agente_no_configurado',
        mensaje:
          'El asistente todavía no está conectado. Añade GROQ_API_KEY u OPENROUTER_API_KEY en las variables de entorno y vuelve a intentarlo.',
      },
      503,
    );
  }

  const consulta = mensajes[mensajes.length - 1]?.content ?? '';
  return llamarModelo(mensajes, contexto, consulta);
};
