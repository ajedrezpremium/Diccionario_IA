---
termino: "RAG"
nombreCompleto: "Retrieval-Augmented Generation (generación aumentada por recuperación)"
slug: "rag"
categoria: "datos-y-conocimiento"
nivel: "intermedio"
definicionCorta: "Técnica que combina un buscador con un modelo de lenguaje: recupera fragmentos relevantes de tus documentos y los usa para responder."
sinonimos: ["Retrieval-Augmented Generation", "Generación aumentada por recuperación"]
relacionados: ["base-de-datos-vectorial", "chunking", "embedding", "alucinacion"]
metaTitulo: "Qué es RAG en IA: guía para pymes"
metaDescripcion: "Técnica que combina un buscador con un modelo de lenguaje: recupera fragmentos relevantes de tus documentos y los usa para responder."
actualizado: 2026-11-22
destacado: true
faq:
  - p: "¿RAG o fine-tuning?"
    r: "RAG para consultar información que cambia; fine-tuning para estilo o comportamiento. Para conocimiento, RAG casi siempre gana."
  - p: "¿Necesito una base vectorial?"
    r: "No es obligatorio, pero facilita la búsqueda semántica. Para pocos documentos puede bastar una búsqueda por palabras clave."
---

## En qué consiste

Un modelo solo sabe lo que aprendió en su entrenamiento. RAG le añade una biblioteca consultable: cuando llega una pregunta, busca los fragmentos más parecidos en tus documentos, los pone en el contexto y pide al modelo que responda con esa información.

Es la forma más práctica de que un asistente conozca tus precios, procedimientos o manuales sin reentrenar nada. La calidad depende de tres piezas: documentos bien preparados, una búsqueda que acierte y un prompt que obligue a citar la fuente.

## Una analogía para entenderlo

> Un examen a libro abierto: el alumno no lo memoriza todo, pero sabe buscar el capítulo correcto antes de responder.

## Ejemplo real de negocio

Una asesoría conecta sus guías internas y sus preguntas frecuentes. El asistente responde con la política vigente y enlaza el documento, en vez de improvisar.

## Cómo aplicarlo en tu pyme

Úsalo para conocimiento cambiante y propio: catálogos, normativa interna, manuales, tickets resueltos. Empieza con un conjunto pequeño y mide si las respuestas citan bien.

## Errores frecuentes

Creer que RAG elimina las alucinaciones, indexar documentos duplicados o usar fragmentos tan grandes que el modelo se pierde.
