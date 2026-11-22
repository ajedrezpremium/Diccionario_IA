import fs from 'node:fs';
import path from 'node:path';

const RAIZ = process.cwd();
const DIR_CONTENIDO = path.join(RAIZ, 'src', 'content', 'terminos');
const DIR_DATOS = path.join(RAIZ, 'src', 'data');
const FECHA = '2026-11-22';

const modulos = [
  '01-fundamentos.mjs',
  '02-modelos.mjs',
  '03-agentes.mjs',
  '04-herramientas.mjs',
  '05-datos.mjs',
  '06-prompting.mjs',
  '07-seguridad.mjs',
  '08-negocio.mjs',
];

const terminos = [];
for (const modulo of modulos) {
  const { default: lote } = await import(`./contenido/${modulo}`);
  terminos.push(...lote);
}

// ---------- Utilidades ----------
const recortar = (texto, max) => {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const ultimoPunto = corte.lastIndexOf('. ');
  if (ultimoPunto > 100) return corte.slice(0, ultimoPunto + 1);
  const ultimoEspacio = corte.lastIndexOf(' ');
  return `${corte.slice(0, ultimoEspacio > 0 ? ultimoEspacio : max - 1).trim()}.`;
};

const normalizarDefinicion = (texto) => {
  let t = texto.trim().replace(/\s+/g, ' ');
  if (t.length < 100) t = `${t} Explicado en lenguaje claro para pymes.`;
  if (t.length < 100) t = `${t} Sin jerga innecesaria.`;
  if (t.length > 175) t = recortar(t, 175);
  if (!/[.!?]$/.test(t)) t = `${t}.`;
  return t;
};

const metaDescripcion = (def) => {
  let t = def;
  if (t.length > 165) t = recortar(t, 165);
  if (t.length < 120) t = `${t} Explicado para pymes.`;
  if (!/[.!?]$/.test(t)) t = `${t}.`;
  return t;
};

const metaTitulo = (t) => {
  const largo = `Qué es ${t} en IA: guía para pymes`;
  return largo.length <= 65 ? largo : `Qué es ${t} en IA`;
};

const yaml = (valor) => JSON.stringify(valor);

const escapar = (texto) => texto.replace(/\r/g, '').trim();

// ---------- Validación básica ----------
const errores = [];
const slugs = new Set();
const porSlug = new Map();

for (const t of terminos) {
  if (!t.slug) errores.push(`Término sin slug: ${t.t}`);
  if (slugs.has(t.slug)) errores.push(`Slug duplicado: ${t.slug}`);
  slugs.add(t.slug);
  porSlug.set(t.slug, t);
}

const porCategoria = new Map();
for (const t of terminos) {
  if (!porCategoria.has(t.cat)) porCategoria.set(t.cat, []);
  porCategoria.get(t.cat).push(t);
}

const relacionadosValidos = (t) => {
  const lista = [...new Set((t.rel ?? []).filter((s) => s !== t.slug && porSlug.has(s)))];
  if (lista.length >= 2) return lista.slice(0, 6);
  const mismaCategoria = (porCategoria.get(t.cat) ?? [])
    .map((x) => x.slug)
    .filter((s) => s !== t.slug && !lista.includes(s));
  return [...lista, ...mismaCategoria].slice(0, Math.max(2, lista.length)).slice(0, 6);
};

if (terminos.length !== 100) {
  errores.push(`Se esperaban 100 términos y hay ${terminos.length}.`);
}

if (errores.length) {
  console.error('❌ Errores de contenido:');
  for (const e of errores) console.error(` - ${e}`);
  process.exit(1);
}

// ---------- Generación ----------
fs.mkdirSync(DIR_CONTENIDO, { recursive: true });
fs.mkdirSync(DIR_DATOS, { recursive: true });

const indice = [];

for (const t of terminos) {
  const definicion = normalizarDefinicion(t.def);
  const relacionados = relacionadosValidos(t);
  if (relacionados.length < 2) {
    errores.push(`Sin relacionados suficientes: ${t.slug}`);
  }

  const faq = (t.faq ?? []).slice(0, 5);
  if (faq.length < 2) errores.push(`FAQ insuficiente: ${t.slug}`);

  const frontmatter = [
    '---',
    `termino: ${yaml(t.t)}`,
    `nombreCompleto: ${yaml(t.full)}`,
    `slug: ${yaml(t.slug)}`,
    `categoria: ${yaml(t.cat)}`,
    `nivel: ${yaml(t.nivel)}`,
    `definicionCorta: ${yaml(definicion)}`,
    `sinonimos: [${(t.sin ?? []).map(yaml).join(', ')}]`,
    `relacionados: [${relacionados.map(yaml).join(', ')}]`,
    `metaTitulo: ${yaml(metaTitulo(t.t))}`,
    `metaDescripcion: ${yaml(metaDescripcion(definicion))}`,
    `actualizado: ${FECHA}`,
    `destacado: ${t.destacado ? 'true' : 'false'}`,
    'faq:',
    ...faq.flatMap(([p, r]) => [`  - p: ${yaml(p)}`, `    r: ${yaml(r)}`]),
    '---',
    '',
  ].join('\n');

  const cuerpo = [
    '## En qué consiste',
    '',
    escapar(t.p1),
    '',
    escapar(t.p2),
    '',
    '## Una analogía para entenderlo',
    '',
    `> ${escapar(t.analogia)}`,
    '',
    '## Ejemplo real de negocio',
    '',
    escapar(t.ejemplo),
    '',
    '## Cómo aplicarlo en tu pyme',
    '',
    escapar(t.negocio),
    '',
    '## Errores frecuentes',
    '',
    escapar(t.errores),
    '',
  ].join('\n');

  fs.writeFileSync(path.join(DIR_CONTENIDO, `${t.slug}.md`), `${frontmatter}\n${cuerpo}`, 'utf8');

  indice.push({
    termino: t.t,
    slug: t.slug,
    categoria: t.cat,
    nivel: t.nivel,
    definicionCorta: definicion,
    alias: [...new Set([t.full, ...(t.sin ?? [])])].filter(Boolean),
    destacado: Boolean(t.destacado),
  });
}

fs.writeFileSync(
  path.join(DIR_DATOS, 'indice-terminos.json'),
  `${JSON.stringify(indice, null, 2)}\n`,
  'utf8',
);

console.log(`✅ ${indice.length} fichas generadas en src/content/terminos/`);
console.log(`✅ Índice de búsqueda: src/data/indice-terminos.json`);
for (const [cat, lista] of porCategoria) {
  console.log(`   ${cat}: ${lista.length}`);
}
