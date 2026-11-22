---
termino: "Evaluación de prompts"
nombreCompleto: "Evaluación de prompts"
slug: "evaluacion-de-prompts"
categoria: "prompting"
nivel: "avanzado"
definicionCorta: "Proceso de medir la calidad de las respuestas de un prompt con casos de prueba y criterios definidos, en lugar de opinar."
sinonimos: ["Prompt evaluation", "Evaluación de instrucciones"]
relacionados: ["prompt-engineering", "iteracion-de-prompts", "calidad-de-datos", "observabilidad"]
metaTitulo: "Qué es Evaluación de prompts en IA: guía para pymes"
metaDescripcion: "Proceso de medir la calidad de las respuestas de un prompt con casos de prueba y criterios definidos, en lugar de opinar."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Cuántos casos necesito?"
    r: "Con 30-50 bien elegidos ya se detectan problemas. Para producción, amplía a cientos e incluye casos límite."
  - p: "¿Puedo automatizarlo?"
    r: "Sí, con otro modelo como juez y revisión humana periódica. Define bien la rúbrica para que sea fiable."
---

## En qué consiste

Un prompt no se mejora mirando una respuesta. Se mejora con un conjunto de casos representativos, una rúbrica y una comparación. ¿Acierta la categoría? ¿Cita bien? ¿Cumple el formato? ¿Qué hace en los casos límite?

La evaluación puede ser humana, automática con otro modelo o mixta. Lo importante es que sea repetible y que incluya casos difíciles. Sin ella, cada cambio es una apuesta y no sabes si mejoras o empeoras.

## Una analogía para entenderlo

> Probar un medicamento con un grupo de control, no con la sensación de un solo paciente.

## Ejemplo real de negocio

Antes de publicar un asistente de soporte, una empresa lo prueba con 150 preguntas reales y mide acierto, tono y derivaciones correctas. Compara tres versiones del prompt.

## Cómo aplicarlo en tu pyme

Reserva un conjunto de pruebas desde el principio. Es tu seguro contra cambios que parecen mejores y rompen casos importantes.

## Errores frecuentes

Evaluar con dos ejemplos fáciles, cambiar el prompt y el modelo a la vez o fiarse solo de la opinión del jefe.
