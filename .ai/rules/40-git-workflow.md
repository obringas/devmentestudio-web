# 40 — Git: GitFlow + Conventional Commits en Azure DevOps

> Se carga cuando la tarea implica crear ramas, commits, pull requests, o cuando se entrega cualquier propuesta de cambio (siempre, al cerrar una implementación).
> Si `docs/04-conventions.md` define una variante del proyecto, esa manda.

---

## 1. Modelo de ramas (GitFlow estricto)

| Rama | Propósito | Nace de | Se integra en | Vida |
|---|---|---|---|---|
| `main` | Producción. Solo código liberado y etiquetado | — | — | Permanente |
| `develop` | Integración de lo que va a la próxima release | `main` | `release/*` | Permanente |
| `feature/<id>-<descripcion>` | Nueva funcionalidad o cambio planificado | `develop` | `develop` | Hasta el merge |
| `bugfix/<id>-<descripcion>` | Corrección detectada en `develop` o en una `release` | `develop` o `release/*` | la misma | Hasta el merge |
| `release/<x.y.z>` | Estabilización previa a producción; solo fixes, versión, changelog | `develop` | `main` **y** `develop` | Hasta el deploy |
| `hotfix/<x.y.z>-<descripcion>` | Corrección urgente en producción | `main` | `main` **y** `develop` | Hasta el deploy |

Reglas inviolables:

- **Nunca** commit directo a `main` ni `develop`. Todo entra por Pull Request.
- **Nunca** `push --force` sobre ramas compartidas. Sobre una rama propia, solo antes de abrir el PR.
- Una rama = un propósito. Si el trabajo crece, se divide en más ramas, no se acumula.
- Las ramas se borran después del merge (Azure DevOps: "Delete after merging").
- `hotfix` y `release` se integran en **ambas** ramas permanentes. Olvidar `develop` es la causa #1 de regresiones.

### Nombre de rama

```text
<tipo>/<work-item-id>-<descripcion-en-kebab-case>

feature/1234-liquidacion-por-lote
bugfix/1290-redondeo-saldo-cliente
hotfix/2.3.1-timeout-login
release/2.4.0
```

- Minúsculas, guiones, sin acentos, sin espacios. Descripción corta (3-6 palabras) que diga **qué**, no cómo.
- `<work-item-id>` es el ID del work item de Azure Boards cuando existe.

---

## 2. Conventional Commits

```text
<tipo>(<alcance>): <descripción en imperativo, minúscula, sin punto final>

<cuerpo opcional: qué y por qué, no cómo>

<footer opcional: AB#1234 · BREAKING CHANGE: … · Refs: ADR-003>
```

| Tipo | Cuándo |
|---|---|
| `feat` | Nueva funcionalidad visible para el usuario o la API |
| `fix` | Corrección de un bug |
| `refactor` | Cambio de estructura sin cambio de comportamiento |
| `perf` | Mejora de performance medible |
| `test` | Agregar o corregir tests, sin tocar código productivo |
| `docs` | Solo documentación (`/docs`, README, comentarios) |
| `style` | Formato, espacios, punto y coma; sin cambio de lógica |
| `build` | Build, dependencias, versiones de paquetes |
| `ci` | Pipelines, YAML de Azure DevOps |
| `chore` | Mantenimiento que no encaja arriba (no usar como comodín) |
| `revert` | Revierte un commit anterior; el cuerpo referencia el hash |

Reglas:

- **Alcance** = módulo, feature, capa o tabla afectada (`liquidacion`, `api`, `ctacte`, `OrdenCompra`). Consistente con el repo; registrar los alcances usados en `docs/04-conventions.md`.
- Descripción ≤ 72 caracteres, imperativo ("agrega", "corrige", no "agregado"/"agregando").
- Un commit = un cambio lógico. Formato y funcionalidad **nunca** en el mismo commit. Migración de esquema y código que la usa pueden ir juntos si son inseparables; si no, primero esquema.
- Cambio incompatible → `!` después del alcance y footer `BREAKING CHANGE:` explicando migración.
- Referenciar el work item con `AB#<id>` en el footer (Azure Boards lo enlaza automáticamente).
- Sin mensajes vacíos de contenido: `fix: arreglos`, `chore: cambios`, `wip` no se aceptan en `develop`.

Ejemplos:

```text
feat(liquidacion): agrega cálculo de retenciones por lote

Reemplaza el cálculo por productor individual por un proceso por lote
para reducir el tiempo de liquidación mensual. Mantiene el resultado
por productor idéntico (validado contra la liquidación 2026-09).

AB#1234
Refs: ADR-005
```

```text
fix(ctacte)!: corrige signo en movimientos de nota de crédito

BREAKING CHANGE: el endpoint GET /movimientos devuelve importes con
signo contable; los consumidores que invertían el signo deben dejar de hacerlo.

AB#1290
```

---

## 3. Formato obligatorio de toda propuesta de cambio

Toda entrega de implementación, corrección o refactor incluye este bloque (ver `00-core.md §6`):

```markdown
## Propuesta de cambio (Git)
- Rama origen: `develop`
- Rama destino: `develop`
- Rama de trabajo: `feature/1234-liquidacion-por-lote`
- Commits:
  1. `feat(liquidacion): agrega cálculo de retenciones por lote`
  2. `test(liquidacion): cubre redondeo de retenciones en lote`
  3. `docs(liquidacion): registra ADR-005 y actualiza arquitectura`
```

Si el cambio es un hotfix: origen `main`, destino `main` + `develop`. Si es parte de una release: origen y destino `release/x.y.z`.

El agente **no ejecuta** `git push`, `git merge` a ramas permanentes ni crea PRs sin pedido explícito. Propone; el humano integra.

---

## 4. Pull Request

Título = el commit principal en formato Conventional Commits. Descripción:

```markdown
## Qué
<resumen funcional en 2-3 líneas>

## Por qué
<problema, ticket AB#, ADR si aplica>

## Cómo probar
<pasos concretos; datos de prueba; qué debería verse>

## Checklist
- [ ] Build y tests en verde (pipeline)
- [ ] Sin secretos ni configuración productiva
- [ ] Cambios de esquema con script de reversión (ver 21-data-sqlserver)
- [ ] `docs/07-changelog.md` y docs afectados actualizados
- [ ] Sin cambios fuera del alcance del work item
```

- PR pequeño (ideal < 400 líneas de diff). Si es más grande, dividir o justificar.
- Un PR por rama; una rama por work item.
- Mínimo un revisor. El autor no aprueba su propio PR.
- Merge con **squash** para `feature/*` y `bugfix/*` (historial limpio en `develop`); merge commit (`--no-ff`) para `release/*` y `hotfix/*` (trazabilidad de versiones).

---

## 5. Versionado y tags

- SemVer: `MAJOR.MINOR.PATCH`. `feat` → MINOR; `fix` → PATCH; `BREAKING CHANGE` → MAJOR.
- Tag en `main` por cada release/hotfix: `v2.4.0`. Anotado (`git tag -a`), con el resumen del changelog.
- La versión se actualiza en la rama `release/*`/`hotfix/*`, no en `develop`.

---

## 6. Qué nunca va al repositorio

- Secretos, cadenas de conexión reales, tokens, certificados, `appsettings.*.json` con valores productivos, `.env` con valores.
- Artefactos: `bin/`, `obj/`, `node_modules/`, `dist/`, cobertura, logs, backups `.bak`, archivos de datos pesados.
- Archivos de IDE personales no acordados.
- Código comentado "por si acaso".

Si falta `.gitignore` o es insuficiente, proponerlo (plantilla estándar de .NET/Angular + lo específico del proyecto).

---

## 7. Checklist Git antes de entregar

- [ ] Rama con nombre según convención, nacida de la rama correcta.
- [ ] Commits atómicos con mensaje Conventional Commits y `AB#`.
- [ ] Sin formato mezclado con funcionalidad.
- [ ] Propuesta de cambio con origen/destino/rama/commits en la entrega.
- [ ] Nada sensible ni generado en el diff.
- [ ] Documentación y changelog incluidos en la misma rama.
