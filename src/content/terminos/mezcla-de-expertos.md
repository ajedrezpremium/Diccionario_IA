---
termino: "Mezcla de expertos"
nombreCompleto: "Mezcla de expertos (MoE)"
slug: "mezcla-de-expertos"
categoria: "modelos"
nivel: "avanzado"
definicionCorta: "Arquitectura que reparte el trabajo entre varias subredes especializadas y activa solo las más adecuadas para cada entrada."
sinonimos: ["MoE", "Mixture of Experts"]
relacionados: ["llm", "parametros", "inferencia", "multiagente"]
metaTitulo: "Qué es Mezcla de expertos en IA: guía para pymes"
metaDescripcion: "Arquitectura que reparte el trabajo entre varias subredes especializadas y activa solo las más adecuadas para cada entrada."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Qué ventaja tiene?"
    r: "Más capacidad total con menos cómputo activo por token, lo que puede abaratar la inferencia."
  - p: "¿Es lo mismo que un sistema multiagente?"
    r: "No. MoE es una arquitectura interna del modelo; multiagente es una organización de varios modelos o agentes que colaboran."
---

## En qué consiste

En una arquitectura MoE, un mecanismo de enrutamiento decide qué «expertos» procesan cada token. Aunque el modelo tenga muchos parámetros en total, solo activa una parte en cada paso. Eso permite modelos grandes con un coste de inferencia menor.

No significa que cada experto sea un especialista humano en medicina o derecho. Son subredes entrenadas conjuntamente. La calidad depende del entrenamiento y del enrutador, no de una división temática que hayamos diseñado nosotros.

## Una analogía para entenderlo

> Una empresa con departamentos: cada consulta va al equipo adecuado en vez de pasar por todos a la vez.

## Ejemplo real de negocio

Un modelo con 100.000 millones de parámetros puede activar solo 20.000 millones por token. El proveedor lo presenta como más eficiente, pero la latencia real depende de la infraestructura.

## Cómo aplicarlo en tu pyme

Te ayuda a entender por qué un modelo grande puede ser asequible. No es un criterio suficiente para elegirlo: mide calidad y coste en tu caso.

## Errores frecuentes

Creer que cada experto es un especialista humano, que siempre es más rápido o que es fácil de auditar por partes.
