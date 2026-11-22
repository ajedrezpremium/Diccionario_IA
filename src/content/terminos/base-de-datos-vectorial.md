---
termino: "Base de datos vectorial"
nombreCompleto: "Base de datos vectorial"
slug: "base-de-datos-vectorial"
categoria: "datos-y-conocimiento"
nivel: "avanzado"
definicionCorta: "Sistema que almacena vectores —representaciones numéricas de contenido— y permite buscar los más parecidos a una consulta."
sinonimos: ["Vector database", "Almacén vectorial"]
relacionados: ["embedding", "rag", "busqueda-semantica", "chunking"]
metaTitulo: "Qué es Base de datos vectorial en IA: guía para pymes"
metaDescripcion: "Sistema que almacena vectores —representaciones numéricas de contenido— y permite buscar los más parecidos a una consulta."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Puedo usar Postgres?"
    r: "Sí, con la extensión pgvector. Para muchos proyectos es suficiente y evita un servicio extra."
  - p: "¿Qué pasa si cambio de modelo de embedding?"
    r: "Hay que regenerar todos los vectores. Planifícalo: no son compatibles entre modelos."
---

## En qué consiste

Una base de datos tradicional busca por coincidencia exacta o por filtros. Una vectorial busca por significado: convierte tu pregunta en un vector y devuelve los fragmentos con vectores cercanos, aunque no compartan palabras.

Se usa para RAG, recomendaciones, deduplicación y búsqueda semántica. No siempre hace falta: con pocos documentos, una búsqueda híbrida sobre Postgres puede ser suficiente y más fácil de mantener.

## Una analogía para entenderlo

> Un mapa de ideas donde cada concepto tiene coordenadas. Buscas lo que está cerca de tu pregunta, no lo que se escribe igual.

## Ejemplo real de negocio

Un fabricante indexa 4.000 fichas técnicas. El técnico pregunta «cómo evitar corrosión en ambiente salino» y el sistema encuentra las fichas relevantes aunque no usen esas palabras exactas.

## Cómo aplicarlo en tu pyme

Adóptala cuando el volumen y la búsqueda semántica lo justifiquen. Calcula coste, sincronización y borrado: si cambia un documento, el índice debe actualizarse.

## Errores frecuentes

Creer que sustituye a la base de datos principal, no planificar actualizaciones o mezclar embeddings de modelos distintos.
