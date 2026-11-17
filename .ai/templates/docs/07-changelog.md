# Changelog — Memoria de cambios

> **Formato compacto: una línea por cambio, orden cronológico inverso.** El detalle vive en `changelog/YYYY-MM-DD-<slug>.md` y se abre solo si la tarea lo necesita.
> Leyenda archivos: `+` creado · `~` modificado · `-` eliminado · `db:` esquema/datos. Máximo 5 archivos por línea; si son más, `~N archivos` y la lista va en el detalle.
> Campos separados por ` · `, **sin alinear columnas con espacios** (el formateador y el modelo lo pagan).
> Plantilla del detalle: `.ai/templates/changelog-entry.md`.

```text
YYYY-MM-DD · docs · protocol · +docs/* · — · →changelog/YYYY-MM-DD-init-docs.md
```

<!--
Ejemplos de líneas reales:
2026-10-07 · feat · liquidacion · +Retencion.cs ~LiquidacionService.cs db:+Retencion · AB#1234 ADR-005 · →changelog/2026-10-07-retenciones-lote.md
2026-10-05 · fix · ctacte · ~MovimientoRepository.cs · AB#1290 · →changelog/2026-10-05-signo-nota-credito.md
2026-10-01 · refactor · api · ~7 archivos · AB#1201 · →changelog/2026-10-01-problemdetails.md
-->
