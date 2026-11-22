---
termino: "Function calling"
nombreCompleto: "Function calling"
slug: "function-calling"
categoria: "agentes"
nivel: "intermedio"
definicionCorta: "Mecanismo por el que un modelo devuelve una llamada a función estructurada en lugar de texto libre, para que el sistema la ejecute."
sinonimos: ["Llamada a funciones"]
relacionados: ["tool-use", "api", "salida-estructurada", "agente-de-ia"]
metaTitulo: "Qué es Function calling en IA: guía para pymes"
metaDescripcion: "Mecanismo por el que un modelo devuelve una llamada a función estructurada en lugar de texto libre, para que el sistema la ejecute."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Diferencia con tool use?"
    r: "Function calling es el mecanismo técnico; tool use es el concepto más amplio de usar herramientas."
  - p: "¿Qué pasa si el modelo se equivoca?"
    r: "La aplicación debe validar y rechazar argumentos inválidos. El modelo puede reintentar con el error."
---

## En qué consiste

En vez de responder «el stock es probablemente 12», el modelo devuelve una estructura: función `get_stock`, argumento `sku: "A-123"`. El sistema valida, ejecuta y devuelve el resultado real. Así se reduce la invención y se conecta con datos vivos.

El modelo no ejecuta nada por sí mismo: propone la llamada. La aplicación decide si la acepta. Por eso son importantes el esquema, la validación de argumentos y los permisos.

## Una analogía para entenderlo

> En vez de decirte «mira el stock», rellena un formulario con el código del producto y la cantidad. Alguien lo procesa y te devuelve el dato.

## Ejemplo real de negocio

Un asistente de reservas llama a `buscar_disponibilidad(fecha, servicio)` y después a `crear_cita(...)`. La creación solo se ejecuta tras confirmar el usuario.

## Cómo aplicarlo en tu pyme

Es la base de integraciones fiables. Define bien las funciones y no des acceso de escritura sin validación.

## Errores frecuentes

Creer que el modelo ejecuta la función, que los argumentos siempre son correctos o que no hace falta esquema.
