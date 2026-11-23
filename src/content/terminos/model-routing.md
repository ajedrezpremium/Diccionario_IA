---
termino: "Model Routing"
nombreCompleto: "Model Routing (enrutado de modelos)"
slug: "model-routing"
categoria: "modelos"
nivel: "avanzado"
definicionCorta: "Selección automática del modelo más adecuado para cada tarea, equilibrando calidad, coste, latencia y disponibilidad."
sinonimos: ["Enrutado de modelos", "Multi-model routing"]
relacionados: ["llm", "ai-gateway", "coste-por-token", "inferencia"]
metaTitulo: "Qué es Model Routing en IA: guía para pymes"
metaDescripcion: "Selección automática del modelo más adecuado para cada tarea, equilibrando calidad, coste, latencia y disponibilidad. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Ahorra dinero?"
    r: "Sí, si hay tareas sencillas de alto volumen."
  - p: "¿Cómo se decide?"
    r: "Con reglas, un clasificador ligero o métricas históricas."
---

## En qué consiste

No todas las preguntas necesitan el modelo más caro. Un enrutador clasifica la tarea y envía las sencillas a un modelo pequeño y las complejas a uno grande.

También sirve para fallback: si el proveedor principal falla, la petición se reenvía a otro. La decisión debe basarse en métricas, no en intuitiones.

## Una analogía para entenderlo

> Un taller que elige la herramienta según el tornillo: no usa la grúa para apretar una tuerca.

## Ejemplo real de negocio

Una tienda envía clasificaciones de stock a un modelo pequeño y redacciones de campaña a uno grande. Ahorra 60 % en coste sin perder calidad.

## Cómo aplicarlo en tu pyme

Mide primero: clasifica tus peticiones por dificultad y comprueba qué modelo mínimo resuelve cada grupo.

## Errores frecuentes

Enrutar por corazonadas, no medir la calidad por grupo o no prever fallback.
