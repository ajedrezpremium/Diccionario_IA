---
termino: "Delimitadores"
nombreCompleto: "Delimitadores en prompts"
slug: "delimitadores"
categoria: "prompting"
nivel: "intermedio"
definicionCorta: "Marcas que separan instrucciones, datos y ejemplos dentro de un prompt para que el modelo distinga qué es qué."
sinonimos: ["Separadores", "Etiquetas de prompt"]
relacionados: ["prompt", "prompt-injection", "contexto", "plantilla-de-prompt"]
metaTitulo: "Qué es Delimitadores en IA: guía para pymes"
metaDescripcion: "Marcas que separan instrucciones, datos y ejemplos dentro de un prompt para que el modelo distinga qué es qué. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué delimitador es mejor?"
    r: "El que no aparezca en el contenido. Etiquetas XML o triples comillas funcionan bien."
  - p: "¿Evitan la inyección de prompts?"
    r: "Reducen el riesgo, pero no lo eliminan. Combínalos con validación y permisos limitados."
---

## En qué consiste

Si pegas un email de cliente dentro de una instrucción, el modelo puede confundir el contenido con una orden. Los delimitadores —triples comillas, etiquetas XML o encabezados— marcan dónde empieza y termina cada bloque.

También ayudan a la seguridad: si el texto del usuario va entre etiquetas y le dices al modelo que no ejecute órdenes dentro de ellas, reduces el riesgo de inyección. No lo elimina, pero es una capa útil y barata.

## Una analogía para entenderlo

> Separar con carpetas distintas el manual de instrucciones y las cartas de los clientes. Si van mezclados, alguien acabará siguiendo la carta equivocada.

## Ejemplo real de negocio

Una plantilla incluye `<documento>...</documento>` y `<pregunta>...</pregunta>`. El modelo sabe que el documento es información, no una orden, aunque contenga frases imperativas.

## Cómo aplicarlo en tu pyme

Úsalos en cualquier prompt que incluya texto de terceros. Es una práctica sencilla que mejora claridad y seguridad.

## Errores frecuentes

Usar delimitadores que aparecen en el propio texto, no explicar qué significan o creer que son una barrera de seguridad infalible.
