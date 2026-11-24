import fs from 'node:fs';
let raw = fs.readFileSync('.env', 'utf8');
console.log('len', raw.length, 'first chars', JSON.stringify(raw.slice(0, 80)));
const env = {};
for (const l of raw.split(/\r?\n/)) {
  const m = l.replace(/^\uFEFF/, '').match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
}
console.log('keys', Object.keys(env).length, Object.keys(env).slice(0, 12));
console.log('has URL', Boolean(env.SUPABASE_URL), 'has KEY', Boolean(env.SUPABASE_SERVICE_ROLE_KEY));
