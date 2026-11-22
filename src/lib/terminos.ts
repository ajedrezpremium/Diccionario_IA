import indice from '../data/indice-terminos.json';
import type { CategoriaSlug } from './categorias';
import { ORDEN_CATEGORIAS } from './categorias';

export interface TerminoIndice {
  termino: string;
  slug: string;
  categoria: CategoriaSlug;
  nivel: 'basico' | 'intermedio' | 'avanzado';
  definicionCorta: string;
  alias: string[];
  destacado: boolean;
}

export const TERMINOS = (indice as TerminoIndice[]).slice().sort((a, b) =>
  a.termino.localeCompare(b.termino, 'es'),
);

export const TOTAL_TERMINOS = TERMINOS.length;

export const POR_SLUG = new Map(TERMINOS.map((t) => [t.slug, t]));

export const DESTACADOS = TERMINOS.filter((t) => t.destacado);

export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function terminosDeCategoria(categoria: CategoriaSlug): TerminoIndice[] {
  return TERMINOS.filter((t) => t.categoria === categoria);
}

export function contarPorCategoria(): Record<CategoriaSlug, number> {
  const base = Object.fromEntries(ORDEN_CATEGORIAS.map((c) => [c, 0])) as Record<
    CategoriaSlug,
    number
  >;
  for (const t of TERMINOS) base[t.categoria] += 1;
  return base;
}

export function buscarTerminos(consulta: string, limite = 10): TerminoIndice[] {
  const q = normalizar(consulta);
  if (!q) return [];
  const palabras = q.split(/\s+/).filter(Boolean);

  const puntuar = (t: TerminoIndice) => {
    const nombre = normalizar(t.termino);
    const completo = normalizar(t.alias.join(' '));
    const def = normalizar(t.definicionCorta);
    let puntos = 0;
    if (nombre === q) puntos += 100;
    if (nombre.startsWith(q)) puntos += 60;
    if (nombre.includes(q)) puntos += 35;
    if (completo.includes(q)) puntos += 20;
    if (def.includes(q)) puntos += 10;
    for (const p of palabras) {
      if (nombre.includes(p)) puntos += 8;
      if (completo.includes(p)) puntos += 4;
      if (def.includes(p)) puntos += 2;
    }
    return puntos;
  };

  return TERMINOS.map((t) => ({ t, p: puntuar(t) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p || a.t.termino.localeCompare(b.t.termino, 'es'))
    .slice(0, limite)
    .map((x) => x.t);
}

export function letraDe(termino: string): string {
  const n = normalizar(termino);
  const c = n.charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

export const LETRAS = Array.from(
  new Set(TERMINOS.map((t) => letraDe(t.termino))),
).sort((a, b) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b, 'es')));

export function terminosPorLetra(letra: string): TerminoIndice[] {
  return TERMINOS.filter((t) => letraDe(t.termino) === letra.toUpperCase());
}

export function agruparPorLetra(): Array<[string, TerminoIndice[]]> {
  return LETRAS.map((letra) => [letra, terminosPorLetra(letra)]);
}

export function vecinos(slug: string): { anterior?: TerminoIndice; siguiente?: TerminoIndice } {
  const i = TERMINOS.findIndex((t) => t.slug === slug);
  if (i === -1) return {};
  return { anterior: TERMINOS[i - 1], siguiente: TERMINOS[i + 1] };
}
