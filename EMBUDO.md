# Embudo de contenido — Diccionario IA / Chess AI Agency

Estrategia de 3 niveles. Cada nivel tiene un propósito distinto y no compiten entre sí.

## Nivel 1 — Web + agente (120 términos, gratis, con RAG)

- **Qué:** glosario público, 120 fichas, agente conversacional con recuperación real (`RAG`) sobre el contenido de las fichas.
- **Para qué:** captar tráfico SEO y que el visitante resuelva dudas con el contenido propio del diccionario (no con conocimiento genérico del modelo).
- **Acceso:** gratuito, sin registro.
- **Estado:** 100 términos publicados. RAG pendiente de implementar (Fase 1 del plan v2.0).

## Nivel 2 — Libro anual (100 términos, pago, Amazon)

- **Qué:** edición anual de 100 términos, diseño y metodología profesional, con índice, FAQ, errores frecuentes y checklist.
- **Formato:** tapa blanda **14,99 €** · ebook **6,99 €** en Amazon (editorial JRedition, autor Roberto Páramos Domínguez).
- **Para qué:** monetizar a quien quiere el contenido completo en un soporte editado y duradero.
- **Acceso:** de pago. No se regala ni se incluye en la guía gratuita.

## Nivel 3 — Guía rápida (20 términos, gratis, contra email)

- **Qué:** PDF de 24 páginas con 20 términos esenciales, ejemplos y checklist inicial.
- **Para qué:** capturar el email y abrir una relación. Es la puerta de entrada, no el producto final.
- **Acceso:** descarga gratuita a cambio del correo (consentimiento RGPD).

## Cómo encajan

```
Guía gratis (20)  →  Web + agente (120, con RAG)  →  Libro Amazon (100, pago)
   capta email         demuestra valor y resuelve        monetiza al lector
                       dudas con contenido real          convencido
```

- La guía no canibaliza al libro: da solo 20 términos y deriva explícitamente a Amazon para los 100.
- La web no canibaliza al libro: es consulta puntual y navegable; el libro es una edición anual editada.
- El RAG es la pieza clave del nivel 1: sin él, el agente responde con conocimiento genérico; con él, responde con las fichas reales del diccionario.

## Próximo paso

Implementar RAG en el agente (recuperar las fichas más relevantes por similitud e inyectarlas en el prompt) y ampliar de 100 a 120 términos.
