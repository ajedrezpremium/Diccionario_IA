import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ORDEN_CATEGORIAS } from '../lib/categorias';
import { LETRAS } from '../lib/terminos';
import { SITE } from '../lib/site';

const escapeXml = (texto: string) =>
  texto.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c] as string);

export const GET: APIRoute = async () => {
  const terminos = await getCollection('terminos');
  const base = SITE.url;
  const hoy = new Date().toISOString().slice(0, 10);

  const estaticas = [
    { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
    { ruta: '/terminos', prioridad: '0.9', frecuencia: 'weekly' },
    { ruta: '/categorias', prioridad: '0.8', frecuencia: 'monthly' },
    { ruta: '/indice', prioridad: '0.7', frecuencia: 'monthly' },
    { ruta: '/libro', prioridad: '0.9', frecuencia: 'monthly' },
    { ruta: '/sobre', prioridad: '0.5', frecuencia: 'yearly' },
    { ruta: '/privacidad', prioridad: '0.2', frecuencia: 'yearly' },
    { ruta: '/aviso-legal', prioridad: '0.2', frecuencia: 'yearly' },
  ];

  const urls = [
    ...estaticas.map(
      (e) => `  <url>
    <loc>${base}${e.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${e.frecuencia}</changefreq>
    <priority>${e.prioridad}</priority>
  </url>`,
    ),
    ...terminos.map((t) => {
      const fecha = (t.data.actualizado instanceof Date ? t.data.actualizado : new Date(t.data.actualizado))
        .toISOString()
        .slice(0, 10);
      return `  <url>
    <loc>${base}/que-es/${t.data.slug}</loc>
    <lastmod>${fecha}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
    ...ORDEN_CATEGORIAS.map(
      (c) => `  <url>
    <loc>${base}/categorias/${c}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    ),
    ...LETRAS.map(
      (l) => `  <url>
    <loc>${base}/a-z/${encodeURIComponent(l.toLowerCase())}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(escapeXml(xml), {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
