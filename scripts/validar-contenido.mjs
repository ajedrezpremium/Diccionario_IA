import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'src', 'content', 'terminos');
const INDICE = path.join(process.cwd(), 'src', 'data', 'indice-terminos.json');

const CATEGORIAS = [
  'fundamentos',
  'modelos',
  'agentes',
  'herramientas-desarrollo',
  'datos-y-conocimiento',
  'prompting',
  'seguridad-y-etica',
  'negocio',
];
const NIVELES = ['basico', 'intermedio', 'avanzado'];
const SECCIONES = [
  '## En qué consiste',
  '## Una analogía para entenderlo',
  '## Ejemplo real de negocio',
  '## Cómo aplicarlo en tu pyme',
  '## Errores frecuentes',
];

const errores = [];
const avisos = [];
const slugs = new Set();
const categorias = Object.fromEntries(CATEGORIAS.map((c) => [c, 0]));

if (!fs.existsSync(DIR)) {
  console.error('❌ No existe src/content/terminos. Ejecuta npm run contenido.');
  process.exit(1);
}

const ficheros = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));

for (const fichero of ficheros) {
  const ruta = path.join(DIR, fichero);
  const { data, content } = matter(fs.readFileSync(ruta, 'utf8'));
  const donde = `[${fichero}]`;

  if (!data.slug) errores.push(`${donde} sin slug`);
  else if (slugs.has(data.slug)) errores.push(`${donde} slug duplicado: ${data.slug}`);
  else slugs.add(data.slug);

  if (!CATEGORIAS.includes(data.categoria)) errores.push(`${donde} categoría inválida: ${data.categoria}`);
  else categorias[data.categoria] += 1;

  if (!NIVELES.includes(data.nivel)) errores.push(`${donde} nivel inválido: ${data.nivel}`);

  const largoDef = (data.definicionCorta ?? '').length;
  if (largoDef < 100 || largoDef > 175) {
    errores.push(`${donde} definicionCorta tiene ${largoDef} caracteres (100-175)`);
  }

  const largoMeta = (data.metaTitulo ?? '').length;
  if (largoMeta < 10 || largoMeta > 65) {
    errores.push(`${donde} metaTitulo tiene ${largoMeta} caracteres (máx. 65)`);
  }

  const largoDesc = (data.metaDescripcion ?? '').length;
  if (largoDesc < 120 || largoDesc > 165) {
    errores.push(`${donde} metaDescripcion tiene ${largoDesc} caracteres (120-165)`);
  }

  if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.length > 5) {
    errores.push(`${donde} debe tener entre 2 y 5 preguntas frecuentes`);
  } else {
    for (const [i, item] of data.faq.entries()) {
      if (!item?.p || !item?.r) errores.push(`${donde} FAQ ${i + 1} incompleta`);
    }
  }

  if (!Array.isArray(data.relacionados) || data.relacionados.length < 2) {
    errores.push(`${donde} necesita al menos 2 términos relacionados`);
  }

  for (const seccion of SECCIONES) {
    if (!content.includes(seccion)) avisos.push(`${donde} falta la sección «${seccion}»`);
  }

  if ((data.sinonimos ?? []).some((s) => typeof s !== 'string' || !s.trim())) {
    errores.push(`${donde} sinónimos inválidos`);
  }
}

// Relacionados que no existen
for (const fichero of ficheros) {
  const { data } = matter(fs.readFileSync(path.join(DIR, fichero), 'utf8'));
  for (const rel of data.relacionados ?? []) {
    if (!slugs.has(rel)) errores.push(`[${fichero}] relacionado inexistente: ${rel}`);
  }
}

// Índice de búsqueda
if (!fs.existsSync(INDICE)) {
  errores.push('No existe src/data/indice-terminos.json. Ejecuta npm run contenido.');
} else {
  const indice = JSON.parse(fs.readFileSync(INDICE, 'utf8'));
  if (indice.length !== ficheros.length) {
    errores.push(`El índice tiene ${indice.length} entradas y hay ${ficheros.length} fichas.`);
  }
  for (const item of indice) {
    if (!slugs.has(item.slug)) errores.push(`El índice incluye un slug inexistente: ${item.slug}`);
  }
}

if (ficheros.length !== 120) {
  errores.push(`Se esperaban 120 fichas y hay ${ficheros.length}.`);
}

console.log(`Fichas revisadas: ${ficheros.length}`);
for (const [cat, n] of Object.entries(categorias)) console.log(`  ${cat}: ${n}`);

if (avisos.length) {
  console.log(`\nAvisos (${avisos.length}):`);
  for (const a of avisos.slice(0, 20)) console.log(`  - ${a}`);
}

if (errores.length) {
  console.error(`\n❌ ${errores.length} errores:`);
  for (const e of errores) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('\n✅ Contenido válido.');
