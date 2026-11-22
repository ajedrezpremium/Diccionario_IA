---
termino: "Ventana de contexto"
nombreCompleto: "Ventana de contexto"
slug: "ventana-de-contexto"
categoria: "fundamentos"
nivel: "basico"
definicionCorta: "Cantidad máxima de tokens que un modelo puede tener en cuenta a la vez, incluyendo instrucciones, conversación y documentos adjuntos."
sinonimos: ["Context window"]
relacionados: ["token", "rag", "memoria-del-agente", "llm"]
metaTitulo: "Qué es Ventana de contexto en IA: guía para pymes"
metaDescripcion: "Cantidad máxima de tokens que un modelo puede tener en cuenta a la vez, incluyendo instrucciones, conversación y documentos adjuntos."
actualizado: 2026-11-22
destacado: true
faq:
  - p: "¿Se mide en palabras o en tokens?"
    r: "En tokens. Como orientación, una palabra corriente suele ocupar uno o dos tokens, pero varía."
  - p: "¿Qué pasa si me paso del límite?"
    r: "El proveedor puede rechazar la petición o recortar el contenido. Lo normal es que la respuesta empeore o falle."
---

## En qué consiste

La ventana de contexto es la memoria de trabajo del modelo durante una petición. Si metes un contrato, el historial de chat y las instrucciones, todo compite por el mismo espacio. Cuando se llena, el sistema recorta o pierde información.

Una ventana enorme no lo arregla todo: cuesta más, tarda más y el modelo puede perder detalle en el medio del texto. Para conocimiento extenso suele ser mejor recuperar solo los fragmentos relevantes con RAG.

## Una analogía para entenderlo

> Es el tamaño de la mesa donde pones los documentos. Si no caben, tienes que quitar cosas o resumirlas antes de trabajar.

## Ejemplo real de negocio

Una gestoría sube un informe de 80 páginas y pregunta por una cláusula. Sin dividir el documento, el modelo puede quedarse sin espacio o ignorar justo la página importante.

## Cómo aplicarlo en tu pyme

Diseña el flujo para que el modelo reciba solo lo necesario: resúmenes, fragmentos y un historial acotado. Si tu caso depende de mucho conocimiento, plantéalo con recuperación.

## Errores frecuentes

Creer que la ventana es infinita, que meter todo mejora la respuesta o que el modelo recuerda la conversación de ayer.
