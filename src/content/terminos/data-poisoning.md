---
termino: "Data Poisoning"
nombreCompleto: "Data Poisoning (envenenamiento de datos)"
slug: "data-poisoning"
categoria: "seguridad-y-etica"
nivel: "avanzado"
definicionCorta: "Ataque que introduce datos maliciosos o engañosos en el conjunto de entrenamiento o en el conocimiento recuperado para manipular el modelo."
sinonimos: ["Envenenamiento de datos"]
relacionados: ["curacion-de-datos", "red-teaming", "rag", "gobernanza-de-datos"]
metaTitulo: "Qué es Data Poisoning en IA: guía para pymes"
metaDescripcion: "Ataque que introduce datos maliciosos o engañosos en el conjunto de entrenamiento o en el conocimiento recuperado para manipular el modelo."
actualizado: 2026-11-22
destacado: false
faq:
  - p: "¿Solo afecta al entrenamiento?"
    r: "No: en RAG afecta a los documentos indexados."
  - p: "¿Cómo se detecta?"
    r: "Con trazas, control de fuentes y pruebas adversariales."
---

## En qué consiste

En RAG, basta con subir un documento con instrucciones ocultas o información falsa para que el agente lo recupere y lousar como fuente.

La defensa combina control de quién puede subir documentos, validación de contenido, trazas y revisión periódica del corpus.

## Una analogía para entenderlo

> Meter una página falsa en una enciclopedia para que todos la copien.

## Ejemplo real de negocio

Un atacante sube una ficha que dice «ignora la política de reembolsos». El agente la recupera y responde mal hasta que se detecta.

## Cómo aplicarlo en tu pyme

Trata tu corpus como un sistema de producción: permisos, validación y auditoría. No cualquiera debería poder subir documentos.

## Errores frecuentes

Indexar contenido sin revisar o no saber de dónde vino cada fragmento.
