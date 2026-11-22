---
termino: "Chunking"
nombreCompleto: "Chunking (fragmentación)"
slug: "chunking"
categoria: "datos-y-conocimiento"
nivel: "intermedio"
definicionCorta: "Proceso de dividir documentos largos en fragmentos manejables que se indexan y se recuperan por separado."
sinonimos: ["Fragmentación", "Troceado de documentos"]
relacionados: ["rag", "base-de-datos-vectorial", "embedding", "ventana-de-contexto"]
metaTitulo: "Qué es Chunking en IA: guía para pymes"
metaDescripcion: "Proceso de dividir documentos largos en fragmentos manejables que se indexan y se recuperan por separado. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué tamaño es mejor?"
    r: "No hay uno universal. Prueba entre 300 y 800 tokens con solapamiento y evalúa con preguntas reales."
  - p: "¿Hace falta solapamiento?"
    r: "Ayuda a no perder frases cortadas entre bloques. Un 10-20 % suele ser razonable."
---

## En qué consiste

Un manual de 200 páginas no cabe entero en cada consulta. El chunking lo parte en trozos con sentido: secciones, párrafos o bloques de tamaño fijo con solapamiento. Cada trozo se convierte en vector y se guarda con su referencia.

El tamaño importa. Trozos muy pequeños pierden contexto; muy grandes mezclan temas y gastan tokens. Lo habitual es probar varios tamaños y medir si la recuperación acierta. Conservar títulos y metadatos ayuda mucho.

## Una analogía para entenderlo

> Recortar un periódico en noticias para archivarlas por tema, en vez de guardar el periódico entero.

## Ejemplo real de negocio

Una gestoría divide su guía fiscal por apartados y conserva el título de cada uno. Así, al preguntar por una deducción, el sistema recupera el apartado correcto y no una página cualquiera.

## Cómo aplicarlo en tu pyme

Dedica tiempo a preparar los documentos antes de indexar. Un buen chunking mejora más que cambiar de modelo. Documenta la estrategia para poder ajustarla.

## Errores frecuentes

Cortar por número de caracteres sin respetar secciones, no solapar nada o indexar cabeceras y pies repetidos.
