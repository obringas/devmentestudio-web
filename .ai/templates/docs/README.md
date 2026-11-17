# Documentación de <Nombre del proyecto>

> Memoria canónica del proyecto. La mantienen humanos y agentes IA siguiendo `AGENTS.md` y `.ai/rules/70-docs-close.md` y `71-docs-bootstrap.md`.

## Estado

- **Estado documental:** inicializado · parcial · completo → `[PENDIENTE]`
- **Última revisión integral:** YYYY-MM-DD
- **Stack:** `[PENDIENTE: backend-dotnet | frontend-angular | fullstack]`

## Índice

| Documento | Propósito | Leer cuando… |
|---|---|---|
| [`INDEX.md`](./INDEX.md) | Árbol de secciones con anclas (para agentes) | **Siempre, primero** |
| [`00-repo-map.md`](./00-repo-map.md) | Estructura de carpetas comentada | Primer contacto; crear algo nuevo |
| [`01-context.md`](./01-context.md) | Propósito, usuarios, dominio, glosario | Primer contacto; dudas de negocio |
| [`02-architecture.md`](./02-architecture.md) | Stack, capas, flujos, base de datos, integraciones | Cualquier cambio de código o datos |
| [`03-setup.md`](./03-setup.md) | Entorno, build, tests, migraciones, deploy | Ejecutar o validar algo |
| [`04-conventions.md`](./04-conventions.md) | Naming, estilo, ramas, commits | Escribir código o proponer cambios |
| [`05-ai-rules.md`](./05-ai-rules.md) | Reglas y excepciones propias de este proyecto | Siempre (es corto) |
| [`06-decisions.md`](./06-decisions.md) | ADRs | Decisión técnica relevante |
| [`07-changelog.md`](./07-changelog.md) | Log compacto de cambios; detalle en `changelog/` | Últimas líneas; siempre al cerrar |
| [`08-known-issues.md`](./08-known-issues.md) | Bugs, deuda, limitaciones | Bug raro; antes de refactorizar |
| [`09-working-state.md`](./09-working-state.md) | Tarea en curso y próximos pasos | **Siempre al arrancar** |

## Fuentes integradas

- `[PENDIENTE: listar README, wikis, docs previos que se consolidaron y su estado]`

## Regla de mantenimiento

La documentación describe el repositorio **actual**. Lo histórico va a `07-changelog.md` o a ADRs con estado `Reemplazada`. Un hecho vive en un solo documento; los demás enlazan.
