---
termino: "Seguridad de agentes"
nombreCompleto: "Seguridad de agentes de IA"
slug: "seguridad-de-agentes"
categoria: "seguridad-y-etica"
nivel: "avanzado"
definicionCorta: "Conjunto de controles que limitan qué puede hacer un agente, a qué datos accede y qué acciones requieren aprobación humana."
sinonimos: ["Agent security", "Seguridad de agentes autónomos"]
relacionados: ["prompt-injection", "human-in-the-loop", "sandbox", "agente-autonomo"]
metaTitulo: "Qué es Seguridad de agentes en IA: guía para pymes"
metaDescripcion: "Conjunto de controles que limitan qué puede hacer un agente, a qué datos accede y qué acciones requieren aprobación humana."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Basta con un buen system prompt?"
    r: "No. El prompt es una capa; los permisos y las validaciones son las que evitan daños reales."
  - p: "¿Qué es el mínimo privilegio?"
    r: "Que cada componente tenga solo los permisos imprescindibles para su tarea, ni uno más."
---

## En qué consiste

Un agente con acceso a herramientas puede leer, escribir, enviar y borrar. La seguridad empieza por el principio de mínimo privilegio: solo las herramientas necesarias, solo los datos necesarios y solo durante el tiempo necesario.

Después vienen las capas: sandbox, validación de argumentos, límites de gasto, confirmación para acciones irreversibles, registro de trazas y un botón de parada. También revisar qué ocurre si una herramienta devuelve datos manipulados.

## Una analogía para entenderlo

> Dar llaves de casa a un operario: solo las de las habitaciones donde va a trabajar, con horario y supervisión.

## Ejemplo real de negocio

El agente de una tienda puede consultar pedidos y preparar respuestas, pero no emitir reembolsos. Si el cliente lo pide, crea una tarea para una persona con el contexto.

## Cómo aplicarlo en tu pyme

Diseña permisos por herramienta y por acción. Prueba qué pasa cuando el agente se equivoca o recibe una instrucción maliciosa. Ten un procedimiento de revocación.

## Errores frecuentes

Dar acceso total «para que funcione», usar credenciales de administrador o no registrar las acciones del agente.
