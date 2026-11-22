---
termino: "Iteración de prompts"
nombreCompleto: "Iteración de prompts"
slug: "iteracion-de-prompts"
categoria: "prompting"
nivel: "intermedio"
definicionCorta: "Práctica de ajustar un prompt en ciclos cortos, cambiando una variable cada vez y midiendo el efecto en los resultados."
sinonimos: ["Refinamiento de prompts", "Iteración de instrucciones"]
relacionados: ["evaluacion-de-prompts", "prompt-engineering", "few-shot", "temperatura"]
metaTitulo: "Qué es Iteración de prompts en IA: guía para pymes"
metaDescripcion: "Práctica de ajustar un prompt en ciclos cortos, cambiando una variable cada vez y midiendo el efecto en los resultados. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Cuántas iteraciones hacen falta?"
    r: "Depende de la tarea. Para una clasificación sencilla, pocas; para un flujo complejo, muchas y con evaluación continua."
  - p: "¿Cuándo paro?"
    r: "Cuando el resultado cumple el criterio de calidad y el coste es aceptable. No cuando es perfecto."
---

## En qué consiste

El primer prompt casi nunca es el definitivo. Se prueba, se detecta el fallo y se ajusta: añadir un ejemplo, aclarar una regla, cambiar el orden. Un cambio cada vez para saber qué funcionó.

La iteración termina cuando el resultado es suficientemente bueno para el riesgo de la tarea, no cuando es perfecto. Documenta las versiones y por qué cambiaste. Así evitas dar vueltas sobre lo mismo.

## Una analogía para entenderlo

> Ajustar una receta probando y corrigiendo el punto de sal, no cambiando todos los ingredientes a la vez.

## Ejemplo real de negocio

Un equipo detecta que el modelo inventa plazos. Añade la regla «si no aparece el plazo, escribe No consta» y vuelve a probar con los mismos 50 casos. El fallo baja del 20 % al 3 %.

## Cómo aplicarlo en tu pyme

Trabaja con hipótesis y mide. Guarda una versión estable y prueba cambios en paralelo para no romper lo que ya funciona.

## Errores frecuentes

Cambiar cinco cosas a la vez, no conservar versiones anteriores o dejar de iterar cuando aparece el primer resultado aceptable.
