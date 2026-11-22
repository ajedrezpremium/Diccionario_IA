---
termino: "System prompt"
nombreCompleto: "System prompt (instrucción de sistema)"
slug: "system-prompt"
categoria: "modelos"
nivel: "intermedio"
definicionCorta: "Instrucción base que define el rol, las reglas y los límites de un modelo antes de que el usuario escriba nada."
sinonimos: ["Instrucción de sistema", "Prompt de sistema"]
relacionados: ["prompt", "prompt-injection", "agente-de-ia", "role-prompting"]
metaTitulo: "Qué es System prompt en IA: guía para pymes"
metaDescripcion: "Instrucción base que define el rol, las reglas y los límites de un modelo antes de que el usuario escriba nada. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Se puede leer?"
    r: "Puede filtrarse en una respuesta o en un error. Nunca pongas claves ni datos confidenciales en el system prompt."
  - p: "¿Qué pasa si el usuario pide ignorarlo?"
    r: "El modelo debería mantener el rol, pero puede fallar. Añade validaciones externas para lo crítico."
---

## En qué consiste

El system prompt es la Constitución del asistente. Establece quién es, cómo habla, qué puede hacer y qué debe rechazar. Se envía en cada conversación y tiene más prioridad que los mensajes del usuario, aunque ningún modelo es inmune a un intento de manipulación.

Debe ser breve y operativo: rol, tono, límites, formato y criterios de derivación. No es el sitio para pegar 50 páginas de normativa; para eso están RAG y las herramientas. Y no debe contener secretos: puede filtrarse.

## Una analogía para entenderlo

> El manual de conducta que recibe un empleado antes de atender al público. No cambia en cada cliente, pero marca cómo se comporta.

## Ejemplo real de negocio

El asistente de una clínica recibe instrucciones de no dar diagnósticos, derivar urgencias al teléfono correspondiente y no pedir datos de salud en el chat.

## Cómo aplicarlo en tu pyme

Úsalo para coherencia de marca, cumplimiento y límites claros. Revísalo cuando cambie la normativa o aparezca un nuevo riesgo.

## Errores frecuentes

Creer que el usuario no puede influir en él, que es secreto por seguridad o que más texto lo hace más robusto.
