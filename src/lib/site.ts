export const SITE = {
  name: import.meta.env.PUBLIC_SITE_NAME || 'Diccionario IA',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://diccionario.ajedrezpremium.com').replace(/\/$/, ''),
  description:
    '150 términos de inteligencia artificial explicados en español, con ejemplos reales de negocio. Glosario práctico para pymes y profesionales que no programan.',
  locale: 'es_ES',
  lang: 'es',
  author: 'Chess AI Agency',
  agency: 'Chess AI Agency',
  agencyUrl: 'https://agency.ajedrezpremium.com',
  email: 'chessagencyai@gmail.com',
  version: 'v10',
  edition: '10',
  year: 2026,
  updated: '2026-11-22',
  pdf: '/libro/guia-rapida-ia-20-terminos.pdf',
  pdfCompleto: '/libro/diccionario-ia.pdf',
  amazon: 'https://www.amazon.es/s?k=Diccionario+de+IA+para+tu+negocio',
} as const;

export const NAV = [
  { href: '/terminos', label: 'Términos' },
  { href: '/categorias', label: 'Categorías' },
  { href: '/indice', label: 'Índice A-Z' },
  { href: '/libro', label: 'Libro' },
  { href: '/sobre', label: 'Sobre' },
] as const;

export function urlAbsoluta(path: string): string {
  return new URL(path, SITE.url).toString();
}
