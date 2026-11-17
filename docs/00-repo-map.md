# Mapa del repositorio

> Estructura real a 2-3 niveles, sin `node_modules`, `dist` ni `.angular`. Hechos del árbol; detalle de capas en `02-architecture.md`.

## Raíz
```text
.ai/              protocolo de agentes IA (reglas, plantillas, herramientas); no editar a mano
.claude/          configuración local de Claude Code (no versionada)
.github/          workflows de GitHub (hoy vacío)
.impeccable/      artefactos de revisión de diseño (Impeccable)
.vscode/          ajustes del editor
api/              función serverless de Vercel (chat.js)
docs/             memoria del proyecto (este árbol)
public/           estáticos servidos tal cual: logos, favicons, imágenes, robots.txt, sitemap.xml
src/              código Angular + SSR
AGENTS.md CLAUDE.md GEMINI.md   entrada del protocolo
DESIGN.md PRODUCT.md            sistema visual y producto (Impeccable)
AI_CONTEXT.md                   contexto histórico previo a /docs
LEGAL_REVIEW_CHECKLIST.md       checklist de revisión legal
vercel.json                     despliegue y headers (CSP)
```

## src/
```text
src/app/config/            configuración del sitio (site.config.ts)
src/app/core/services/     servicios transversales: chat, contacto, SEO, idioma
src/app/core/interceptors/ interceptores HTTP
src/app/data/              contenido y catálogos tipados (copy es/en)
src/app/features/          páginas: home, modernization, services, portfolio, about, contact, blog, legal
src/app/models/            contratos tipados
src/app/shared/components/ business (secciones comerciales), layout (header/footer), ui (chat)
src/app/shared/directives/ directivas reutilizables
src/app/shared/pipes/      pipes reutilizables
src/assets/                activos legados (poster del reel)
src/environments/          variables por entorno
src/server.ts              Express + SSR + POST /api/chat
```

## Qué NO va ahí
- Copy de UI dentro de componentes: va en `src/app/data/`.
- Secretos: nunca en `src/` ni `public/`; solo `.env` local o variables de Vercel.
- Documentación del protocolo: en `.ai/`, no en `docs/`.
