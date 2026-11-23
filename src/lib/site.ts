export const SITE = {
  name: import.meta.env.PUBLIC_SITE_NAME || 'Diccionario IA',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://diccionario-ia.vercel.app').replace(/\/$/, ''),
  description:
    '100 términos de inteligencia artificial explicados en español, con ejemplos reales de negocio. Glosario práctico para pymes y profesionales que no programan.',
  locale: 'es_ES',
  lang: 'es',
  author: 'Chess AI Agency',
  agency: 'Chess AI Agency',
  agencyUrl: 'https://chessaiagency.com',
  email: 'hola@chessaiagency.com',
  version: 'v10',
  edition: '10',
  year: 2026,
  updated: '2026-11-22',
  pdf: '/libro/diccionario-ia.pdf',
} as const;

export const NAV = [
  { href: '/terminos', label: 'Términos' },
  { href: '/categorias', label: 'Categorías' },
  { href: '/indice', label: 'Índice A-Z' },
  { href: '/libro', label: 'Libro gratis' },
  { href: '/sobre', label: 'Sobre' },
] as const;

export function urlAbsoluta(path: string): string {
  return new URL(path, SITE.url).toString();
}
