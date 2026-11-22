---
termino: "Destilación"
nombreCompleto: "Destilación de modelos"
slug: "destilacion"
categoria: "modelos"
nivel: "avanzado"
definicionCorta: "Técnica para entrenar un modelo pequeño imitando las respuestas de uno grande, con el objetivo de reducir coste y latencia."
sinonimos: ["Knowledge distillation", "Destilación de conocimiento"]
relacionados: ["modelo-abierto", "fine-tuning", "coste-por-token", "inferencia"]
metaTitulo: "Qué es Destilación en IA: guía para pymes"
metaDescripcion: "Técnica para entrenar un modelo pequeño imitando las respuestas de uno grande, con el objetivo de reducir coste y latencia."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Pierde calidad?"
    r: "Suele perder algo, sobre todo en casos límite. La clave es medir en tu conjunto de prueba."
  - p: "¿Cuándo merece la pena?"
    r: "Con volumen alto y tareas repetitivas donde el coste por inferencia pesa de verdad."
---

## En qué consiste

La destilación usa un modelo grande como profesor: genera respuestas para muchos ejemplos y el modelo pequeño aprende a imitarlas. El resultado suele ser un modelo más barato y rápido que conserva buena parte de la calidad en la tarea concreta.

No es magia: el pequeño no hereda toda la capacidad del grande. Funciona mejor cuando el dominio está acotado y los ejemplos son representativos. Hay que evaluar la pérdida de calidad y el coste de mantener el proceso.

## Una analogía para entenderlo

> Un profesor experto prepara a un alumno para que resuelva lo esencial sin llevar al profesor a cada visita.

## Ejemplo real de negocio

Una startup clasifica miles de tickets al día. Destila un modelo grande en uno pequeño y mantiene el 90 % de la precisión con una fracción del coste.

## Cómo aplicarlo en tu pyme

Tiene sentido cuando el volumen es alto y la tarea está bien definida. Empieza con el grande, mide, y destila solo si el ahorro compensa.

## Errores frecuentes

Creer que el pequeño es idéntico, que funciona para cualquier tarea o que el proceso es gratis.
