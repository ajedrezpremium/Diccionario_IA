import fs from 'node:fs';
import path from 'node:path';

const RUTA_INDICE = path.resolve(process.cwd(), 'src/data/indice-terminos.json');

let cache = null;
let cacheMtime = 0;

function cargarIndice() {
  try {
    if (!fs.existsSync(RUTA_INDICE)) return [];
    const mtime = fs.statSync(RUTA_INDICE).mtimeMs;
    if (cache && mtime === cacheMtime) return cache;
    cache = JSON.parse(fs.readFileSync(RUTA_INDICE, 'utf8'));
    cacheMtime = mtime;
    return cache;
  } catch {
    return [];
  }
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slugActual(file) {
  const p = file?.path || file?.history?.[0] || '';
  const m = String(p).replace(/\\/g, '/').match(/terminos\/([^/]+)\.md$/);
  return m ? m[1] : null;
}

const ETIQUETAS_IGNORADAS = new Set([
  'a',
  'code',
  'pre',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'script',
  'style',
  'textarea',
  'button',
  'abbr',
]);

/**
 * Convierte la primera mención de cada término del glosario en un enlace interno.
 * - Nunca enlaza el término de la propia ficha.
 * - No enlaza dentro de títulos, código ni enlaces existentes.
 * - Una sola vez por término y página.
 */
export default function rehypeEnlazarTerminos() {
  return (tree, file) => {
    const indice = cargarIndice();
    if (!Array.isArray(indice) || indice.length === 0) return;

    const self = slugActual(file);
    const alias = [];
    const vistos = new Set();

    for (const t of indice) {
      if (!t?.slug || t.slug === self) continue;
      const nombres = new Set([t.termino, ...(Array.isArray(t.alias) ? t.alias : [])]);
      for (const nombre of nombres) {
        if (!nombre || String(nombre).length < 2) continue;
        const clave = `${t.slug}::${String(nombre).toLowerCase()}`;
        if (vistos.has(clave)) continue;
        vistos.add(clave);
        alias.push({ texto: String(nombre), slug: t.slug });
      }
    }

    alias.sort((a, b) => b.texto.length - a.texto.length);

    const enlazados = new Set();

    const crearEnlace = (texto, slug) => ({
      type: 'element',
      tagName: 'a',
      properties: { href: `/que-es/${slug}`, className: ['enlace-glosario'] },
      children: [{ type: 'text', value: texto }],
    });

    const enlazarTexto = (valor) => {
      const salida = [];
      let resto = valor;
      let vueltas = 0;

      while (resto && vueltas < 14) {
        vueltas += 1;
        let mejor = null;

        for (const a of alias) {
          if (enlazados.has(a.slug)) continue;
          const re = new RegExp(
            `(?<![\\p{L}\\p{N}])${escaparRegex(a.texto)}(?![\\p{L}\\p{N}])`,
            'iu',
          );
          const m = re.exec(resto);
          if (!m) continue;
          if (
            !mejor ||
            m.index < mejor.indice ||
            (m.index === mejor.indice && m[0].length > mejor.texto.length)
          ) {
            mejor = { ...a, indice: m.index, texto: m[0] };
          }
        }

        if (!mejor) break;
        if (mejor.indice > 0) {
          salida.push({ type: 'text', value: resto.slice(0, mejor.indice) });
        }
        salida.push(crearEnlace(mejor.texto, mejor.slug));
        enlazados.add(mejor.slug);
        resto = resto.slice(mejor.indice + mejor.texto.length);
      }

      if (resto) salida.push({ type: 'text', value: resto });
      return salida;
    };

    const recorrer = (nodo) => {
      if (!nodo || !Array.isArray(nodo.children)) return;

      for (let i = 0; i < nodo.children.length; i += 1) {
        const hijo = nodo.children[i];

        if (hijo.type === 'element') {
          if (!ETIQUETAS_IGNORADAS.has(hijo.tagName)) recorrer(hijo);
          continue;
        }

        if (hijo.type === 'text' && typeof hijo.value === 'string' && hijo.value.length > 2) {
          const partes = enlazarTexto(hijo.value);
          if (partes.length > 1) {
            nodo.children.splice(i, 1, ...partes);
            i += partes.length - 1;
          }
        }
      }
    };

    recorrer(tree);
  };
}
