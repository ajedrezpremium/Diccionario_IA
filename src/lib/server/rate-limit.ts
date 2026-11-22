import { sbRpc } from './supabase';

interface Registro {
  inicio: number;
  conteo: number;
}

const memoria = new Map<string, Registro>();
let ultimaLimpieza = 0;

function limitarEnMemoria(clave: string, limite: number, ventanaSegundos: number) {
  const ahora = Date.now();
  const ventanaMs = ventanaSegundos * 1000;

  if (ahora - ultimaLimpieza > 60_000) {
    for (const [k, v] of memoria) {
      if (ahora - v.inicio > ventanaMs * 2) memoria.delete(k);
    }
    ultimaLimpieza = ahora;
  }

  const actual = memoria.get(clave);
  if (!actual || ahora - actual.inicio > ventanaMs) {
    memoria.set(clave, { inicio: ahora, conteo: 1 });
    return { ok: true, restantes: limite - 1, retryAfter: 0 };
  }

  if (actual.conteo >= limite) {
    const retryAfter = Math.ceil((actual.inicio + ventanaMs - ahora) / 1000);
    return { ok: false, restantes: 0, retryAfter: Math.max(retryAfter, 1) };
  }

  actual.conteo += 1;
  return { ok: true, restantes: limite - actual.conteo, retryAfter: 0 };
}

/**
 * Rate limit por IP. Si Supabase está configurado, usa la función SQL
 * `hit_rate_limit` (persistente entre invocaciones serverless). Si no,
 * cae a memoria (suficiente para desarrollo y una sola instancia).
 */
export async function limitarPeticiones(
  clave: string,
  limite: number,
  ventanaSegundos: number,
): Promise<{ ok: boolean; restantes: number; retryAfter: number }> {
  if (limite <= 0) return { ok: true, restantes: 0, retryAfter: 0 };

  const rpc = await sbRpc<boolean>('hit_rate_limit', {
    p_key: clave,
    p_limit: limite,
    p_window_seconds: ventanaSegundos,
  });

  if (rpc.ok && typeof rpc.data === 'boolean') {
    return { ok: rpc.data, restantes: 0, retryAfter: rpc.data ? 0 : ventanaSegundos };
  }

  return limitarEnMemoria(clave, limite, ventanaSegundos);
}

export async function hashIp(ip: string): Promise<string> {
  const sal = process.env.RATE_LIMIT_SALT || 'diccionario-ia-v10';
  const datos = new TextEncoder().encode(`${sal}:${ip}`);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(hash))
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
