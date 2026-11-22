---
termino: "Alucinación"
nombreCompleto: "Alucinación"
slug: "alucinacion"
categoria: "modelos"
nivel: "basico"
definicionCorta: "Respuesta plausible pero incorrecta que genera un modelo cuando completa información que no tiene o malinterpreta el contexto."
sinonimos: ["Hallucination", "Invención"]
relacionados: ["llm", "rag", "temperatura", "transparencia-algoritmica"]
metaTitulo: "Qué es Alucinación en IA: guía para pymes"
metaDescripcion: "Respuesta plausible pero incorrecta que genera un modelo cuando completa información que no tiene o malinterpreta el contexto."
actualizado: 2026-11-22
destacado: true
faq:
  - p: "¿Se puede eliminar del todo?"
    r: "No al 100 %. Se puede reducir con fuentes, validación y revisión humana, sobre todo en datos críticos."
  - p: "¿Cómo detectarla?"
    r: "Contrasta con la fuente original, pide citas textuales y usa comprobaciones automáticas de formato y datos."
---

## En qué consiste

Un modelo de lenguaje no consulta una verdad absoluta: genera la continuación más probable. Si le falta un dato, puede rellenarlo con algo que suena bien. Una fecha, una ley o una cita inventada pueden pasar desapercibidas porque el texto es fluido y seguro.

La mitigación combina varias capas: dar fuentes, pedir citas, usar RAG, validar con reglas, limitar el dominio y revisar lo crítico. Ninguna capa es infalible, pero juntas reducen mucho el riesgo.

## Una analogía para entenderlo

> Un alumno que no sabe la respuesta y la inventa con seguridad para no quedar mal.

## Ejemplo real de negocio

Un chatbot de una tienda afirma que el envío tarda 24 horas cuando la política real es de 3 a 5 días. El cliente lo exige y el equipo tiene que corregirlo a mano.

## Cómo aplicarlo en tu pyme

Nunca publiques respuestas automáticas sobre precios, plazos, normativa o salud sin una fuente verificable. Diseña el flujo para que el modelo cite y para que un humano revise lo sensible.

## Errores frecuentes

Creer que se arregla con un prompt, que solo pasa con modelos malos o que bajar la temperatura lo elimina.
