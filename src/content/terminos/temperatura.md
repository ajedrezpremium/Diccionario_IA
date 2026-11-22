---
termino: "Temperatura"
nombreCompleto: "Temperatura"
slug: "temperatura"
categoria: "modelos"
nivel: "basico"
definicionCorta: "Parámetro que controla cuánta aleatoriedad introduce el modelo al elegir la siguiente pieza de texto."
sinonimos: ["Temperature"]
relacionados: ["llm", "prompt", "alucinacion", "salida-estructurada"]
metaTitulo: "Qué es Temperatura en IA: guía para pymes"
metaDescripcion: "Parámetro que controla cuánta aleatoriedad introduce el modelo al elegir la siguiente pieza de texto. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué valor uso?"
    r: "Para datos y clasificación, cerca de 0. Para redacción creativa, entre 0,6 y 0,9. Prueba con tus casos."
  - p: "¿Elimina las alucinaciones?"
    r: "No. Reduce la variación, pero un modelo puede inventar con cualquier temperatura."
---

## En qué consiste

Con temperatura baja, el modelo tiende a elegir las opciones más probables: respuestas más estables y repetitivas. Con temperatura alta, explora alternativas menos probables: más variedad y creatividad, pero también más riesgo de desviarse.

No es un botón de verdad. Bajar la temperatura no elimina las alucinaciones; solo reduce la variabilidad. Para extraer datos, usa temperatura baja y salida estructurada. Para ideación, súbela un poco.

## Una analogía para entenderlo

> El termostato de la creatividad: bajo, respuestas previsibles; alto, más variedad y sorpresa.

## Ejemplo real de negocio

Una gestoría extrae importes de facturas con temperatura 0 para que el formato sea estable. La agencia de marketing genera nombres de campaña con 0,8 para obtener opciones distintas.

## Cómo aplicarlo en tu pyme

Ajusta la temperatura por tarea y documenta el valor. Si necesitas reproducibilidad, combínala con salidas estructuradas y validación.

## Errores frecuentes

Creer que bajarla elimina errores, que alta siempre es mejor o que es lo mismo que top_p. Son parámetros distintos, aunque relacionados.
