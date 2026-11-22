---
termino: "Cadena de pensamiento"
nombreCompleto: "Chain of thought (cadena de pensamiento)"
slug: "cadena-de-pensamiento"
categoria: "prompting"
nivel: "avanzado"
definicionCorta: "Técnica que pide al modelo razonar paso a paso antes de dar una respuesta final, mejorando tareas de lógica o cálculo."
sinonimos: ["Chain of thought", "CoT", "Razonamiento paso a paso"]
relacionados: ["razonamiento", "prompt-engineering", "evaluacion-de-prompts", "alucinacion"]
metaTitulo: "Qué es Cadena de pensamiento en IA: guía para pymes"
metaDescripcion: "Técnica que pide al modelo razonar paso a paso antes de dar una respuesta final, mejorando tareas de lógica o cálculo. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Debo activarlo siempre?"
    r: "No. Para clasificar o redactar, suele ser innecesario. Para cálculo y planificación, puede ayudar."
  - p: "¿Es lo mismo que un modelo de razonamiento?"
    r: "No. La técnica se pide en el prompt; un modelo de razonamiento dedica cómputo interno a ello de forma nativa."
---

## En qué consiste

En lugar de pedir solo el resultado, se le pide que descomponga el problema: identifique datos, aplique reglas y compruebe. En problemas matemáticos o de planificación, esto suele mejorar la precisión.

Pero el razonamiento visible no garantiza verdad. Un modelo puede encadenar pasos plausibles hacia una conclusión falsa. Además, gasta más tokens y a veces revela información que no conviene mostrar. Para producción, pide un resumen de criterios, no el monólogo interno.

## Una analogía para entenderlo

> Pedir a alguien que enseñe las cuentas antes de dar el resultado. Ayuda a detectar errores, pero también puede justificar un error con pasos bonitos.

## Ejemplo real de negocio

Un agente compara tres presupuestos. Se le pide calcular coste total con plazos y penalizaciones, y después resumir la recomendación en tres líneas para el cliente.

## Cómo aplicarlo en tu pyme

Úsalo en análisis y decisiones con criterios verificables. Valida siempre los números con una hoja de cálculo o una regla externa.

## Errores frecuentes

Creer que el paso a paso es la verdad, mostrarlo al cliente o usarlo para tareas simples donde solo añade coste.
