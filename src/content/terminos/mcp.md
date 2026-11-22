---
termino: "MCP"
nombreCompleto: "Model Context Protocol"
slug: "mcp"
categoria: "agentes"
nivel: "intermedio"
definicionCorta: "Estándar abierto que define cómo conectar modelos y agentes con herramientas, datos y servicios de forma uniforme."
sinonimos: ["Model Context Protocol", "Protocolo de contexto de modelo"]
relacionados: ["tool-use", "function-calling", "api", "agente-de-ia"]
metaTitulo: "Qué es MCP en IA: guía para pymes"
metaDescripcion: "Estándar abierto que define cómo conectar modelos y agentes con herramientas, datos y servicios de forma uniforme. Explicado para pymes."
actualizado: 2026-11-22
destacado: true
faq:
  - p: "¿Quién lo creó?"
    r: "Lo impulsó Anthropic como estándar abierto y lo adopta un ecosistema creciente de herramientas y clientes."
  - p: "¿Es seguro?"
    r: "Depende del servidor y de los permisos. Trata cada servidor MCP como una integración con acceso a datos: audítalo."
---

## En qué consiste

Antes de MCP, cada integración se hacía a medida. MCP propone un lenguaje común: un servidor expone herramientas, recursos y plantillas, y un cliente (el agente) los descubre y usa. Así una misma conexión sirve para distintos modelos y aplicaciones.

No es un modelo ni una app. Es un protocolo. Su valor está en la interoperabilidad, pero también introduce riesgos: un servidor MCP puede acceder a datos sensibles. Hay que revisar permisos, autenticación y qué se expone.

## Una analogía para entenderlo

> Un enchufe universal: cualquier aparato puede conectarse si cumple el estándar, sin cambiar la instalación de casa.

## Ejemplo real de negocio

Una agencia conecta su agente a Notion, GitHub y Supabase mediante servidores MCP. El agente puede leer documentación y consultar datos sin una integración distinta para cada modelo.

## Cómo aplicarlo en tu pyme

Te permite reutilizar integraciones y evitar depender de un solo proveedor. Empieza con servidores oficiales o auditados y limita el acceso a lo necesario.

## Errores frecuentes

Confundirlo con un modelo o una aplicación, creer que es solo para desarrolladores o que es seguro por defecto.
