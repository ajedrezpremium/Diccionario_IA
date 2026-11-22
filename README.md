# Diccionario IA

Glosario de **100 términos de inteligencia artificial en español** para pymes, autónomos y profesionales que no programan. Incluye agente conversacional, buscador instantáneo, libro en PDF y captación de leads.

- **Web:** https://diccionario-ia.vercel.app
- **Repositorio:** https://github.com/ajedrezpremium/Diccionario_IA
- **Edición:** v10 · 2026

## Stack

| Pieza | Tecnología |
| --- | --- |
| Framework | Astro 6 (salida estática + rutas API serverless) |
| Estilos | Tailwind CSS 4 vía PostCSS |
| Contenido | Content Collections (Markdown + Zod) |
| Búsqueda | Índice propio en cliente + Pagefind en producción |
| Agente | Groq u OpenRouter (API compatible con OpenAI) |
| Datos | Supabase por REST (`leads`, `sugerencias`, `rate_limits`) |
| Email | Gmail SMTP con contraseña de aplicación (nodemailer) |
| PDF | pdfkit, generado en build |
| Open Graph | sharp, 102 imágenes generadas en build |
| Despliegue | Vercel + GitHub Actions |

## Arranque local

Requisitos: **Node 22.12+** y npm.

```bash
npm install
cp .env.example .env      # en Windows: copy .env.example .env
# rellena las claves en .env
npm run dev               # http://localhost:4321
```

Comprueba que las claves responden:

```bash
npm run claves
```

## Variables de entorno

Copia `.env.example` a `.env`. Nunca subas `.env` al repositorio.

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Sí | URL pública sin barra final. |
| `PUBLIC_SITE_NAME` | No | Nombre visible del sitio. |
| `AI_PROVIDER` | Sí | `groq` u `openrouter`. |
| `AI_MODEL` | Sí | Modelo exacto del proveedor. |
| `GROQ_API_KEY` | Según proveedor | Clave de Groq. |
| `OPENROUTER_API_KEY` | Según proveedor | Clave de OpenRouter. |
| `AI_MAX_TOKENS` | No | Máximo de tokens de salida (por defecto 700). |
| `AI_TEMPERATURE` | No | Creatividad, 0–1 (por defecto 0,4). |
| `RATE_LIMIT_PER_MIN` | No | Preguntas por minuto y visitante. |
| `RATE_LIMIT_PER_DAY` | No | Preguntas por día y visitante. |
| `SUPABASE_URL` | Para leads | URL del proyecto. |
| `SUPABASE_SECRET_KEY` | Para leads | Clave secreta (`sb_secret_...` o `service_role`). |
| `GMAIL_USER` | Para email | Cuenta de Gmail que envía. |
| `GMAIL_APP_PASSWORD` | Para email | Contraseña de aplicación de 16 caracteres. |
| `GMAIL_FROM_NAME` | No | Nombre del remitente. |
| `LEADS_NOTIFY_EMAIL` | No | Correo que recibe el aviso de cada lead. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | No | Activa analítica sin cookies. |
| `RATE_LIMIT_SALT` | Recomendada | Sal para el hash de IP. |

> **Groq:** usa `openai/gpt-oss-120b`. Los modelos de razonamiento necesitan `reasoning_effort: low` y un `max_tokens` suficiente; el código ya lo aplica.

## Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre **SQL Editor → New query**, pega `supabase/schema.sql` y ejecuta.
3. Copia en `.env`:
   - `SUPABASE_URL` desde **Project Settings → API**.
   - `SUPABASE_SECRET_KEY` (clave secreta; no la publiques).
4. Comprueba:

```bash
curl "$SUPABASE_URL/rest/v1/leads?select=id&limit=1" \
  -H "apikey: $SUPABASE_SECRET_KEY" \
  -H "Authorization: Bearer $SUPABASE_SECRET_KEY"
```

Debe devolver `[]` o una lista, nunca un error 404.

El esquema crea:

- `leads`: email único, consentimiento, origen, hash de IP, fechas.
- `sugerencias`: términos que el agente no encontró en el glosario.
- `rate_limits` + función `hit_rate_limit`: límite persistente entre invocaciones serverless.

Las tres tablas tienen **RLS activado sin políticas públicas**: solo la clave secreta puede acceder desde el servidor.

## Gmail

Gmail no tiene «API key». Necesitas una **contraseña de aplicación**:

1. Activa la verificación en dos pasos en la cuenta de Google.
2. Ve a **Seguridad → Contraseñas de aplicaciones**.
3. Crea una para «Correo» y copia los 16 caracteres en `GMAIL_APP_PASSWORD`.
4. Define `GMAIL_USER` y, si quieres recibir avisos, `LEADS_NOTIFY_EMAIL`.

Sin Gmail configurado, el lead se guarda igualmente y la web ofrece la descarga directa del PDF.

## Contenido

Las 100 fichas viven en `src/content/terminos/*.md`. Se generan desde los lotes de `scripts/contenido/`:

```bash
npm run contenido   # regenera las 100 fichas + src/data/indice-terminos.json
npm run validar     # comprueba longitudes, slugs, relacionados y FAQ
```

Para editar una ficha puedes hacerlo directamente en su `.md`. Si vuelves a ejecutar `npm run contenido`, se sobrescribe con el contenido del lote correspondiente: en ese caso edita también el lote.

Estructura de cada ficha: definición en una frase, explicación, analogía, ejemplo de negocio, aplicación práctica, errores frecuentes y preguntas frecuentes.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Valida contenido, genera OG y PDF, compila Astro e indexa con Pagefind. |
| `npm run preview` | Sirve `dist/` en local. |
| `npm run contenido` | Regenera fichas e índice desde los lotes. |
| `npm run validar` | Validación de contenido. |
| `npm run libro` | Genera `public/libro/diccionario-ia.pdf`. |
| `npm run og` | Genera las 102 imágenes Open Graph. |
| `npm run claves` | Prueba Groq/OpenRouter. |

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. En Vercel: **Add New → Project → Import Git Repository**.
3. Framework preset: **Astro**. Build: `npm run build`. Output: `dist`.
4. Añade las variables de entorno de `.env` en **Settings → Environment Variables**.
5. Deploy.

El adaptador `@astrojs/vercel` convierte `/api/agente`, `/api/lead` y `/api/sugerencias` en funciones serverless. El resto es estático y se sirve desde CDN.

Cada push a `main` despliega automáticamente. GitHub Actions ejecuta la validación y el build en cada PR.

## Estructura

```
src/
  components/        UI (buscador, agente, lead magnet, FAQ…)
  content/terminos/  100 fichas Markdown
  data/              índice de búsqueda y datos de empresa
  layouts/           Base con SEO, tema y JSON-LD
  lib/               categorías, SEO, formato, cliente Supabase…
  pages/             rutas públicas y API
  styles/            sistema de diseño Tailwind
scripts/
  contenido/         fuente de las 100 fichas
  generar-*.mjs      contenido, PDF y Open Graph
  validar-contenido.mjs
supabase/schema.sql  tablas, RLS y función de rate limit
```

## Seguridad

- `.env` está en `.gitignore`. No lo subas nunca.
- Rota cualquier clave que hayas pegado en un chat, un issue o un archivo público.
- El agente limita tamaño de mensaje, historial, origen y peticiones por IP.
- No se guardan conversaciones en la base de datos.
- Antes de publicar, completa los datos fiscales en `src/data/empresa.ts` y revisa las páginas legales.

## Licencia

Contenido y código propiedad de Chess AI Agency. Puedes citar fragmentos enlazando a la ficha original; no se permite la reproducción íntegra ni la venta sin permiso.
