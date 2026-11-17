# Estado de trabajo

> Memoria de sesión. Lo lee cualquier agente al arrancar; lo actualiza quien corta la sesión.
> **Última actualización:** 2026-11-17 — Claude

## Tarea en curso

- **Pedido original:** Sin tarea en curso
- **Tipo:** inicialización documental (última: migración al protocolo 5.7.0)
- **Work item / rama:** `feature/protocolo-v5` → `develop` (local, sin push ni PR)
- **Estado:** terminada

## Hecho hasta ahora

- [x] Protocolo 5.7.0 instalado: `.ai/`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.prettierignore`.
- [x] `docs/` con INDEX generado, `00-repo-map`, changelog compacto y este archivo.

## Pendiente

- [ ] Revisar y hacer push de `develop` y `feature/protocolo-v5`; abrir PR.
- [ ] Agregar sección "Sistema visual" a `02-architecture.md` apuntando a `DESIGN.md` (fuera del alcance de la migración).
- [ ] Atender la deuda nueva de `08-known-issues.md` (Tailwind/PostCSS, CI, `AI_CONTEXT.md`).

## Supuestos abiertos

- `[SUPUESTO]` `main` sigue siendo la rama de producción; `develop` se creó desde `main` solo en local.

## Bloqueos / preguntas al usuario

- Ninguno.

## Validaciones pendientes

- `npm run check` termina con `EPERM` al limpiar `dist/` (igual antes y después de la migración).

## Notas para quien retome

El `AGENTS.md` anterior era genérico, sin reglas propias; `05-ai-rules.md` se reescribió desde cero con hechos del proyecto.
