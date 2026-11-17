# 2026-11-17 · docs(protocol): migra protocolo de agentes IA a v5.7.0

**Agente:** Claude · **Rama:** `feature/protocolo-v5` → `develop`

## Cambios
- Instalados `.ai/`, `AGENTS.md` (§0 completo), `CLAUDE.md`, `GEMINI.md`, `.prettierignore` desde el master 5.7.0.
- Changelog convertido a formato compacto (13 entradas → 13 líneas + 13 detalles verbatim en `changelog/`).
- Creados `00-repo-map.md`, `09-working-state.md`, `INDEX.md`, `INDEX-anexos.md`.
- `05-ai-rules.md` reescrito: el contenido previo era la plantilla genérica v2.0 (423 líneas) y se reemplazó por reglas propias.
- `README.md` de docs: rutas absolutas rotas reemplazadas por puntero a `INDEX.md`.

## Motivo
Alinear el repo al protocolo vigente.

## Archivos
- `+.ai/**`, `+CLAUDE.md`, `+GEMINI.md`, `+.prettierignore`, `~AGENTS.md`
- `+docs/INDEX.md`, `+docs/INDEX-anexos.md`, `+docs/00-repo-map.md`, `+docs/09-working-state.md`, `+docs/changelog/*`
- `~docs/05-ai-rules.md`, `~docs/07-changelog.md`, `~docs/README.md`, `~docs/08-known-issues.md`

## Base de datos
No aplica.

## Decisiones
No aplica.

## Validaciones
- Ver entrega: check-context, selftest y `npm run check` (antes/después iguales).

## Pendientes
- Push y PR a cargo del dueño.
