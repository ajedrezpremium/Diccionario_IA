# Plan de mejora v2.0 — Diccionario IA

> Visión: pasar de un glosario estático con agente básico a una **plataforma de referencia en español sobre IA aplicada a pymes**, con un agente que consulta el propio glosario, captura leads cualificados y convierte visitantes en clientes.

Estado actual (v10): 100 fichas, agente con Groq/OpenRouter, buscador Pagefind, PDF, Supabase, Vercel. Lo que sigue es el roadmap para la v2.0.

---

## Fase 0 · Estabilización (1–2 semanas)

Objetivo: dejar el terreno firme antes de añadir funciones.

- [ ] **CI real**: mover `docs/ci.yml.example` a `.github/workflows/ci.yml` con un token de GitHub que tenga scope `workflow`, o configurarlo desde la UI.
- [ ] **Dominio propio**: añadir `diccionario.chessaiagency.com` (o similar) en Vercel + DNS, actualizar `PUBLIC_SITE_URL` y redesplegar. Impacto directo en SEO y marca.
- [ ] **Analítica**: activar Plausible (`PUBLIC_PLAUSIBLE_DOMAIN`) o Umami. Sin datos no hay decisiones.
- [ ] **Lighthouse ≥ 90** en home, ficha y libro: revisar imágenes (lazy loading), fuentes, CLS, accesibilidad de contrastes.
- [ ] **Tests mínimos**: añadir Vitest para `terminos.ts`, `seo.ts` y `sanearMensajes`. Al menos smoke tests del build.
- [ ] **Error tracking**: integrar Sentry o Vercel Analytics para capturar errores del agente y del lead.

---

## Fase 1 · Agente v2 (3–4 semanas)

Objetivo: pasar de un chatbot que recita a un agente que consulta, razona y actúa.

### 1.1 Tool calling real
- Implementar un bucle de herramientas en `llamarModelo`:
  - `buscar_termino(termino)` → devuelve definición, slug y relacionados del índice.
  - `registrar_sugerencia(termino, contexto)` → llama a `/api/sugerencias`.
  - `buscar_en_glosario(consulta)` → búsqueda semántica sobre las fichas.
- Manejar la respuesta de tool call de forma no streaming, ejecutar la herramienta y luego hacer una segunda llamada streaming con el resultado.
- Validar argumentos con Zod en el servidor (seguridad).

### 1.2 RAG sobre el propio glosario
- Generar embeddings de las 100 fichas en build (`scripts/generar-embeddings.mjs`) y guardarlos en `src/data/embeddings.json` o en Supabase (pgvector).
- El agente recupera las 3–5 fichas más relevantes antes de responder, en lugar de meter las 100 rutas en el prompt.
- Reduce tokens, mejora precisión y permite escalar a 500+ términos.

### 1.3 Memoria de sesión y feedback
- Guardar conversaciones en `localStorage` (ya hay historial en memoria; persistirlo).
- Botón de feedback 👍/👎 por respuesta, guardado en Supabase (`feedback_agente`).
- Usar el feedback para evaluar prompts y detectar regresiones.

### 1.4 Contexto avanzado
- Enviar la ficha actual completa (no solo la ruta) cuando el usuario está en `/que-es/[slug]`.
- Detectar el sector del usuario a partir de sus mensajes y adaptar ejemplos.
- Sugerir la siguiente pregunta basada en el término actual y los relacionados.

### 1.5 Multi-model routing (opcional)
- Modelo económico para clasificación/intención, modelo avanzado para razonamiento.
- Fallback a proveedor alternativo si falla el principal.

---

## Fase 2 · Contenido y SEO (2–3 semanas)

Objetivo: crecer de 100 a 200+ términos y captar tráfico long-tail.

- [ ] **Segunda oleada de términos** (100 más): casos de uso por sector, herramientas específicas (n8n, Make, Zapier, LangChain, LlamaIndex), métricas (latencia, throughput), roles (prompt designer, AI engineer).
- [ ] **Clusters de contenido**: cada categoría con una página pilar + fichas satélite + enlazado interno automático (ya existe `rehype-enlazar.mjs`; mejorar con anchor text variado).
- [ ] **Schema.org ampliado**: `FAQPage`, `HowTo` en fichas prácticas, `BreadcrumbList` (ya), `Article` con `datePublished`.
- [ ] **Sitemap con prioridades y lastmod** reales por ficha.
- [ ] **Redirecciones 301** si se cambia algún slug.
- [ ] **Open Graph dinámico por categoría** además de por término.
- [ ] **RSS feed** de términos nuevos para suscriptores.

---

## Fase 3 · Monetización activa (3–4 semanas)

Objetivo: convertir el tráfico en ingresos recurrentes.

- [ ] **Email marketing**: integrar Brevo o Kit en `/api/lead` (añadir contacto a lista + etiqueta por origen). Secuencia de 4 emails ya redactada en `MONETIZACION.md`.
- [ ] **Calendario**: enlace a Cal.com en el email de seguimiento y en la web.
- [ ] **Stripe**: checkout para el producto digital de 29–49 € (pack de prompts/plantillas) y para la membresía mensual.
- [ ] **Primer caso de éxito**: implantar un agente en un cliente real, medir antes/después, publicar como página y email.
- [ ] **Landing de servicios**: `/servicios` con la oferta en 3 tramos (piloto, implantación, mantenimiento), precios y formulario de diagnóstico.
- [ ] **Formación**: página `/formacion` con talleres y curso online, integración con Stripe.
- [ ] **Patrocinio**: sección «Patrocinadores» en home y newsletter, solo cuando haya ≥3.000 suscriptores.

---

## Fase 4 · UX y producto (2–3 semanas)

Objetivo: que la web sea una herramienta, no solo lectura.

- [ ] **Favoritos / guardar términos**: `localStorage` + sincronización opcional con cuenta.
- [ ] **Progreso de lectura**: marcar fichas leídas, barra de progreso en la ficha.
- [ ] **Búsqueda mejorada**: filtros por categoría y nivel en el buscador, resaltado de términos, sugerencias mientras escribes.
- [ ] **Modo offline (PWA)**: service worker para leer fichas sin conexión, instalable.
- [ ] **Compartir ficha**: botón de copiar enlace, compartir en RRSS (ya en el agente; extender a las fichas).
- [ ] **Tema**: mantener claro/oscuro, pero añadir opción «sepia» para lectura larga.
- [ ] **Accesibilidad**: navegación por teclado completa, ARIA en el agente, contraste AA en todos los componentes.

---

## Fase 5 · Calidad y observabilidad (continuo)

- [ ] **Evaluación del agente**: suite de 100 preguntas con rúbrica, ejecutada en CI para detectar regresiones de prompt.
- [ ] **Coste por conversación**: dashboard interno con tokens, latencia y errores (Supabase + Vercel Analytics).
- [ ] **Rate limit adaptativo**: bajar límites si el coste diario supera un umbral.
- [ ] **Backup de Supabase**: exportación semanal automática a GitHub o S3.
- [ ] **Documentación técnica**: `docs/ARCHITECTURE.md`, `docs/TOOLS.md`, `docs/PROMPTS.md` (versionados).
- [ ] **Changelog público**: página `/changelog` con cada edición.

---

## Fase 6 · Escala (cuando haya tracción)

- [ ] **Internacionalización**: inglés como segunda lengua (hreflang ya preparado).
- [ ] **White-label**: licencia del glosario para asociaciones y consultoras.
- [ ] **API pública**: endpoint de búsqueda y definiciones para integraciones.
- [ ] **Comunidad**: foro o Discord para pymes que aplican IA, moderado por la agencia.
- [ ] **Editorial**: convertir el libro en edición impresa (Amazon KDP) y en audiobook.

---

## Métricas de éxito de la v2.0

| Métrica | v1.0 (actual) | Objetivo v2.0 |
| --- | --- | --- |
| Términos publicados | 100 | 200+ |
| Visitas orgánicas/mes | por medir | 15.000+ |
| Leads (email)/mes | por medir | 300+ |
| Suscriptores newsletter | 0 | 3.000+ |
| Clientes de implantación | 0 | 3–5/mes |
| Ingreso recurrente (MRR) | 0 | 2.000–5.000 € |
| Lighthouse (home) | por medir | ≥90 |
| Tests automatizados | 0 | ≥50 |

---

## Prioridad de la primera semana

1. Activar analítica (Plausible) para tener datos.
2. Configurar dominio propio.
3. Integrar Brevo/Kit en el lead para que la secuencia empiece a funcionar.
4. Cerrar el primer cliente piloto y publicar el caso de éxito.

El resto se construye sobre esa base. Si quieres, empezamos por cualquiera de estos puntos y lo implemento directamente.