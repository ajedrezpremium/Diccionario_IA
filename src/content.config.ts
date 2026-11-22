import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIAS = [
  'fundamentos',
  'modelos',
  'agentes',
  'herramientas-desarrollo',
  'datos-y-conocimiento',
  'prompting',
  'seguridad-y-etica',
  'negocio',
] as const;

const terminos = defineCollection({
  loader: glob({ base: './src/content/terminos', pattern: '**/*.md' }),
  schema: z.object({
    termino: z.string().min(2).max(60),
    nombreCompleto: z.string().min(2).max(120),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    categoria: z.enum(CATEGORIAS),
    nivel: z.enum(['basico', 'intermedio', 'avanzado']),
    definicionCorta: z.string().min(100).max(175),
    sinonimos: z.array(z.string()).default([]),
    relacionados: z.array(z.string()).min(2).max(6),
    metaTitulo: z.string().max(65),
    metaDescripcion: z.string().min(120).max(165),
    actualizado: z.coerce.date(),
    destacado: z.boolean().default(false),
    faq: z
      .array(z.object({ p: z.string().min(8), r: z.string().min(20) }))
      .min(2)
      .max(5),
  }),
});

export const collections = { terminos };
