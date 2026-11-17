# 70 — Cerrar una tarea: registrar memoria

> Se carga **siempre al cerrar** una tarea que modificó el repositorio. Es corto a propósito.
> Cómo construir o consolidar `/docs` desde cero (primer contacto, docs inexistente o heredada): `71-docs-bootstrap.md`.

---

## 1. Orden de cierre

1. **`09-working-state.md`** — siempre, incluso si la tarea quedó a medias (sobre todo entonces). Formato: `.ai/templates/working-state.md`. Terminada → "Sin tarea en curso" + próximos pasos sugeridos. **≤ 60 líneas.**
2. **Docs afectados** — solo los que cambiaron de hecho:
   - `00-repo-map.md`: carpeta, módulo o proyecto nuevo.
   - `02-architecture.md`: arquitectura, dependencias, tablas, integraciones, flujos.
   - `03-setup.md`: comandos, variables, migraciones, deploy.
   - `04-conventions.md`: convención nueva o cambiada.
   - `05-ai-rules.md`: excepción o restricción nueva. **≤ 6 KB**: si no entra, el detalle va a un anexo en `docs/` y acá queda la regla + enlace.
   - `06-decisions.md`: decisión transversal, difícil de revertir, o que toca arquitectura, esquema, seguridad, integración, despliegue, dependencia estructural, patrón de estado o sistema visual → ADR (`.ai/templates/adr.md`). Lo rutinario se justifica en el changelog.
   - `08-known-issues.md`: bug o deuda descubiertos y no resueltos. Lo resuelto se marca, no se borra.
   - `db-schema.md`: si cambió el esquema (tabla, columna, índice, SP), regenerar con `node .ai/tools/db-schema.js --server … --db …` (no editar a mano).
3. **`07-changelog.md`** — una **línea al inicio** por cambio material (código, contratos, datos, config, arquitectura, docs) + detalle en `changelog/YYYY-MM-DD-<slug>.md` (`.ai/templates/changelog-entry.md`). Sin alinear columnas con espacios. No registrar consultas ni diagnósticos sin cambios.
4. **`INDEX.md`** — **nunca a mano.** Corré `node .ai/tools/regen-index.js --write-doc-index`: regenera `INDEX.md`, `INDEX-anexos.md` y los índices propios de los docs grandes a partir de los encabezados reales, y falla si se exceden los topes. Si falla, el problema está en los docs (sección sin resumen, doc que hay que partir), no en el script.
5. **`README.md`** — "última revisión" solo si hubo revisión integral.
6. **Verificación** — corré `node .ai/tools/check-context.js` (huella externa: `--root <sidecar> --docs <sidecar>/docs --mode externa --code <repo>`) y pegá su salida en la entrega ("Consumo de la sesión"). Con errores, la tarea **no está terminada**: corregí y volvé a correr.

---

## 2. Formato y topes de `INDEX.md` (inviolables)

El índice es lo que todo agente paga en cada sesión. Su costo es el costo fijo del proyecto.

- **Lo genera `regen-index.js`; no se edita.** Formato árbol: una línea por sección `##`: `│  ├─ #ancla  resumen`. **Prohibido** el formato lista con enlaces Markdown (`- [archivo · título](archivo#ancla) — resumen`): repite nombre, título y slug y triplica el tamaño. `check-context.js` lo rechaza.
- **Solo documentos canónicos** (`00`…`09`, `README`, `DESIGN.md` si existe) **en el índice principal.** Todo lo demás (relevamientos, contratos, prompts históricos, despliegues, anexos) va a `docs/INDEX-anexos.md`, y en `INDEX.md` entra **una línea por familia**: `├─ anexos/relevamientos (12) → INDEX-anexos.md#relevamientos`.
- **Un documento con más de 25 secciones no se despliega en `INDEX.md`:** entra con una sola línea (`├─ 06-decisions.md  69 ADR · índice propio en #indice`) y lleva al inicio su **propia tabla índice** (una línea por sección). Aplica típicamente a `06-decisions.md`, `08-known-issues.md`, `DESIGN.md`.
- **Topes:** `INDEX.md` ≤ 150 líneas y ≤ 12 KB (≈ 3k tokens). Resumen ≤ 80 caracteres. Ancla = slug del encabezado real. Si no entra, falta mover algo a anexos o a índice propio; no se agranda el tope.
- `DESIGN.md` **nunca se abre entero**: sus `##` están en `INDEX.md` (o en su índice propio) y se leen por ancla.

---

## 3. Escritura densa

- Encabezados `##` estables y direccionables; no renombrar sin actualizar `INDEX.md`.
- Tablas y árboles para hechos; prosa solo para matiz. Una idea por línea; líneas ≤ 120 caracteres. Sin introducciones ni cierres.
- **Sin alineación de columnas con espacios** en tablas, log del changelog ni árboles: el formateador las infla y el modelo paga cada espacio. `AGENTS.md`, `docs/**` y `.ai/**` van en `.prettierignore` (o equivalente).
- Abreviaturas: `+` creado · `~` modificado · `-` eliminado · `db:` esquema · `→` ver/detalle · `[INFERIDO]` · `[PENDIENTE]`. Otras, solo si están en `04-conventions.md`.
- Referenciar, no copiar: código por `ruta:línea` o `ruta#Simbolo`; docs por `archivo#ancla`. Sin bloques de código en `/docs` salvo plantillas.
- Primera línea de cada sección autosuficiente: quien lee solo esa línea ya decide si sigue.
- Un doc que supera ~300 líneas o ~25 KB se parte: índice propio al inicio y/o anexos por tema enlazados. Registrarlo como deuda en `08` si no es el momento de hacerlo.

---

## 4. Checklist de cierre

- [ ] `09-working-state.md` refleja el estado real (≤ 60 líneas).
- [ ] Línea en `07-changelog.md` (sin alineación) + detalle en `changelog/`.
- [ ] `node .ai/tools/regen-index.js --write-doc-index` corrido sin errores.
- [ ] `node .ai/tools/check-context.js` en OK; salida pegada en la entrega.
- [ ] Docs afectados actualizados; ninguno regenerado sin necesidad; `05` ≤ 6 KB.
- [ ] ADR creado si la decisión lo amerita; ninguno inventado.
- [ ] Deuda y contradicciones en `08-known-issues.md`.
- [ ] Sin secretos ni valores productivos. Inferencias y pendientes marcados.
- [ ] Entrega con el formato de `00-core.md §6`, incluido el consumo de tokens de la sesión si la herramienta lo informa.
