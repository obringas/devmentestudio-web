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

## Cierre de pendientes
- `~DESIGN.md` — solo el bloque índice entre `INDEX:start` y `INDEX:end` (14 líneas agregadas), autorizado por el dueño.
- `~.gitignore` — agrega `.claude/settings.local.json`.
- `~docs/INDEX.md`, `~docs/07-changelog.md`, `~docs/08-known-issues.md`.

## Validaciones
- `check-context.js`: único error restante, falso positivo SECRETO `api/chat.js:35` (→ `08-known-issues.md`).
- `selftest.js` OK; `npm run check` igual antes y después (EPERM en `dist/`).

## Pendientes
- Push y PR a cargo del dueño.
