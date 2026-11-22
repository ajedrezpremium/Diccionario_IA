/**
 * Comprueba que las claves del .env funcionan, sin imprimir su valor.
 * Uso: npm run claves
 */
const ok = (msg) => console.log(`  ✓ ${msg}`);
const mal = (msg) => console.log(`  ✗ ${msg}`);
const info = (msg) => console.log(`  · ${msg}`);

async function conTimeout(url, opciones = {}, ms = 12000) {
  return fetch(url, { ...opciones, signal: AbortSignal.timeout(ms) });
}

async function probarGroq() {
  console.log('\nGroq');
  const clave = process.env.GROQ_API_KEY;
  if (!clave) return info('Sin clave configurada (opcional si usas OpenRouter).');
  try {
    const res = await conTimeout('https://api.groq.com/openai/v1/models', {
      headers: { authorization: `Bearer ${clave}` },
    });
    if (!res.ok) return mal(`La API responde ${res.status}. Revisa la clave.`);
    const data = await res.json();
    const modelos = (data.data || []).map((m) => m.id);
    const elegido = process.env.AI_MODEL || 'llama-3.3-70b-versatile';
    if (modelos.includes(elegido)) ok(`Clave válida. Modelo disponible: ${elegido}`);
    else {
      ok('Clave válida, pero el modelo configurado no aparece.');
      info(`Modelos de ejemplo: ${modelos.slice(0, 5).join(', ')}`);
    }
  } catch (error) {
    mal(`No se pudo conectar: ${error.message}`);
  }
}

async function probarOpenRouter() {
  console.log('\nOpenRouter');
  const clave = process.env.OPENROUTER_API_KEY;
  if (!clave) return info('Sin clave configurada (opcional si usas Groq).');
  try {
    const res = await conTimeout('https://openrouter.ai/api/v1/key', {
      headers: { authorization: `Bearer ${clave}` },
    });
    if (!res.ok) return mal(`La API responde ${res.status}. Revisa la clave.`);
    const data = await res.json();
    const limite = data?.data?.limit;
    ok(`Clave válida.${limite === null ? ' Sin límite de crédito configurado.' : ` Límite: ${limite}.`}`);
  } catch (error) {
    mal(`No se pudo conectar: ${error.message}`);
  }
}

async function probarSupabase() {
  console.log('\nSupabase');
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) return info('Sin configurar todavía (necesario para leads y rate limit).');
  try {
    const res = await conTimeout(`${url.replace(/\/$/, '')}/rest/v1/`, {
      headers: { apikey: clave, authorization: `Bearer ${clave}` },
    });
    if (res.ok) ok('Conexión correcta con la API REST.');
    else mal(`La API responde ${res.status}. Revisa URL y service role key.`);
  } catch (error) {
    mal(`No se pudo conectar: ${error.message}`);
  }
}

function probarGmail() {
  console.log('\nGmail');
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    ok(`Configurado para ${process.env.GMAIL_USER}.`);
    info('El envío real solo se puede verificar pidiendo el libro desde la web.');
  } else {
    info('Sin configurar. Gmail necesita usuario + contraseña de aplicación (no una API key).');
  }
}

console.log('Comprobación de claves — Diccionario IA');
await probarGroq();
await probarOpenRouter();
await probarSupabase();
probarGmail();
console.log('\nFin. Ninguna clave se ha mostrado en pantalla.\n');
