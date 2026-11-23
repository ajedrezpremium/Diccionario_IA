import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { readFileSync } from 'node:fs';
import rehypeEnlazarTerminos from './src/lib/rehype-enlazar.mjs';
import { execSync } from 'node:child_process';

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
  'https://diccionario.ajedrezpremium.com';

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
  integrations: [
    {
      name: 'pagefind',
      hooks: {
        'astro:build:done': () => {
          execSync(`npx pagefind --site "${process.cwd()}/dist"`, { stdio: 'inherit' });
        },
      },
    },
  ],
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
