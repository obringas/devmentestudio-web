# 71 — Construir y consolidar `/docs`

> Se carga solo en **primer contacto** con un proyecto, cuando `/docs` no existe o es heredada, o al migrar de protocolo. En el trabajo diario alcanza con `70-docs-close.md`.
> `/docs` es la memoria del proyecto: lo que cualquier agente o persona necesita para retomar sin releer el código. Refleja **hechos verificables**.

---

## 1. Estructura canónica

```text
docs/
├── INDEX.md              árbol de secciones: 1 línea por ## (ancla + resumen ≤ 80 car.); ≤ 150 líneas; se lee primero
├── INDEX-anexos.md       índice de todo lo NO canónico (relevamientos, contratos, prompts, despliegues), por familia
├── README.md             índice humano, estado documental, última revisión, fuentes integradas
├── 00-repo-map.md        estructura de carpetas comentada: qué hay en cada lugar y qué NO va ahí
├── 01-context.md         propósito, usuarios, dominio, reglas de negocio conocidas, glosario
├── 02-architecture.md    stack y versiones, capas, flujos, base de datos, integraciones
├── 03-setup.md           requisitos, configuración segura, build, run, tests, migraciones, deploy, troubleshooting
├── 04-conventions.md     naming, estilo, ramas, commits, alcances de commit, tests
├── 05-ai-rules.md        excepciones y reglas de ESTE proyecto (≤ 6 KB; no repite .ai/rules)
├── 06-decisions.md       ADRs; con índice propio al inicio si supera 25
├── 07-changelog.md       log compacto: 1 línea por cambio
├── changelog/            detalle por cambio: YYYY-MM-DD-<slug>.md
├── 08-known-issues.md    bugs, deuda, limitaciones; con índice propio si supera 25 secciones; lo cerrado se archiva
├── 09-working-state.md   tarea en curso, próximos pasos, supuestos (≤ 60 líneas)
└── db-schema.md          esquema real de SQL Server generado desde sys.*; una sección por tabla; solo por ancla
```

Semillas: `.ai/templates/docs/`. Formatos de ADR, changelog y working-state: `.ai/templates/`. Módulo con contexto propio: `.ai/templates/AGENTS.module.md` (§6).

### Jerarquía de verdad

1. `/docs` describe **hechos del proyecto**; manda sobre `.ai/rules/` en eso.
2. `.ai/rules/` describe **calidad y proceso**; manda sobre `/docs` en eso.
3. `docs/05-ai-rules.md` es el único lugar donde un proyecto **excepciona** una regla de `.ai/rules/`, con motivo y, si aplica, ADR.

---

## 2. Inventario y evidencia

1. Inventariá lo existente: `/docs`, raíz, `README*`, wikis exportadas, `*.md` en módulos.
2. Clasificá cada fuente: **vigente · desactualizada · duplicada · contradictoria · no verificable**.
3. Prioridad de evidencia: código y configuración → archivos de proyecto, dependencias, migraciones, esquema → tests → documentación existente → inferencias (`[INFERIDO: validar]`).
4. El código muestra lo **implementado**, no la **intención**. Si contradice negocio o un ADR vigente: `08-known-issues.md` y preguntá.
5. **Nunca copies secretos** ni valores productivos. Solo nombres de variables y placeholders.

---

## 3. Escenarios

### 3.1 `/docs` no existe
1. Creá la estructura desde `.ai/templates/docs/`.
2. Completá con evidencia. Sin confianza → `[PENDIENTE: validar con el equipo]`.
3. `00-repo-map.md`: árbol real (2-3 niveles, sin artefactos), una línea por carpeta.
4. `02-architecture.md`: versiones exactas, capas detectadas, flujo principal, esquemas/tablas clave, integraciones, replicación si aplica.
5. `06-decisions.md`: **sin ADRs retroactivos.** Lo observado va en `02`. Solo decisiones nuevas o con fuente.
6. `07-changelog.md`: primera línea = inicialización documental.
7. `09-working-state.md`: "Sin tarea en curso" + lista de `[PENDIENTE]`.
7b. Si `BD = sqlserver` y hay acceso al servidor de desarrollo: `node .ai/tools/db-schema.js --server <host> --db <base> [--schemas …]` genera `docs/db-schema.md`. Si no hay acceso, dejá la línea del comando en `03-setup.md` y `[PENDIENTE: generar db-schema]` en `09`.
8. `INDEX.md` al final, **con el script**: `node .ai/tools/regen-index.js --write-doc-index`. Después `node .ai/tools/check-context.js` hasta que dé OK.

### 3.2 `/docs` heredada (existe, no sigue el estándar)
1. Leé **todo** lo relevante antes de escribir.
2. Consolidá lo válido en los canónicos. Conservá contexto funcional, decisiones, instrucciones y restricciones vigentes.
3. **No borres, muevas ni renombres** originales sin autorización. Enlazá desde el canónico; lo no canónico se indexa en `INDEX-anexos.md`.
4. Contradicciones y pendientes → `08-known-issues.md`. Fuentes integradas → `README.md`.

### 3.3 `/docs` canónica (incluye migración de protocolo)
No regenerar. Agregar solo lo que falta (`00`, `changelog/`, `09`), convertir el changelog sin perder información, depurar `05`, y generar `INDEX.md`/`INDEX-anexos.md` **con `regen-index.js`**. Cerrar con `check-context.js` en OK. Hechos desactualizados fuera de alcance → anotarlos, no corregirlos en silencio.

---

## 4. Contenido esperado por documento

| Documento | Debe contener | No debe contener |
|---|---|---|
| `INDEX.md` | Árbol de secciones de los docs canónicos; una línea por familia de anexos; módulos con `AGENTS.md` | Enlaces Markdown; docs no canónicos desplegados; más de 150 líneas |
| `INDEX-anexos.md` | Por familia: nombre, cantidad, y una línea por documento (ruta + resumen ≤ 80) | Secciones internas de cada anexo |
| `README.md` | Índice humano, estado, última revisión integral, fuentes integradas | Contenido técnico |
| `00-repo-map.md` | Árbol comentado; dónde va cada tipo de pieza; carpetas ignoradas | Listado de archivos |
| `01-context.md` | Propósito, usuarios, procesos, reglas de negocio con fuente, glosario | Detalle técnico |
| `02-architecture.md` | Stack y versiones exactas, capas y dependencias, flujos, **"Base de datos"** (esquemas, tablas clave, auditoría, replicación, migraciones), integraciones, observabilidad, "Sistema visual" (front) | Decisiones (ADR), comandos (setup), historial de despliegues |
| `03-setup.md` | Requisitos, variables (nombres), comandos reales, troubleshooting vigente | Valores de configuración; bitácora de despliegues (→ anexo) |
| `04-conventions.md` | Naming por capa, estilo, tests, ramas, commits, **alcances de commit**, convención SQL si difiere de `21` | Reglas genéricas de `.ai/rules` |
| `05-ai-rules.md` | Excepciones a `.ai/rules` con motivo; restricciones (qué no tocar, qué pedir); herramientas vetadas. ≤ 6 KB | Copia de `.ai/rules`; procedimientos largos (→ anexo + enlace) |
| `06-decisions.md` | Índice propio + ADRs (contexto, decisión, alternativas, consecuencias, estado) | Estado observado sin decisión |
| `07-changelog.md` | Una línea por cambio: `FECHA TIPO ALCANCE ARCHIVOS REFS →DETALLE`, sin alinear | Prosa; consultas sin cambios |
| `changelog/*.md` | Motivo, archivos, BD, decisiones, validaciones, pendientes | Lo que ya dice la línea |
| `08-known-issues.md` | Índice propio + abiertos con prioridad y evidencia; contradicciones; limitaciones aceptadas | Tareas en curso (→ 09); cerrados antiguos (→ `known-issues/archivo.md`) |
| `09-working-state.md` | Tarea actual, hecho/pendiente, supuestos, bloqueos, validaciones pendientes. ≤ 60 líneas | Historial (→ 07) |

---

## 5. Calidad

- Español claro; frases observables ("usa EF Core 8.0.4", no "una versión moderna").
- Una fuente de verdad por hecho. Enlazar, no duplicar.
- Siempre: hecho comprobado · `[INFERIDO: validar]` · `[PENDIENTE: validar con el equipo]`. Fechas ISO.
- Describe el repositorio **actual**; lo histórico va al changelog o a ADRs `Reemplazada`.
- Reglas de densidad y topes: `70-docs-close.md §2-3`.

---

## 6. Contexto local por módulo

Carpeta con reglas, tablas o trampas propias (`src/Liquidacion/`, `features/clientes/`) → `AGENTS.md` local desde `.ai/templates/AGENTS.module.md`:

- **≤ 40 líneas.** Si crece, el detalle va a `/docs` y queda el enlace.
- Complementa al raíz; no lo contradice ni repite `.ai/rules/`.
- Se lista en `INDEX.md` → "Módulos con contexto propio".
- Codex y Claude Code lo cargan por cercanía; el `AGENTS.md` raíz instruye buscarlo para los demás.
- Criterio: ≥ 3 hechos que un agente debería saber antes de tocar el módulo y que no están en un lugar obvio.
