const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';

export const supabaseConfigurado = Boolean(SUPABASE_URL && SUPABASE_KEY);

function cabeceras(extra: Record<string, string> = {}) {
  return {
    apikey: SUPABASE_KEY,
    authorization: `Bearer ${SUPABASE_KEY}`,
    'content-type': 'application/json',
    ...extra,
  };
}

export async function sbInsert(
  tabla: string,
  fila: Record<string, unknown>,
  opciones: { upsert?: boolean } = {},
): Promise<{ ok: boolean; error?: string }> {
  if (!supabaseConfigurado) return { ok: false, error: 'supabase_no_configurado' };

  const prefer = opciones.upsert
    ? 'resolution=merge-duplicates,return=minimal'
    : 'return=minimal';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tabla}`, {
      method: 'POST',
      headers: cabeceras({ prefer }),
      body: JSON.stringify(fila),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      const texto = await res.text().catch(() => '');
      console.error(`[supabase] ${tabla}`, res.status, texto.slice(0, 400));
      return { ok: false, error: `http_${res.status}` };
    }
    return { ok: true };
  } catch (error) {
    console.error(`[supabase] ${tabla}`, error);
    return { ok: false, error: 'red' };
  }
}

export async function sbRpc<T = unknown>(
  funcion: string,
  args: Record<string, unknown>,
): Promise<{ ok: boolean; data?: T; error?: string }> {
  if (!supabaseConfigurado) return { ok: false, error: 'supabase_no_configurado' };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${funcion}`, {
      method: 'POST',
      headers: cabeceras(),
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      const texto = await res.text().catch(() => '');
      console.error(`[supabase] rpc ${funcion}`, res.status, texto.slice(0, 300));
      return { ok: false, error: `http_${res.status}` };
    }
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (error) {
    console.error(`[supabase] rpc ${funcion}`, error);
    return { ok: false, error: 'red' };
  }
}

export async function contarSugerenciasPendientes(): Promise<number> {
  if (!supabaseConfigurado) return 0;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/sugerencias?select=id&estado=eq.pendiente`,
      {
        headers: cabeceras({ prefer: 'count=exact', range: '0-0' }),
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) return 0;
    const rango = res.headers.get('content-range') || '';
    const total = Number(rango.split('/')[1]);
    return Number.isFinite(total) ? total : 0;
  } catch {
    return 0;
  }
}
