# INDEX — Árbol de contexto

> **Primer archivo que lee el agente después de `AGENTS.md`.** Una línea por sección, con ancla y resumen ≤ 80 caracteres.
> Regla: leer este índice (~300 tokens) → abrir **solo la sección** necesaria por su ancla → nunca el archivo entero.
> Se actualiza en el mismo cambio que modifica una sección. Si una línea no entra en 80 caracteres, el resumen está mal.
> Las anclas son el slug del encabezado real (`## Base de datos` → `#base-de-datos`). Al generar el índice, usá los encabezados que existen; no inventes anclas.
> **Formato único: este árbol.** Prohibido el formato lista con enlaces. **Topes: ≤ 150 líneas, ≤ 12 KB.** Solo docs canónicos; lo demás va a `INDEX-anexos.md` (una línea por familia acá). Un doc con > 25 secciones entra en una sola línea y lleva índice propio.

```text
docs/
├─ 00-repo-map.md
│  ├─ #arbol           [PENDIENTE: 1 línea: proyectos/carpetas principales]
│  └─ #donde-va        [PENDIENTE: endpoint→…, regla→…, tabla→…]
├─ 01-context.md
│  ├─ #proposito       [PENDIENTE]
│  ├─ #usuarios        [PENDIENTE: roles]
│  ├─ #reglas-negocio  [PENDIENTE: cantidad y las 2-3 críticas]
│  └─ #glosario        [PENDIENTE: términos clave]
├─ 02-architecture.md
│  ├─ #stack           [PENDIENTE: .NET x · Angular y · SQL Server z]
│  ├─ #capas           [PENDIENTE: Api→Application→Domain←Infrastructure]
│  ├─ #flujos          [PENDIENTE: nombres de flujos principales]
│  ├─ #base-de-datos   [PENDIENTE: esquemas · auditoría · replicación sí/no]
│  ├─ #sistema-visual  [PENDIENTE: DESIGN.md · librería UI · densidad]
│  ├─ #auth            [PENDIENTE: mecanismo]
│  └─ #integraciones   [PENDIENTE: sistemas externos]
├─ 03-setup.md
│  ├─ #requisitos      [PENDIENTE]
│  ├─ #comandos        [PENDIENTE: build · run · test · migrate]
│  └─ #troubleshooting [PENDIENTE: n problemas conocidos]
├─ 04-conventions.md
│  ├─ #naming          [PENDIENTE: idioma · diferencias con .ai/rules]
│  └─ #git             [PENDIENTE: alcances de commit]
├─ 05-ai-rules.md
│  ├─ #restricciones   [PENDIENTE: qué no tocar]
│  └─ #excepciones     [PENDIENTE: n excepciones a .ai/rules]
├─ 06-decisions.md     [N] ADR · índice propio en #indice      ← si N ≤ 25, una línea por ADR acá
├─ 07-changelog.md     log compacto; detalle en changelog/YYYY-MM-DD-<slug>.md
├─ 08-known-issues.md
│  ├─ #bugs            [PENDIENTE: n abiertos · el más grave]
│  ├─ #deuda           [PENDIENTE: n items · prioridad alta]
│  └─ #contradicciones [PENDIENTE]              ← si > 25 secciones: una línea + índice propio
├─ 09-working-state.md [estado · tarea · rama]             ← actualizar al cerrar
├─ db-schema.md        [solo sqlserver] [N] tablas · generado · índice propio si > 25 · leer por ancla
├─ DESIGN.md           [solo front] [N] secciones · índice propio · leer por ancla, nunca entero
└─ anexos → INDEX-anexos.md
   ├─ relevamientos (N)   #relevamientos
   ├─ contratos (N)       #contratos
   ├─ despliegues (N)     #despliegues
   └─ prompts (N)         #prompts
```

## Módulos con contexto propio

> Carpetas que tienen su propio `AGENTS.md` (ver `.ai/templates/AGENTS.module.md`). Se carga solo al trabajar dentro de ellas.

```text
src/
├─ [PENDIENTE: ruta/modulo]/AGENTS.md   [1 línea: qué es · tablas · trampas]
└─ …
```
