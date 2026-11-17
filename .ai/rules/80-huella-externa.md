# 80 — Modo huella externa: ningún rastro de IA en el repositorio

> Se carga **siempre** cuando `AGENTS.md §0 → Huella = externa`. Prevalece sobre cualquier otra regla que diga "escribí en `docs/`" o "commiteá el changelog": en este modo todo eso vive **fuera del repo**.
> Objetivo: el repositorio de la organización recibe código y configuración de build como los produciría cualquier desarrollador; el protocolo, la memoria y cualquier evidencia de asistencia por IA quedan en una carpeta *sidecar* local.

---

## 1. Dónde vive cada cosa

```text
<SIDECAR>\<nombre-del-repo>\        ← fuera del repo; p. ej. E:\ProgramacionNet\.ai-sidecar\<repo>\
├── AGENTS.md                       protocolo (§0: Huella = externa · Código = ruta del repo)
├── .ai/                            reglas, plantillas, tools
└── docs/                           TODA la memoria: INDEX, 00..09, changelog/, working-state

<CÓDIGO>\                           ← el repo de la organización
└── (solo código, tests, config de build y la documentación que la organización ya exige)
```

- `AGENTS.md §0 → Código` apunta al repo. Toda ruta `docs/…` del protocolo se resuelve contra `<SIDECAR>\<repo>\docs\`.
- El agente **lee** el código en `<CÓDIGO>` y **escribe** memoria en `<SIDECAR>`. En `<CÓDIGO>` solo escribe lo que la tarea pide (código, tests, migraciones, config necesaria).
- Los agentes encuentran el sidecar por el archivo de entrada **global** de cada herramienta (`.ai/templates/global/`), nunca por un archivo dentro del repo.

## 2. Prohibido dentro del repositorio

1. **Archivos del protocolo:** `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.ai/`, `.cursorrules`, `.cursor/`, `copilot-instructions.md`, `.claude/`, `.codex/`, `.gemini/`, `DESIGN.md`/`PRODUCT.md` de Impeccable, `docs/INDEX.md`, `docs/09-working-state.md`, `docs/changelog/`, `docs/05-ai-rules.md`, `.prettierignore` del template.
2. **Menciones a IA** en commits, PR, comentarios de código, docs del repo, nombres de rama o archivos: `Claude`, `Codex`, `Gemini`, `Copilot`, `ChatGPT`, `OpenAI`, `Anthropic`, `Co-Authored-By`, `Generated with`, `AI-generated`, `agente IA`, `asistido por IA`, `LLM`, `prompt engineering`, `prompt de IA`, `AI-assisted`. El detector de `check-context` las busca. La lista normativa es `AI_MARKERS` en `.ai/tools/lib.js`; si divergen, manda esta regla y se corrige el detector.
3. **Trailers de autoría automática** en commits (`Co-Authored-By`, `Signed-off-by` de herramientas). El autor del commit es la persona configurada en Git.
4. **Hooks o scripts del protocolo** en el repo (`.git/hooks` es local y no se commitea, pero no referencies el sidecar desde un archivo versionado).
5. **Estilo que delate generación:** comentarios explicando lo obvio, encabezados "Resumen/Decisiones" en archivos de código, emojis, bloques `TODO` genéricos. El código debe parecer escrito por el desarrollador que lo commitea, con sus convenciones.

## 3. Qué sí entra al repo

- Código, tests, migraciones, scripts de build, configuración necesaria para compilar y desplegar.
- La documentación que **la organización ya exige** en su formato (README, docs de API, ADRs si el equipo los usa), escrita como la escribiría el equipo, sin referencias al protocolo ni al sidecar.
- Mensajes de commit con Conventional Commits y referencia al work item: eso es práctica estándar, no huella.

## 4. Flujo de cierre en modo externo

1. Memoria en `<SIDECAR>\docs\` según `70-docs-close.md` (changelog, working-state, `regen-index.js --root <SIDECAR> --docs <SIDECAR>\docs`).
2. **Detector de huella antes de cada commit:** `node <SIDECAR>\.ai\tools\check-context.js --root <SIDECAR> --docs <SIDECAR>\docs --mode externa --code <CÓDIGO>`. Revisa archivos rastreados y staged, el diff staged y los últimos mensajes de commit. **Con un solo hallazgo, no se commitea.**
3. `git status --short` del repo mostrado en la entrega: solo archivos de código/tests/config.
4. Entrega con el formato de `00-core.md §6`, **en el chat**, no en el repo.

## 5. Instalación del modo

1. Crear `<SIDECAR>\<repo>\` y copiar ahí `AGENTS.md`, `.ai\` (sin `CLAUDE.md`, `GEMINI.md` ni `.prettierignore`: no hacen falta y no deben llegar al repo).
2. `AGENTS.md §0`: `Huella = externa`, `Código = <ruta del repo>`.
3. Instalar los archivos de entrada global (una vez por máquina) desde `.ai\templates\global\`: Claude Code → `%USERPROFILE%\.claude\CLAUDE.md`; Codex → `%USERPROFILE%\.codex\AGENTS.md`; Gemini CLI → `%USERPROFILE%\.gemini\GEMINI.md`. Cada uno dice: "si existe `<SIDECAR>\<carpeta actual>\AGENTS.md`, leelo y seguilo".
4. Hook local (obligatorio en este modo): `node <SIDECAR>\.ai\tools\install-hooks.js --code <CÓDIGO> --sidecar <SIDECAR>\<repo>` escribe en el repo `.git\hooks\pre-commit` (corre el detector) y `.git\info\exclude` con los nombres prohibidos de §2 (segunda red: aunque alguien copie un archivo del protocolo dentro del repo, `git add` no lo toma). Ambos son locales y no se versionan: no dejan rastro. **Nunca** uses `.gitignore` para esto: se commitea y lista lo que estás ocultando.
5. Generar `docs/` en el sidecar con `71-docs-bootstrap.md`, leyendo el código en `<CÓDIGO>`.

## 6. Si algo se filtró

Antes de push: `git reset --soft` y rehacer el commit sin el archivo o la mención. Después de push: avisar al usuario de inmediato; no reescribir historia compartida sin su decisión.
