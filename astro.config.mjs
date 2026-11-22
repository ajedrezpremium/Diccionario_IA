import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';
import rehypeEnlazarTerminos from './src/lib/rehype-enlazar.mjs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site =
  process.env.PUBLIC_SITE_URL ||
  env.PUBLIC_SITE_URL ||
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
