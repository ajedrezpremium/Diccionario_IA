import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() || 'https://diccionario.ajedrezpremium.com').replace(/\/$/, '');
  const cuerpo = `# Diccionario IA — robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /buscar?

# Rastreadores de IA: permitimos el acceso al contenido público.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${base}/sitemap.xml
`;
  return new Response(cuerpo, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
