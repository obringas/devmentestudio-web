# Reglas para agentes en este proyecto

> Excepciones y restricciones **propias de devmentestudio-web**. No repite `.ai/rules/`. Fuentes: `PRODUCT.md`, `02-architecture.md`, `04-conventions.md`, changelog.

## Restricciones
1. Contenido comercial: sin afirmaciones absolutas, sin métricas inventadas, sin nombres de clientes ni marcas protegidas (`PRODUCT.md`). Casos de portfolio siempre anonimizados, también en capturas.
2. Copy localizada (es/en) en `src/app/data/*.data.ts`, no embebida en componentes (changelog 2026-04-24). Español es el idioma por defecto.
3. Identidad visual: leer `DESIGN.md` por ancla antes de tocar UI. Un solo acento primario azure; logo y favicon según `02-architecture.md#activos-de-marca`.
4. `DESIGN.md`, `PRODUCT.md` y `.impeccable/` son de Impeccable: no se mueven ni se reescriben sin pedido explícito.
5. Secretos: `GEMINI_API_KEY` solo en servidor (ADR-0001). `.env` no se lee ni se copia a la documentación. La access key de Web3Forms es pública por diseño (`site.config.ts`).
6. CSP en `vercel.json`: toda integración HTTP cliente nueva exige actualizar `connect-src`.
7. Endpoint de chat: existe en `api/chat.js` y en `src/server.ts`; no divergir (→ `08-known-issues.md`).
8. Dependencias: no agregar ni cambiar versiones (ver conflicto Tailwind en `08`) sin pedido explícito.
9. No hacer push ni merge a `main`: integra el dueño del proyecto vía GitFlow.

## Excepciones a `.ai/rules/`
| Regla | Excepción | Motivo | Hasta cuándo |
|---|---|---|---|
| Azure DevOps / `AB#` en commits | Repo en GitHub, sin work items; no se exige `AB#` | Control de versiones declarado en `AGENTS.md §0` | permanente |
| Idioma de commits | Conventional Commits con descripción en castellano | `04-conventions.md` | permanente |
| Validación | `npm run check` (lint + `test:ci` + build) antes de push | Único gate existente; no hay CI | hasta crear CI |

## Contexto que el agente debe saber
- Sitio corporativo Angular 21 SSR desplegado en Vercel; sin base de datos.
- `AI_CONTEXT.md` (raíz) es insumo histórico; `/docs` manda ante contradicción.
- En Windows, `npm run check` puede fallar al final del build por `EPERM` sobre `dist/` si algún proceso lo bloquea; el bundle se genera igual. Reportar, no ocultar.
- El presupuesto de estilos de `home.component.ts` ya está excedido por unos bytes (warning previo).
