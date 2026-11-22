---
termino: "JSON"
nombreCompleto: "JavaScript Object Notation"
slug: "json"
categoria: "herramientas-desarrollo"
nivel: "basico"
definicionCorta: "Formato de texto ligero para estructurar datos en pares de clave y valor, muy usado para intercambiar información entre sistemas."
sinonimos: ["JavaScript Object Notation"]
relacionados: ["api", "salida-estructurada", "endpoint", "function-calling"]
metaTitulo: "Qué es JSON en IA: guía para pymes"
metaDescripcion: "Formato de texto ligero para estructurar datos en pares de clave y valor, muy usado para intercambiar información entre sistemas."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué diferencia hay con CSV?"
    r: "El CSV es plano, para tablas. El JSON permite anidar estructuras y es más habitual en APIs."
  - p: "¿Puedo pedir JSON a cualquier modelo?"
    r: "Puedes pedirlo, pero no todos lo garantizan. Usa modo JSON o salida estructurada y valida el resultado."
---

## En qué consiste

Un JSON se parece a una ficha: `{"cliente": "Ana", "pedido": 42, "urgente": true}`. Es legible por personas y fácil de procesar por máquinas. Por eso es el formato estándar de las APIs modernas.

En IA, el JSON es clave para que el modelo devuelva datos utilizables: un importe, una categoría, una lista de tareas. Si el formato falla, el sistema no puede procesarlo. Por eso se valida siempre antes de usarlo.

## Una analogía para entenderlo

> Una etiqueta de equipaje con campos fijos: nombre, destino, vuelo. Si falta un campo, el sistema no sabe qué hacer.

## Ejemplo real de negocio

Un clasificador devuelve `{"categoria": "facturacion", "prioridad": "alta", "resumen": "..."}`. El CRM lo lee y asigna el ticket sin intervención manual.

## Cómo aplicarlo en tu pyme

Exige salidas estructuradas cuando el resultado vaya a alimentar otro sistema. Un texto bonito no sirve si luego hay que copiarlo a mano.

## Errores frecuentes

Creer que el modelo siempre devuelve JSON válido, no validar el esquema o aceptar campos inventados.
