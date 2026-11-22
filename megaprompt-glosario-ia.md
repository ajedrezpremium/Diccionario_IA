# MEGAPROMPT — Glosario de IA en español (web + agente + libro digital)

> Pega este documento entero en Claude Code (o en tu agente de desarrollo) como prompt inicial del proyecto.
> Sustituye los campos `[ENTRE_CORCHETES]` antes de empezar.

---

## 1. ROL

Actúa como **arquitecto de software senior, especialista en SEO técnico y desarrollador full-stack**. Vas a construir, de principio a fin, una web pública de glosario de términos de inteligencia artificial en español. Trabaja por fases, valida cada fase antes de pasar a la siguiente y explica brevemente las decisiones importantes.

## 2. CONTEXTO Y OBJETIVO

- **Proyecto:** `[NOMBRE_PROYECTO]` (glosario de IA en español, práctico y pensado para no programadores).
- **Propietario:** Roberto Páramos, Founder & CEO de **Chess AI Agency**, que desarrolla e integra agentes IA permanentes (widget fijo abajo a la derecha) en webs dinámicas.
- **Dominio:** `[DOMINIO]`
- **Objetivo de negocio:** producto **público** para **posicionar en SEO** búsquedas del tipo "qué es X en IA" y **captar clientes** para Chess AI Agency (agentes IA para pymes).
- **Hueco de mercado:** casi todos los glosarios de IA están en inglés y orientados a perfiles técnicos. Aquí se explican en español, con ejemplos reales de negocio y sin jerga innecesaria, incluidos los términos de la era de los agentes (MCP, harness, skills, RAG…).
- **Público objetivo:** dueños de pymes, autónomos, profesionales, estudiantes y curiosos que no programan.
- **Idioma:** español de España, tono cercano, claro y preciso. Sin condescendencia.

### Resultado esperado (en 3 piezas)

1. **Web de glosario** con una ficha por término, buscador y SEO técnico impecable.
2. **Agente IA fijo** (widget abajo a la derecha) que explica cualquier término según el nivel del usuario y capta leads.
3. **Libro digital en PDF** generado automáticamente a partir de las fichas, usado como lead magnet.

---

## 3. STACK TECNOLÓGICO

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Astro** (última versión estable) | HTML estático, muy rápido, excelente para SEO |
| Contenido | **Astro Content Collections** + Markdown/MDX con esquema Zod | Fichas tipadas y validadas |
| Estilos | **Tailwind CSS** | Rapidez y consistencia |
| Interactividad | Islas de Astro con **Preact** o JS nativo | Mínimo JavaScript en cliente |
| Búsqueda | **Pagefind** (índice estático en build) | Sin servidor, rápido, en español |
| Agente (backend) | Endpoint serverless `/api/agente` | La API key NUNCA se expone en el cliente |
| Modelo del agente | API de Anthropic, modelo configurable por variable de entorno `ANTHROPIC_MODEL` | Cambiar de modelo sin tocar código |
| Despliegue | **Vercel** o **Cloudflare Pages** (elige uno y justifícalo) | Edge, HTTPS, previews |
| PDF del libro | Script de build (Node) que genera PDF desde las fichas | Lead magnet automático |
| Analítica | **Plausible** o **Umami** (sin cookies) | RGPD sencillo |

> Si ves una alternativa claramente mejor, propónla **antes** de implementarla y espera confirmación.

---

## 4. ESTRUCTURA DEL REPOSITORIO

```
/
├── src/
│   ├── content/
│   │   ├── config.ts              # esquema Zod de las fichas
│   │   └── terminos/              # una ficha .md por término
│   │       ├── api.md
│   │       ├── mcp.md
│   │       └── ...
│   ├── components/
│   │   ├── FichaTermino.astro
│   │   ├── Buscador.astro
│   │   ├── TerminosRelacionados.astro
│   │   ├── FAQ.astro
│   │   ├── CtaAgencia.astro
│   │   ├── LeadMagnet.astro
│   │   └── AgenteWidget.astro     # widget fijo abajo a la derecha
│   ├── layouts/Base.astro         # head SEO, JSON-LD, header, footer
│   ├── pages/
│   │   ├── index.astro            # home + buscador + índice A-Z
│   │   ├── que-es/[slug].astro    # ficha de cada término
│   │   ├── categorias/[cat].astro # listados por categoría
│   │   ├── a-z/[letra].astro      # índice alfabético
│   │   ├── libro.astro            # landing del lead magnet
│   │   ├── sobre.astro
│   │   ├── privacidad.astro
│   │   ├── sitemap.xml.ts
│   │   └── api/
│   │       ├── agente.ts          # proxy al modelo con rate limit
│   │       └── lead.ts            # captura de email
│   └── lib/                       # utilidades (relacionados, slugs, schema.org)
├── scripts/
│   ├── generar-libro.mjs          # PDF del libro digital
│   └── validar-contenido.mjs      # comprueba fichas (enlaces rotos, campos)
├── public/
│   ├── robots.txt
│   └── og/                        # imágenes Open Graph
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
└── README.md
```

---

## 5. MODELO DE CONTENIDO (esquema de cada ficha)

Cada término es un archivo Markdown con este **frontmatter** (valídalo con Zod en `src/content/config.ts`):

```yaml
---
termino: "MCP"                         # nombre corto visible
nombreCompleto: "Model Context Protocol"
slug: "mcp"                            # URL: /que-es/mcp
categoria: "agentes"                   # ver lista de categorías
nivel: "intermedio"                    # basico | intermedio | avanzado
definicionCorta: "Estándar abierto que permite conectar modelos de IA con herramientas y datos de forma uniforme."   # 120-160 caracteres, apta para fragmento destacado
sinonimos: ["Model Context Protocol"]
relacionados: ["api", "agente", "llm", "harness"]
metaTitulo: "Qué es MCP en IA: significado y ejemplos | [NOMBRE_PROYECTO]"   # <= 60 car.
metaDescripcion: "..."                 # 140-155 car.
actualizado: 2026-11-22
faq:
  - p: "¿Qué significa MCP?"
    r: "..."
  - p: "¿Para qué sirve MCP en una empresa?"
    r: "..."
---
```

### Cuerpo de la ficha (orden fijo)

1. **Definición en una frase** (la misma idea que `definicionCorta`, en lenguaje llano).
2. **Explicación sencilla** (2-4 párrafos, con una analogía cotidiana).
3. **Ejemplo real** (concreto, de negocio: ferretería, clínica, club, tienda online…).
4. **¿Para qué te sirve en tu negocio?** (utilidad práctica y accionable).
5. **Errores y confusiones frecuentes** (si aplica).
6. **Términos relacionados** (se pinta desde `relacionados`).
7. **Preguntas frecuentes** (desde `faq`, con marcado `FAQPage`).
8. **CTA** a Chess AI Agency: "¿Quieres aplicar esto en tu negocio? Hablamos".

### Categorías

`fundamentos` · `modelos` · `agentes` · `herramientas-desarrollo` · `datos-y-conocimiento` · `prompting` · `seguridad-y-etica` · `negocio`

---

## 6. LISTA INICIAL DE TÉRMINOS (MVP: 30 fichas)

Redacta y publica estos términos. Empieza por los 5 primeros como **ficha modelo** para validar tono y estructura antes de generar el resto.

**Núcleo (ficha modelo):** API · MCP · Harness · LLM · CLI

**Fundamentos:** Inteligencia artificial · Machine learning · Red neuronal · Token · Ventana de contexto · Parámetros · Inferencia

**Modelos y uso:** Prompt · System prompt · Alucinación · Fine-tuning · Embedding · Modelo multimodal · Temperatura

**Agentes y desarrollo:** Agente de IA · Tool use (uso de herramientas) · Skill · Workflow · Widget de IA · SDK · Webhook

**Conocimiento y datos:** RAG · Base de datos vectorial · Memoria del agente

**Seguridad y negocio:** Prompt injection · Sesgo · Automatización con IA

> Pide confirmación al terminar las 5 fichas modelo. Después genera las 25 restantes con la misma estructura.

### Reglas de redacción

- Define SIEMPRE el término sin usar otro término técnico sin explicar (o enlázalo a su ficha).
- Una analogía por ficha, máximo. Sin exageraciones ni promesas vacías.
- Ejemplos de negocio reales y variados (no todos de la misma industria).
- No inventes datos, cifras ni fechas. Si no estás seguro de un dato, déjalo fuera o márcalo con `<!-- VERIFICAR -->`.
- Longitud orientativa por ficha: 400-700 palabras.

---

## 7. SEO TÉCNICO (requisitos obligatorios)

1. **URL limpia por término:** `/que-es/[slug]`. Un solo `<h1>` por página con la búsqueda real ("Qué es MCP en IA").
2. **`<title>` y meta description** únicos por ficha, desde el frontmatter.
3. **Datos estructurados JSON-LD:**
   - `DefinedTerm` (+ `DefinedTermSet` para el glosario completo)
   - `FAQPage` (desde `faq`)
   - `BreadcrumbList`
   - `WebSite` con `SearchAction` en la home
   - `Organization` (Chess AI Agency)
4. **Enlazado interno:** cada ficha enlaza a sus `relacionados` y, automáticamente, la primera mención de otro término del glosario en el cuerpo se convierte en enlace (sin enlazar dentro de títulos ni dos veces el mismo).
5. **Canonical**, **Open Graph** y **Twitter Card** en todas las páginas; imagen OG por ficha (generada o plantilla).
6. **`sitemap.xml`** automático con `lastmod` desde `actualizado`, y **`robots.txt`**.
7. **Índices A-Z y por categoría** para dar rutas de rastreo y páginas de agrupación.
8. **`hreflang`** preparado (solo `es` de momento) por si se añaden idiomas.
9. **Core Web Vitals:** LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Fuentes optimizadas, imágenes en AVIF/WebP con dimensiones declaradas, JS mínimo.
10. **Accesibilidad:** HTML semántico, contraste AA, navegación por teclado, `alt` en imágenes, `lang="es"`.

---

## 8. AGENTE IA (widget fijo abajo a la derecha)

### Comportamiento

- Botón flotante fijo (esquina inferior derecha) que abre un panel de chat. Presente en todas las páginas.
- Función principal: **explicar cualquier término de IA** adaptándose al nivel y al contexto del usuario ("explícamelo como si fuera ferretero").
- Si el término existe en el glosario, el agente **enlaza a la ficha**. Si no existe, lo explica y lo registra como **sugerencia de término nuevo** (útil para el calendario editorial).
- Función de captación: cuando el usuario muestra interés en aplicarlo a su negocio, ofrece de forma natural dejar su email o reservar una llamada con Chess AI Agency. Sin insistir ni presionar.
- Si el usuario pregunta algo fuera de IA, responde brevemente y reconduce.

### System prompt del agente (punto de partida)

```
Eres el asistente del glosario [NOMBRE_PROYECTO]. Explicas términos de inteligencia
artificial en español de España, con claridad y sin jerga innecesaria.

Reglas:
- Adapta la explicación al nivel y al sector que indique el usuario.
- Empieza con una definición de una frase y después un ejemplo concreto.
- Si el término está en el glosario, enlaza a su ficha (/que-es/[slug]).
- No inventes datos. Si no estás seguro, dilo.
- Sé breve: máximo 150 palabras salvo que el usuario pida más detalle.
- Si el usuario quiere aplicar la IA a su negocio, ofrécele de forma natural hablar
  con Chess AI Agency. No insistas si no le interesa.
- No des consejos médicos, legales ni financieros.
```

### Implementación y seguridad

- El navegador llama a `/api/agente`; el servidor llama a la API del modelo. **La clave nunca llega al cliente.**
- Variables de entorno: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `RATE_LIMIT_PER_MIN`.
- **Rate limiting** por IP, límite de longitud del mensaje, límite de turnos por sesión y `max_tokens` acotado.
- **Streaming** de la respuesta para sensación de rapidez.
- Protección contra *prompt injection*: el contenido del usuario nunca modifica el system prompt; se sanea el HTML de la salida.
- Registro mínimo de consultas (sin datos personales) para detectar términos nuevos que añadir.
- Aviso visible de que es un asistente de IA y enlace a la política de privacidad.
- Si la API falla, el widget muestra un mensaje amable y enlaza al buscador.

---

## 9. CAPTACIÓN DE LEADS

- **`CtaAgencia`** al final de cada ficha, con copy adaptado a la categoría (no un único texto genérico).
- **Lead magnet:** libro digital "Diccionario de IA para tu negocio" (PDF) a cambio del email, en `/libro` y como bloque intermedio en las fichas más visitadas.
- **`/api/lead`:** guarda email + consentimiento explícito (RGPD) y lo envía a `[SERVICIO_EMAIL: Brevo / MailerLite / Resend]`. Doble opt-in opcional.
- Casilla de consentimiento NO premarcada, enlace a política de privacidad y mención del responsable del tratamiento.
- Eventos de conversión en la analítica: apertura del agente, envío de email, clic en CTA.

---

## 10. LIBRO DIGITAL (PDF)

- `scripts/generar-libro.mjs` toma todas las fichas y genera un PDF con: portada, índice, introducción, términos por categoría, índice alfabético y página final con CTA.
- Diseño limpio y coherente con la web. Tipografía legible, buena maquetación para móvil y lectura en pantalla.
- Se regenera en cada build y se sirve desde `public/` (el acceso se controla vía el flujo de lead).
- Versión en el nombre del archivo (`diccionario-ia-v1.pdf`) y fecha en la portada.

---

## 11. DISEÑO Y UX

- Estilo **limpio, moderno y profesional**; modo claro y oscuro.
- Home: buscador grande y visible, términos más consultados, categorías, índice A-Z y bloque del libro.
- Ficha: lectura cómoda (ancho de línea 65-75 caracteres), tabla de contenidos sticky en escritorio, definición destacada arriba.
- Buscador con resultados instantáneos (Pagefind), tolerante a tildes y mayúsculas.
- Mobile-first. Footer con sobre el proyecto, privacidad, contacto y enlace a Chess AI Agency.
- Paleta y tipografía: `[A_DEFINIR]` (propón 2 opciones con una breve justificación antes de implementar).

---

## 12. LEGAL Y RGPD

- Política de privacidad, aviso legal y política de cookies (o analítica sin cookies para evitar banner).
- Consentimiento explícito para el email y para el uso del agente (aviso de que las conversaciones pueden almacenarse de forma anónima).
- Responsable: `[RAZON_SOCIAL]`, `[NIF]`, `[EMAIL_CONTACTO]`.

---

## 13. FASES DE TRABAJO

Trabaja por fases y **detente para validar** al final de cada una.

**Fase 0 — Plan.** Confirma stack, estructura y variables. Propón 2 opciones de paleta/tipografía y 3 opciones de nombre/dominio si aún no están decididos.

**Fase 1 — Base.** Proyecto Astro + Tailwind, layout base, esquema de contenido, componentes de ficha, SEO y JSON-LD. Deploy de prueba.

**Fase 2 — Contenido modelo.** Las 5 fichas núcleo (API, MCP, Harness, LLM, CLI) completas. Validación de tono y estructura.

**Fase 3 — Buscador y navegación.** Pagefind, índices A-Z y por categoría, relacionados, enlazado interno automático.

**Fase 4 — Resto del MVP.** Las 25 fichas restantes, validación automática de contenido (`validar-contenido.mjs`).

**Fase 5 — Agente.** Widget, endpoint `/api/agente`, rate limit, streaming, registro de términos sugeridos.

**Fase 6 — Leads y libro.** `/api/lead`, landing del libro, generación del PDF, eventos de analítica.

**Fase 7 — Calidad y lanzamiento.** Auditoría Lighthouse (>95 en las cuatro métricas), accesibilidad, enlaces rotos, Search Console, sitemap enviado, README completo.

---

## 14. CRITERIOS DE ACEPTACIÓN

- [ ] 30 fichas publicadas con la estructura fija y frontmatter válido.
- [ ] Cada ficha con `DefinedTerm`, `FAQPage` y `BreadcrumbList` válidos (probados con el validador de resultados enriquecidos).
- [ ] Lighthouse ≥ 95 en Rendimiento, Accesibilidad, Buenas prácticas y SEO (móvil).
- [ ] Buscador funcional y tolerante a tildes.
- [ ] Agente operativo en todas las páginas, con rate limit y sin exponer claves.
- [ ] Flujo de email con consentimiento RGPD funcionando de extremo a extremo.
- [ ] PDF del libro generado automáticamente en el build.
- [ ] Sitemap y robots correctos; sin enlaces rotos (`validar-contenido.mjs` en verde).
- [ ] README con instrucciones de instalación, variables de entorno, cómo añadir un término nuevo y cómo desplegar.

---

## 15. CÓMO TRABAJAR CONMIGO

- Responde y comenta en **español**. Código y nombres de archivo en inglés o español coherente con esta estructura.
- Antes de escribir código en cada fase, resume en 5 líneas qué vas a hacer.
- Si falta información (nombre, dominio, servicio de email, paleta), **pregunta de forma agrupada** en la Fase 0, no a cada paso.
- Prioriza simplicidad y mantenibilidad: añadir un término nuevo debe ser **crear un único archivo Markdown**.
- No añadas dependencias innecesarias. Justifica cada una.
- Al terminar cada fase, lista lo hecho, lo pendiente y cómo probarlo en local.

---

## 16. SIGUIENTE PASO INMEDIATO

Empieza por la **Fase 0**: confirma el stack, haz las preguntas pendientes en un único bloque (nombre del proyecto, dominio, servicio de email, razón social, paleta) y propón el plan detallado de la Fase 1.
