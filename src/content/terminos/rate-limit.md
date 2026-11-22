---
termino: "Rate limit"
nombreCompleto: "Rate limit (límite de peticiones)"
slug: "rate-limit"
categoria: "herramientas-desarrollo"
nivel: "intermedio"
definicionCorta: "Restricción del número de peticiones que un usuario o aplicación puede hacer a un servicio en un periodo de tiempo."
sinonimos: ["Límite de peticiones", "Límite de velocidad"]
relacionados: ["api", "latencia", "observabilidad", "coste-por-token"]
metaTitulo: "Qué es Rate limit en IA: guía para pymes"
metaDescripcion: "Restricción del número de peticiones que un usuario o aplicación puede hacer a un servicio en un periodo de tiempo. Explicado para pymes."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué pasa si supero el límite?"
    r: "El servicio responde con un error y te pide esperar. Algunos incluyen cabeceras con el tiempo restante."
  - p: "¿Rate limit y cuota son lo mismo?"
    r: "No exactamente. El rate limit es por tiempo; la cuota suele ser un máximo total por periodo o por contrato."
---

## En qué consiste

Los proveedores limitan peticiones por minuto, por día o por tokens. Es una protección para que un cliente no tumbe el servicio de todos. Si lo superas, recibes un error 429 y debes esperar.

Tu propia web también necesita límites: si el chat es gratis y abierto, alguien puede usarlo para generar miles de respuestas a tu costa. Un límite por IP y por sesión evita sustos en la factura.

## Una analogía para entenderlo

> El aforo de un local: puede entrar gente, pero no toda a la vez. Cuando se llena, se hace cola.

## Ejemplo real de negocio

Una web permite 12 preguntas por minuto y 120 al día por visitante. Un usuario legítimo no lo nota; un script abusivo se queda fuera.

## Cómo aplicarlo en tu pyme

Configura límites antes de publicar y avisa al usuario con un mensaje claro. Revisa los límites de tu proveedor para no romper en horas punta.

## Errores frecuentes

Creer que el límite es un castigo, no medir el consumo real o poner un límite tan bajo que molestes a clientes legítimos.
