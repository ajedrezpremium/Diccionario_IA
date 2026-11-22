---
termino: "Webhook"
nombreCompleto: "Webhook"
slug: "webhook"
categoria: "herramientas-desarrollo"
nivel: "intermedio"
definicionCorta: "Mecanismo por el que un sistema avisa automáticamente a otro cuando ocurre un evento, enviando datos a una dirección configurada."
sinonimos: ["Notificación web", "Callback HTTP"]
relacionados: ["api", "endpoint", "workflow", "automatizacion-con-ia"]
metaTitulo: "Qué es Webhook en IA: guía para pymes"
metaDescripcion: "Mecanismo por el que un sistema avisa automáticamente a otro cuando ocurre un evento, enviando datos a una dirección configurada."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Diferencia con una API?"
    r: "La API la llamas tú; el webhook te llama a ti cuando ocurre un evento. Se complementan."
  - p: "¿Qué pasa si mi sistema está caído?"
    r: "El emisor suele reintentar. Diseña el webhook para ser idempotente y no duplicar acciones."
---

## En qué consiste

En lugar de que tu sistema pregunte cada minuto «¿hay algo nuevo?», el otro sistema le avisa cuando ocurre. Un pago completado, un formulario enviado o un ticket creado pueden disparar un webhook con los datos del evento.

Es la base de muchas automatizaciones: recibes el aviso, validas la firma, ejecutas el workflow y respondes rápido. Si tu proceso tarda, conviene encolar el trabajo y contestar de inmediato para que el emisor no lo interprete como un fallo.

## Una analogía para entenderlo

> El timbre de casa: no sales cada minuto a mirar si hay alguien, suena cuando llega una visita.

## Ejemplo real de negocio

Cuando alguien rellena el formulario del libro, un webhook avisa a la agencia. El sistema guarda el lead, envía el PDF y notifica al equipo sin intervención manual.

## Cómo aplicarlo en tu pyme

Úsalo para conectar herramientas sin polling constante. Verifica la autenticidad del aviso, controla duplicados y registra los fallos para poder reintentar.

## Errores frecuentes

Confiar en cualquier petición entrante, no verificar la firma o hacer todo el trabajo dentro del webhook y bloquear la respuesta.
