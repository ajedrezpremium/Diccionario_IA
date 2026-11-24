import fs from 'node:fs';
const env = {};
for (const l of fs.readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = l.replace(/^\uFEFF/, '').match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
}
const url = env.SUPABASE_URL?.replace(/\/$/, '');
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
if (!url || !key) { console.log('sin credenciales'); process.exit(0); }
const headers = { apikey: key, authorization: `Bearer ${key}` };
for (const tabla of ['leads', 'diagnosticos']) {
  const r = await fetch(`${url}/rest/v1/${tabla}?select=*&order=creado_en.desc&limit=100`, { headers });
  const txt = await r.text();
  console.log('===', tabla, 'status', r.status, '===');
  if (!r.ok) { console.log(txt.slice(0, 300)); continue; }
  const rows = JSON.parse(txt);
  console.log('filas:', rows.length);
  for (const x of rows.slice(0, 10)) {
    const e = String(x.email || '');
    console.log(' -', e.slice(0,2) + '***' + e.slice(e.indexOf('@')), '| origen:', x.origen, '|', x.creado_en);
  }
}
