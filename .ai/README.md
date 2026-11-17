# Protocolo para agentes IA — v5.7.1

Carpeta de reglas y plantillas que acompaña a `AGENTS.md`. Se copia completa al proyecto objetivo y **no se edita desde el proyecto**: las particularidades van en `docs/05-ai-rules.md`.

**Repo que ya tiene el protocolo viejo adentro y debe pasar a `externa`** (p. ej. una organización que no admite rastros): `PROMPT-migracion-a-huella-externa.md`. Inventaría rastros, mueve `/docs` al sidecar, limpia el repo, instala hook + `exclude`, y deja la decisión sobre el historial de Git en manos del usuario. **Dos repos (back + front) orquestados desde Cowork que deben quedar en `externa`**, cada uno en cualquier estado (sin protocolo, viejo adentro, 5.x adentro): `PROMPT-orquestador-dos-repos-huella-externa.md`; el orquestador genera un prompt por repo a partir de los dos anteriores, despacha primero el repo sin protocolo y verifica.

## Instalación en un proyecto

1. Copiar a la raíz del proyecto: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.prettierignore` (o fusionar sus líneas con el existente) y la carpeta `.ai/` completa.
2. Completar la tabla **"0. Perfil del proyecto"** de `AGENTS.md` (nombre, stack, base de datos, estado de `/docs`).
3. Si el proyecto ya tiene un `AGENTS.md`, comparar y fusionar; no pisarlo sin revisar.
4. Pedirle al agente la primera tarea:

   > Analizá este proyecto e inicializá o consolidá su documentación siguiendo `AGENTS.md`. No modifiques código funcional.

5. Revisar lo generado en `/docs`: que no haya inventado reglas ni ADRs, que no haya copiado secretos, que los comandos existan, que los `[PENDIENTE]` estén identificados.
6. **Guarda automática (recomendado):** `node .ai/tools/install-hooks.js` instala un hook `pre-commit` que corre `check-context.js`; para Azure Pipelines agregar un paso `node .ai/tools/check-context.js` antes del build (ver abajo). Requiere Node ≥ 16, que ya está en cualquier proyecto Angular o con tooling de .NET.
7. **Proyectos con UI:** tener la skill Impeccable instalada a nivel usuario, nunca en el repo (ver `.ai/rules/31-ui-design.md §9`; la versión se registra en `docs/03-setup.md`) y correr `/impeccable init` + `document` para generar `PRODUCT.md` y `DESIGN.md`. Opcional: `web-design-guidelines` de Vercel como auditoría.
8. Commit: `docs(protocol): incorpora protocolo para agentes IA v5.7.1`.

## Cómo descubre el protocolo cada herramienta

| Herramienta | Lee | Mecanismo |
|---|---|---|
| Codex | `AGENTS.md` | Nativo |
| Claude Code | `CLAUDE.md` | Importa `AGENTS.md` con `@AGENTS.md` |
| Gemini CLI | `GEMINI.md` | Instrucción de leer `AGENTS.md` (o `contextFileName` en `.gemini/settings.json`) |
| Otros (Cursor, Copilot, Aider) | — | Pedir explícitamente "seguí `AGENTS.md`" o agregar su wrapper mínimo apuntando a `AGENTS.md` |

## Estructura

```text
.ai/
├── README.md                 este archivo
├── rules/
│   ├── 00-core.md            flujo: clasificar, cargar contexto, diseñar, validar, cerrar, entregar
│   ├── 10-clean-code.md      código limpio, modular, reutilizable; smells; checklist
│   ├── 20-backend-dotnet.md  ASP.NET Core, capas, DI, asincronía, EF Core, logging
│   ├── 21-data-sqlserver.md  normalización, nombres, auditoría, transacciones, consultas, SP, scripts
│   ├── 30-frontend-angular.md capas UI, TypeScript, Signals/RxJS, HTTP, formularios, a11y, performance
│   ├── 31-ui-design.md       diseño UI/UX profesional con identidad; Impeccable + auditoría
│   ├── 32-ui-patterns.md     patrones por tipo de pantalla (solo al diseñar una)
│   ├── 40-git-workflow.md    GitFlow, Conventional Commits, PR, versionado, .gitignore
│   ├── 50-testing.md         orden de validación, qué testear, nombres, por stack, validación manual
│   ├── 60-security.md        secretos, auth, entradas, salidas, frontend, logs, dependencias
│   ├── 70-docs-close.md      cierre de tarea: qué registrar, formato y topes de INDEX, escritura densa (siempre al cerrar)
│   ├── 71-docs-bootstrap.md  construir/consolidar /docs desde cero (solo primer contacto o migración)
│   └── 80-huella-externa.md  modo sin rastro de IA en el repo: sidecar, prohibiciones, detector
├── tools/
│   ├── lib.js                utilidades compartidas, topes (LIMITS) en un solo lugar
│   ├── regen-index.js        genera docs/INDEX.md, INDEX-anexos.md e índices propios desde los encabezados reales
│   ├── check-context.js      verifica topes, costo de orientación, secretos y (externa) rastros de IA; exit 1 si falla
│   ├── run-quiet.js          envoltorio de build/tests/lint: resumen de ~50 tokens, log completo fuera del repo
│   ├── db-schema.js          genera docs/db-schema.md desde SQL Server (sys.*) vía sqlcmd; sql/db-schema.sql es la consulta
│   ├── selftest.js           prueba las herramientas con un fixture temporal; exit 1 si falla
│   └── install-hooks.js      instala el pre-commit que corre check-context
└── templates/
    ├── docs/                 semillas de docs/INDEX.md, INDEX-anexos.md, README.md, 00..09 y changelog/
    ├── sql/                  tabla.sql, transaccion.sql (plantillas de 21)
    ├── global/               archivos de entrada global por herramienta (modo externa)
    ├── pedido-tarea.md       cómo pedir una tarea: QUÉ · DÓNDE · TERMINADO · NO TOCAR · CONTEXTO
    ├── AGENTS.module.md      contexto local por carpeta/módulo (≤ 40 líneas)
    ├── adr.md
    ├── changelog-entry.md
    └── working-state.md
```

## Principios de diseño del protocolo

- **Entrada única y liviana.** `AGENTS.md` cabe en ~2k tokens y enruta; nada se carga si la tarea no lo necesita.
- **Cero duplicación.** Cada regla vive en un solo archivo. Backend y frontend comparten `00`, `10`, `40`, `50`, `60`, `70`. `31` se carga solo en tareas visuales.
- **Hechos separados de proceso.** `/docs` dice qué es el proyecto; `.ai/rules` dice cómo trabajar. Las excepciones se declaran en `docs/05-ai-rules.md`.
- **Memoria de dos niveles.** `07-changelog.md` guarda lo hecho (log de una línea por cambio + detalle aparte); `09-working-state.md` guarda lo que está a medias.
- **Lectura por sección.** `docs/INDEX.md` es un árbol de todas las secciones con ancla y resumen; el agente se orienta con ~300 tokens y abre solo lo que necesita. Los módulos con reglas propias llevan un `AGENTS.md` local de ≤ 40 líneas.
- **Observable y verificable.** Las reglas dicen qué mirar y qué hacer, no solo qué valorar.

## Guarda en CI (Azure Pipelines)

```yaml
- script: node .ai/tools/check-context.js
  displayName: Protocolo IA · topes de contexto
```

Un PR con `INDEX.md` fuera de tope, `05-ai-rules.md` > 6 KB o un `AGENTS.md` de módulo > 40 líneas no pasa. Los topes viven en `.ai/tools/lib.js` → `LIMITS`; cambiarlos es una decisión del repo de plantillas, no de un proyecto.

## Actualizar un proyecto a una versión nueva

Repo en 5.1 con índice en formato lista → `PROMPT-chore-optimizacion-contexto.md`. Repo en 5.2+ → `PROMPT-upgrade-protocolo.md`: reemplaza `.ai/` y `AGENTS.md` (conservando §0), aplica las novedades del historial entre versiones, regenera el índice, corre `check-context` y reinstala el hook. `/docs` y `05-ai-rules.md` no se tocan.

## Mantenimiento del protocolo (en el repo de plantillas)

- Cambios a reglas: en `.ai/rules/`, con entrada en el changelog del repo de plantillas y bump de versión en `AGENTS.md`.
- Al actualizar un proyecto a una versión nueva: reemplazar `.ai/` completa y `AGENTS.md` (conservando la tabla de perfil); `/docs` y `docs/05-ai-rules.md` no se tocan.
- Versionado SemVer del protocolo: cambio de estructura o regla inviolable → MAJOR; regla nueva → MINOR; redacción → PATCH.

## Historial

| Versión | Fecha | Cambio |
|---|---|---|
| 5.7.1 | 2026-11-17 | Detector de secretos: un valor que es llamada a función (identificador seguido de "(") no se reporta; detectado en el primer repo consumidor real. |
| 5.7.0 | 2026-11-17 | Correcciones de consistencia: versión única, tope de AGENTS.md, índice sin alineación, validación de §0 y de historial en check-context, detector de secretos sin falsos positivos, selftest de herramientas. |
| 5.6.1 | 2026-10-16 | Parche de redacción sobre 5.6 sin detalle en el historial original; se conserva la fecha y se documenta el hueco. |
| 5.6 | 2026-10-16 | Detector de secretos en `check-context` (cadenas de conexión, claves, tokens, llaves privadas; redacta valores; ignora placeholders); plantilla `pedido-tarea.md` y regla de pedido incompleto en `00-core §1`. Cierra la tanda 1 de mejoras post-informe |
| 5.5 | 2026-10-16 | `db-schema.js` + `sql/db-schema.sql`: esquema real de SQL Server como doc canónico compacto (columnas, PK/FK/DF, índices, triggers, auditoría, replicación, vistas, SP con parámetros, funciones); `21 §1.0` obliga a leerlo antes de tocar una tabla y regenerarlo después |
| 5.4 | 2026-10-16 | `run-quiet.js`: build/tests/lint siempre a través del envoltorio; una suite de 1.074 tests pasa de ≈30k tokens a ≈50; detecta dotnet build/test, Angular, Jest/Vitest, Karma, ESLint; genérico para el resto |
| 5.3 | 2026-10-15 | Modo **huella externa**: protocolo y memoria en sidecar fuera del repo, entrada global por herramienta, `check-context --mode externa` como detector de rastros de IA (archivos, diff, commits), `install-hooks --sidecar`, `80-huella-externa.md`, `PROMPT-instalacion` con `HUELLA` |
| 5.2 | 2026-10-08 | Herramientas `.ai/tools/` (`regen-index.js`, `check-context.js`, `install-hooks.js`): el índice se genera, no se escribe; los topes se verifican al cerrar, en pre-commit y en CI. Correcciones del primer informe de consumo: `INDEX.md` con formato árbol único, topes (150 líneas / 12 KB) y `INDEX-anexos.md`; docs con > 25 secciones llevan índice propio; `70` partido en `70-docs-close` (siempre) y `71-docs-bootstrap` (primer contacto); `21` y `31` recortados (plantillas SQL a `templates/sql/`, patrones a `32`); `DESIGN.md` solo por ancla; `.prettierignore`; changelog sin alineación; consumo de tokens en la entrega; `AGENTS.md` −20 % |
| 5.1 | 2026-10-07 | `docs/INDEX.md` (árbol de secciones), changelog compacto con detalle en `changelog/`, `AGENTS.module.md` por carpeta, presupuesto de contexto y escritura densa |
| 5.0 | 2026-10-07 | Entrada slim + reglas modulares en `.ai/rules`; SQL Server con normalización, nombres y auditoría; GitFlow/Conventional Commits; diseño UI profesional (`31`) con Impeccable; `00-repo-map` y `09-working-state`; wrappers mínimos para Claude Code y Gemini |
| 4.0 | 2026-07-22 | Dos perfiles autónomos (backend .NET, frontend Angular) con consolidación documental |
| 3.0 | 2026-06-05 | Protocolo genérico con carga perezosa y `/docs` canónica |
