---
termino: "Token"
nombreCompleto: "Token"
slug: "token"
categoria: "fundamentos"
nivel: "basico"
definicionCorta: "Unidad de tokenización: pieza de texto —o de otro tipo de entrada— que un modelo procesa. Puede ser una palabra, un trozo de palabra, un signo o un token especial."
sinonimos: ["Tokens"]
relacionados: ["ventana-de-contexto", "coste-por-token", "llm", "embedding"]
metaTitulo: "Qué es Token en IA: guía para pymes"
metaDescripcion: "Unidad de tokenización: pieza de texto —o de otro tipo de entrada— que un modelo procesa. Puede ser una palabra, un trozo de palabra, un signo o un token especial."
actualizado: 2026-11-22
destacado: true
faq:
  - p: "¿Cómo reduzco el número de tokens?"
    r: "Sé breve en las instrucciones, elimina texto repetido y divide documentos largos en fragmentos relevantes."
  - p: "¿Los acentos cuentan?"
    r: "Sí. Los acentos y los signos pueden cambiar la tokenización, sobre todo en español."
---

## En qué consiste

Los modelos no leen letras ni palabras como nosotros: trocean el texto en piezas llamadas tokens. «Inteligencia» puede ser un token o varios según el modelo. Los espacios y los acentos también influyen en cómo se parte el texto.

Los tokens aparecen en dos sitios clave: la ventana de contexto (cuántos caben a la vez) y el precio (cuántos consumes). Por eso un prompt enorme con diez documentos puede costar más y dejar menos espacio para la respuesta.

## Una analogía para entenderlo

> Son las piezas de Lego con las que se construye el texto. Cuantas más piezas, más grande es la construcción y más caro el kit.

## Ejemplo real de negocio

Un despacho de abogados envía contratos de 30 páginas al asistente para resumirlos. Antes de lanzarlo, calcula tokens para saber si caben y cuánto costará cada consulta.

## Cómo aplicarlo en tu pyme

Controla la longitud de las instrucciones y de los documentos que envías. Si vas a procesar mucho volumen, mide el coste por token y considera resumir o dividir la información.

## Errores frecuentes

Asumir que un token es una palabra, que todos los modelos tokenizan igual o que pagas por pregunta en lugar de por tokens procesados.
