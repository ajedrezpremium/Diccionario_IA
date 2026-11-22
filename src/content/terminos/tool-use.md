---
termino: "Tool use"
nombreCompleto: "Tool use (uso de herramientas)"
slug: "tool-use"
categoria: "agentes"
nivel: "intermedio"
definicionCorta: "Capacidad de un modelo para invocar funciones o servicios externos y usar el resultado para completar una tarea."
sinonimos: ["Uso de herramientas", "Herramientas del agente"]
relacionados: ["function-calling", "mcp", "agente-de-ia", "api"]
metaTitulo: "Qué es Tool use en IA: guía para pymes"
metaDescripcion: "Capacidad de un modelo para invocar funciones o servicios externos y usar el resultado para completar una tarea. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Cómo se define una herramienta?"
    r: "Con un nombre, una descripción, un esquema de parámetros y una implementación que valide la entrada y controle los errores."
  - p: "¿Qué pasa si falla?"
    r: "El agente debe recibir el error y decidir si reintenta, pide ayuda o deriva. Nunca debe inventar el resultado."
---

## En qué consiste

El modelo no puede consultar tu stock por sí solo. Tool use le permite pedir a un sistema que ejecute una función: buscar un pedido, enviar un email, crear un evento. El resultado vuelve al modelo, que decide el siguiente paso.

Cada herramienta debe tener un contrato claro: qué recibe, qué devuelve y qué errores puede dar. También permisos mínimos. Una herramienta de solo lectura es mucho más segura que una que borra registros.

## Una analogía para entenderlo

> Darle al asistente un teléfono, una calculadora y la llave del archivador, pero solo para lo que necesita.

## Ejemplo real de negocio

Un agente de atención consulta el estado de un pedido en el ERP antes de responder. Si la herramienta falla, no inventa el estado: pide disculpas y deriva.

## Cómo aplicarlo en tu pyme

Conecta el agente a los sistemas que ya usas. Empieza con lecturas y añade escrituras solo cuando haya validación y trazabilidad.

## Errores frecuentes

Creer que el modelo ejecuta cualquier cosa, que las herramientas son magia o que no hace falta validar sus resultados.
