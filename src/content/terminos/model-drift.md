---
termino: "Model Drift"
nombreCompleto: "Model Drift (deriva del modelo)"
slug: "model-drift"
categoria: "modelos"
nivel: "avanzado"
definicionCorta: "Caída del rendimiento de un modelo con el tiempo porque los datos reales cambian y dejan de parecerse a los usados en entrenamiento o evaluación."
sinonimos: ["Deriva del modelo", "Data drift"]
relacionados: ["calidad-de-datos", "agent-evaluation", "fine-tuning"]
metaTitulo: "Qué es Model Drift en IA: guía para pymes"
metaDescripcion: "Caída del rendimiento de un modelo con el tiempo porque los datos reales cambian y dejan de parecerse a los usados en entrenamiento o evaluación."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Se puede evitar?"
    r: "No del todo; se puede detectar y corregir pronto."
  - p: "¿Cada cuánto revisar?"
    r: "Según el dominio: mensual para sectores rápidos, trimestral para estables."
---

## En qué consiste

El mundo cambia: nuevos productos, jerga, normativa o comportamientos. Un modelo que funcionaba en enero puede fallar en junio sin que nadie tocara el código.

Se detecta comparando métricas en el tiempo y revisando muestras recientes. La solución puede ser reentrenar, ajustar prompts o actualizar el conocimiento.

## Una analogía para entenderlo

> Un mapa perfecto de una ciudad que cambia las calles cada mes: sigue siendo bonito, pero ya no sirve.

## Ejemplo real de negocio

Un clasificador de incidencias empieza a fallar porque aparece un nuevo tipo de consulta tras una campaña. Se añaden ejemplos y se reevalúa.

## Cómo aplicarlo en tu pyme

Programa revisiones periódicas. Un agente en producción necesita mantenimiento, no solo despliegue.

## Errores frecuentes

Creer que «ya funciona» significa que seguirá funcionando o no guardar métricas históricas.
