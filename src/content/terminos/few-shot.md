---
termino: "Few-shot"
nombreCompleto: "Few-shot (aprendizaje con pocos ejemplos)"
slug: "few-shot"
categoria: "modelos"
nivel: "intermedio"
definicionCorta: "Técnica de prompting que incluye unos pocos ejemplos de entrada y salida para que el modelo imite el patrón deseado."
sinonimos: ["Aprendizaje con pocos ejemplos", "Pocos ejemplos"]
relacionados: ["prompt", "prompt-engineering", "fine-tuning", "salida-estructurada"]
metaTitulo: "Qué es Few-shot en IA: guía para pymes"
metaDescripcion: "Técnica de prompting que incluye unos pocos ejemplos de entrada y salida para que el modelo imite el patrón deseado. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Cuántos ejemplos necesito?"
    r: "Con tres a cinco bien elegidos suele haber una mejora clara. Prueba y mide; no hay un número universal."
  - p: "¿Few-shot o fine-tuning?"
    r: "Few-shot para empezar y para cambios rápidos. Fine-tuning cuando necesitas consistencia a gran escala y tienes muchos datos."
---

## En qué consiste

En lugar de explicar una regla abstracta, le muestras al modelo tres o cinco casos resueltos. Así entiende el formato, el tono y el criterio. Es una de las formas más eficaces de mejorar la consistencia sin entrenar nada.

Los ejemplos deben ser correctos, variados y representativos. Si todos son iguales, el modelo copiará ese sesgo. Si incluyes un caso límite, enséñale también cómo resolverlo. No hace falta llenar el contexto: cinco buenos ejemplos suelen bastar.

## Una analogía para entenderlo

> Mostrar al aprendiz tres facturas bien rellenadas antes de pedirle la cuarta.

## Ejemplo real de negocio

Un equipo de soporte clasifica incidencias en «facturación», «envío» y «producto». Incluye dos ejemplos por categoría, con el formato exacto de salida, y el modelo acierta mucho más.

## Cómo aplicarlo en tu pyme

Úsalo para formatos, clasificaciones y tonos. Es más barato y rápido que un fine-tuning y se puede cambiar al momento.

## Errores frecuentes

Creer que más ejemplos siempre es mejor, que los ejemplos sesgados no importan o que sustituye a un ajuste fino cuando el volumen es enorme.
