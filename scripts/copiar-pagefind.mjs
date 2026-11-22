import fs from 'node:fs';
import path from 'node:path';

const origen = path.join(process.cwd(), 'dist', 'pagefind');
const destino = path.join(process.cwd(), '.vercel', 'output', 'static', 'pagefind');

if (!fs.existsSync(origen)) {
  console.log('⚠ dist/pagefind no existe; nada que copiar.');
  process.exit(0);
}

if (!fs.existsSync(path.dirname(destino))) {
  console.log('⚠ .vercel/output/static no existe (build local); se omite la copia.');
  process.exit(0);
}

fs.mkdirSync(destino, { recursive: true });
for (const archivo of fs.readdirSync(origen)) {
  const src = path.join(origen, archivo);
  const dst = path.join(destino, archivo);
  if (fs.statSync(src).isDirectory()) {
    fs.cpSync(src, dst, { recursive: true, force: true });
  } else {
    fs.copyFileSync(src, dst);
  }
}
console.log('✅ pagefind copiado a .vercel/output/static/pagefind/');
