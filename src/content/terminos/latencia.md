---
termino: "Latencia"
nombreCompleto: "Latencia"
slug: "latencia"
categoria: "herramientas-desarrollo"
nivel: "basico"
definicionCorta: "Tiempo que transcurre desde que se hace una petición hasta que llega la primera respuesta o la respuesta completa."
sinonimos: ["Tiempo de respuesta", "Delay"]
relacionados: ["streaming", "inferencia", "rate-limit", "observabilidad"]
metaTitulo: "Qué es Latencia en IA: guía para pymes"
metaDescripcion: "Tiempo que transcurre desde que se hace una petición hasta que llega la primera respuesta o la respuesta completa. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Por qué tarda tanto a veces?"
    r: "Por la carga del proveedor, respuestas largas o cadenas de herramientas. No siempre es tu web."
  - p: "¿Cómo la reduzco?"
    r: "Respuestas más cortas, streaming, modelos adecuados y menos pasos intermedios. Mide antes y después."
---

## En qué consiste

La latencia se mide en milisegundos o segundos y depende de la red, del modelo, del tamaño de la respuesta y de la carga del proveedor. En un chat, importa más el tiempo hasta el primer token que el total: si ves que escribe, la espera se percibe menor.

Un agente con varios pasos acumula latencia: consulta, piensa, ejecuta, vuelve a consultar. Si cada paso tarda dos segundos, la respuesta final puede tardar diez. Diseña para que el usuario sepa qué está pasando.

## Una analogía para entenderlo

> Pedir un café: no es lo mismo que te lo sirvan en 30 segundos que esperar cinco minutos sin saber si te han oído.

## Ejemplo real de negocio

Un asistente de reservas muestra «consultando disponibilidad…» mientras llama al calendario. Sin ese aviso, el usuario cree que se ha colgado y cierra.

## Cómo aplicarlo en tu pyme

Mide la latencia con usuarios reales y por tarea. Si es alta, usa streaming, modelos más pequeños o caché. La paciencia del cliente es limitada.

## Errores frecuentes

Confundir latencia con velocidad de internet, optimizar solo el modelo e ignorar las llamadas a herramientas.
