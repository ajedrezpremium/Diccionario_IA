import fs from 'node:fs';
import path from 'node:path';

const RAIZ = process.cwd();
const modulos = [
  '01-fundamentos.mjs','02-modelos.mjs','03-agentes.mjs','04-herramientas.mjs',
  '05-datos.mjs','06-prompting.mjs','07-seguridad.mjs','08-negocio.mjs',
  '09-extra.mjs', '10-nuevos.mjs', '11-final.mjs',
];
const terminos = [];
for (const m of modulos) {
  const ruta = path.join(RAIZ, 'scripts', 'contenido', m);
  if (!fs.existsSync(ruta)) continue;
  const { default: lote } = await import(`file://${ruta}`);
  terminos.push(...lote);
}

const normalizar = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const fichas = terminos.map((t) => {
  const texto = [
    `Definición: ${t.def}`,
    `En qué consiste: ${t.p1} ${t.p2}`,
    `Analogía: ${t.analogia}`,
    `Ejemplo de negocio: ${t.ejemplo}`,
    `Aplicación: ${t.negocio}`,
    `Errores frecuentes: ${t.errores}`,
    ...(t.faq ?? []).map(([p, r]) => `Pregunta: ${p} Respuesta: ${r}`),
  ].join('\n');
  return {
    slug: t.slug,
    termino: t.t,
    categoria: t.cat,
 texto,
    textoNorm: normalizar(texto),
  };
});

fs.mkdirSync(path.join(RAIZ, 'src', 'data'), { recursive: true });
const salida = path.join(RAIZ, 'src', 'data', 'rag-fichas.json');
fs.writeFileSync(salida, JSON.stringify(fichas), 'utf8');
console.log(`✅ Corpus RAG generado: src/data/rag-fichas.json (${fichas.length} fichas, ${(fs.statSync(salida).size / 1024).toFixed(0)} KB)`);
