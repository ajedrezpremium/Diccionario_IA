import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { readFileSync } from 'node:fs';
import rehypeEnlazarTerminos from './src/lib/rehype-enlazar.mjs';

function leerEnv(clave) {
  try {
    const texto = readFileSync('.env', 'utf8');
    const m = texto.match(new RegExp(`^${clave}=\"?(.*?)\"?$`, 'm'));
    return m ? m[1].trim() : '';
  } catch {
    return '';
  }
}

const site =
  process.env.PUBLIC_SITE_URL ||
  leerEnv('PUBLIC_SITE_URL') ||
  'https://diccionario-ia.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel({
    maxDuration: 30,
    imageService: false,
  }),
  markdown: {
    rehypePlugins: [rehypeEnlazarTerminos],
  },
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
