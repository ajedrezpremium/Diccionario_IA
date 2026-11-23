---
termino: "Reranking"
nombreCompleto: "Reranking (reordenación)"
slug: "reranking"
categoria: "datos-y-conocimiento"
nivel: "avanzado"
definicionCorta: "Segunda fase de recuperación que reordena los fragmentos candidatos para que los más relevantes queden primero."
sinonimos: ["Reordenación"]
relacionados: ["rag", "busqueda-semantica", "embedding", "chunking"]
metaTitulo: "Qué es Reranking en IA: guía para pymes"
metaDescripcion: "Segunda fase de recuperación que reordena los fragmentos candidatos para que los más relevantes queden primero. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Siempre mejora?"
    r: "Cuando la recuperación inicial es amplia, sí."
  - p: "¿Cuesta más?"
    r: "Sí: más inferencia y latencia. Mide el beneficio."
---

## En qué consiste

La primera búsqueda devuelve 20 candidatos; el reranker los evalúa con más detalle y selecciona los 3 o 5 mejores. Es más lento pero mucho más preciso.

Suele usar un modelo de cruce que compara la pregunta con cada fragmento, en lugar de comparar vectores de forma aproximada.

## Una analogía para entenderlo

> Un primer filtro por applicant y una entrevista corta con los finalistas.

## Ejemplo real de negocio

Una base de 5.000 documentos recupera 20 fragmentos y el reranker deja los 3 que realmente responden. Las respuestas del agente mejoran sin cambiar de modelo.

## Cómo aplicarlo en tu pyme

Si tu RAG falla porrecuperar fragmentos raros, añade reranking antes de cambiar de modelo.

## Errores frecuentes

Aplicarlo a demasiados candidatos —sube latencia— o no medir la mejora.
