---
termino: "Streaming"
nombreCompleto: "Streaming de respuestas"
slug: "streaming"
categoria: "herramientas-desarrollo"
nivel: "intermedio"
definicionCorta: "Técnica que envía la respuesta del modelo por fragmentos según se genera, en lugar de esperar a tenerla completa."
sinonimos: ["Respuesta en streaming", "Transmisión"]
relacionados: ["latencia", "inferencia", "api", "agente-de-ia"]
metaTitulo: "Qué es Streaming en IA: guía para pymes"
metaDescripcion: "Técnica que envía la respuesta del modelo por fragmentos según se genera, en lugar de esperar a tenerla completa. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿El streaming cuesta más?"
    r: "No por sí mismo. Pagas los tokens generados; el streaming solo cambia cómo llegan."
  - p: "¿Se puede cancelar?"
    r: "Sí, si el cliente cierra la conexión y el servidor aborta la petición. Conviene implementarlo."
---

## En qué consiste

Un modelo genera texto token a token. Sin streaming, el servidor espera a terminar y envía todo de golpe. Con streaming, cada fragmento llega al navegador y se muestra al instante. La respuesta total tarda lo mismo, pero se percibe mucho más rápida.

También mejora la experiencia en tareas largas: el usuario ve progreso y puede cancelar. A cambio, el código es más complejo y hay que gestionar cortes, errores a mitad y el formato final.

## Una analogía para entenderlo

> Ver una serie por capítulos frente a esperar a que salga la temporada completa. El contenido es el mismo; la espera, no.

## Ejemplo real de negocio

El asistente del glosario muestra la respuesta palabra a palabra y un botón de detener. Si el usuario cierra, la petición se cancela y no se cobra el resto.

## Cómo aplicarlo en tu pyme

Úsalo en cualquier chat o generación larga. Es una mejora de percepción barata comparada con cambiar de modelo.

## Errores frecuentes

Creer que reduce el coste, no gestionar errores a mitad de stream o mostrar texto sin formato hasta el final.
