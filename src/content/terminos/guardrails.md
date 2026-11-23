---
termino: "Guardrails"
nombreCompleto: "Guardrails (barandillas de seguridad)"
slug: "guardrails"
categoria: "seguridad-y-etica"
nivel: "intermedio"
definicionCorta: "Límites y controles que restringen lo que un sistema de IA puede decir o hacer: temas prohibidos, formatos, acciones y umbrales."
sinonimos: ["Barandillas", "Controles de seguridad"]
relacionados: ["prompt-injection", "seguridad-de-agentes", "human-in-the-loop", "salida-estructurada"]
metaTitulo: "Qué es Guardrails en IA: guía para pymes"
metaDescripcion: "Límites y controles que restringen lo que un sistema de IA puede decir o hacer: temas prohibidos, formatos, acciones y umbrales."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Igual que system prompt?"
    r: "No: el prompt es una capa; las guardrails incluyen validación técnica."
  - p: "¿Se pueden saltar?"
    r: "Sí si están mal diseñadas. Por eso se prueban con red teaming."
---

## En qué consiste

Las guardrails combinan instrucciones en el system prompt, validación de entradas y salidas, filtros y permisos. No es una sola capa.

Deben cubrir también las herramientas: un agente puede tener una guardrail de lenguaje y otra que impida enviar emails sin aprobación.

## Una analogía para entenderlo

> Las barandillas de una pista de bolos: no impiden jugar, pero evitan que la bola salga hacia los espectadores.

## Ejemplo real de negocio

Un agente de clínica tiene guardrails que prohíben diagnósticos, impiden pedir datos de salud y obligan a derivar urgencias a recepción.

## Cómo aplicarlo en tu pyme

Define las guardrails antes de desplegar y pruebalas con ataques reales. Un prompt diciendo «no hagas X» no es una guardrail suficiente.

## Errores frecuentes

Confiar solo en el prompt, no validar salidas o no probar casos límite.
