---
termino: "Output Validation"
nombreCompleto: "Output Validation (validación de salida)"
slug: "output-validation"
categoria: "seguridad-y-etica"
nivel: "intermedio"
definicionCorta: "Comprobación automática de la respuesta de un modelo antes de mostrarla o usarla: formato, rangos, fuentes y reglas de negocio."
sinonimos: ["Validación de salida"]
relacionados: ["salida-estructurada", "json", "guardrails", "alucinacion"]
metaTitulo: "Qué es Output Validation en IA: guía para pymes"
metaDescripcion: "Comprobación automática de la respuesta de un modelo antes de mostrarla o usarla: formato, rangos, fuentes y reglas de negocio."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué validar?"
    r: "Esquema, tipos, rangos, fuentes citadas y reglas de negocio."
  - p: "¿Y si falla?"
    r: "Reintenta con el error, usa valores seguros o deriva a una persona."
---

## En qué consiste

Un modelo puede devolver un JSON inválido, un importe imposible o una fecha inventada. La validación detecta esos casos y decide: reintentar, corregir o derivar.

Es la última línea de defensa. Incluso con buen prompt y RAG, la salida debe validarse antes de tocar un sistema real.

## Una analogía para entenderlo

> El control de calidad antes de enviar el paquete: se mira que esté bien cerrado y con la dirección correcta.

## Ejemplo real de negocio

Un agente extrae importes de facturas. El validador comprueba que base + IVA = total; si no cuadra, no registra nada y avisa.

## Cómo aplicarlo en tu pyme

Nunca conectes una salida del modelo directamente a una base de datos o a un email sin validar.

## Errores frecuentes

Validar solo el formato, no los valores o no definir qué hacer cuando falla.
