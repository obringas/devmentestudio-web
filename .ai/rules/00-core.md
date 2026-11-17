# 00 — Núcleo: flujo de trabajo

> Se carga **siempre**. Define cómo se clasifica, diseña, cierra y entrega una tarea.
> Las reglas de calidad de código están en `10-clean-code.md`; las de cada stack en `20-*`, `21-*`, `30-*`.

---

## 1. Clasificar la tarea

Antes de actuar, determiná qué tipo de pedido es. El tipo define qué podés tocar.

| Tipo | Qué hacer | Qué NO hacer |
|---|---|---|
| **Consulta / revisión** | Inspeccionar, explicar, opinar con evidencia | Modificar archivos |
| **Diagnóstico** | Encontrar la causa raíz y aportar evidencia (logs, código, datos) | Corregir, salvo pedido explícito |
| **Implementación / corrección** | Diseñar → cambiar → validar → documentar | Ampliar alcance, "aprovechar para" |
| **Refactor** | Preservar comportamiento observable; limitarse al alcance autorizado | Cambiar funcionalidad, contratos o esquema |
| **Cambio arquitectónico, de datos, seguridad o despliegue** | Revisar ADRs previos, explicitar riesgos e impacto, proponer plan **antes** de avanzar | Ejecutar sin confirmación |
| **Inicialización documental** | Analizar el proyecto y generar/consolidar `/docs` (`71-docs-bootstrap.md`) | Modificar código funcional |

Si el pedido mezcla tipos (ej. "arreglá este bug y de paso refactorizá"), separá los pasos y tratá cada uno con sus reglas. Si una parte requiere confirmación, pedila antes de empezar la otra.

**Pedido incompleto.** Un pedido bien formado trae QUÉ · DÓNDE · TERMINADO · NO TOCAR · CONTEXTO (`.ai/templates/pedido-tarea.md`). Si falta el criterio de terminado o el alcance, completalo con **una sola** pregunta que proponga valores (no una lista abierta) y seguí con la respuesta; no arranques a codear sin saber cuándo está terminado.

---

## 2. Carga de contexto: presupuesto y orden

El contexto es un recurso. Objetivo: **orientarse con ≤ 6k tokens** (`AGENTS.md` ≈ 2,5k + `INDEX.md` ≤ 3k + `09` ≤ 0,5k) **y resolver una tarea típica con ≤ 20k tokens de lectura.** Si te pasás, algo se leyó entero en vez de por ancla.

1. `AGENTS.md` → `docs/INDEX.md` → `docs/09-working-state.md`. Si hay una tarea en curso, retomala o preguntá si se descarta.
2. Desde `INDEX.md` abrí **solo las secciones** (anclas) que la tarea necesita. Un archivo entero solo si vas a tocar la mayoría de sus secciones.
3. Si trabajás dentro de una carpeta con `AGENTS.md` propio, leelo (≤ 40 líneas) antes que el resto.
4. Reglas de `.ai/rules/`: cargá las del mapa de `AGENTS.md §3` y, dentro de cada una, saltá a la sección relevante. No cargues reglas de un stack que no tocás.
5. Código: abrí los archivos que vas a modificar y sus dependencias directas. Buscá con grep/símbolos antes de leer archivos enteros. No releas lo que ya está en contexto.
5b. Herramientas: build, tests y lint **siempre** vía `node .ai/tools/run-quiet.js -- <comando>` (`50-testing.md §2`). Una salida cruda de tests puede costar más que toda la orientación.
6. Changelog: últimas 5-10 líneas del log, o las del alcance que tocás. Detalle solo si cambia tu decisión.
7. Si una lectura no cambió lo que vas a hacer, era innecesaria: ajustá la próxima vez.

Procedimiento previo a crear piezas y manejo de artefactos:
- Antes de crear cualquier pieza (clase, servicio, componente, tabla, helper), **buscá** si ya existe algo equivalente: por nombre, por responsabilidad y en las carpetas `shared`/`common`/`core`/`infrastructure` del proyecto.
- Los patrones ya usados en el repo son evidencia de la convención vigente. Seguilos. Si un patrón es defectuoso, no lo repitas ni lo refactorices en silencio: documentalo en `08-known-issues.md` y proponelo.
- Ignorá `bin`, `obj`, `node_modules`, `dist`, cobertura, cachés y artefactos generados, salvo que la tarea los mencione.

---

## 3. Diseñar antes de implementar

Antes de escribir código, tené respuesta para:

- **Problema real** y resultado esperado (no la solución que pidió el usuario, sino el problema que resuelve).
- **Comportamiento existente** que debe preservarse.
- **Piezas afectadas:** capas, módulos, contratos, tablas, pantallas, consumidores.
- **Compatibilidad:** API pública, esquema de datos, clientes existentes.
- **Reutilización:** qué existe ya y qué duplicación se evita.
- **Riesgos:** funcional, técnico, de datos, seguridad, performance.
- **Validación:** qué pruebas demuestran que funciona y que no rompió nada.

Para un cambio pequeño el análisis puede ser mental. Para un cambio amplio, riesgoso o que toca datos/contratos, **comunicá un plan breve** (qué, dónde, cómo se valida, cómo se revierte) y esperá confirmación.

### Supuestos

Cuando asumas algo, declaralo: `[SUPUESTO: …]`. Si el supuesto afecta negocio, datos o seguridad, no es un supuesto: es una pregunta.

---

## 4. Implementar

- Aplicá `10-clean-code.md` y las reglas del stack.
- Cambio **mínimo, completo y coherente**: ni parches a medias ni reescrituras que exceden el pedido.
- Preservá los cambios del usuario. Si encontrás trabajo en progreso ajeno, no lo pises.
- Si durante la implementación descubrís que el diseño era incorrecto, frená y replanteá antes de seguir acumulando cambios.
- Preferí cambios graduales y reversibles. Si algo requiere un paso irreversible (migración destructiva, borrado, cambio de contrato), explicitalo y pedí autorización.

---

## 5. Validar

Seguí `50-testing.md`. Regla general: validá primero lo más cercano al cambio y ampliá según el riesgo. Si no podés ejecutar una validación, decí cuál, por qué, y no presentes el resultado como verificado.

---

## 6. Cerrar y entregar

1. Registrá memoria según `70-docs-close.md` (línea de changelog + detalle, docs afectados, `INDEX.md`, working-state).
2. Respondé con este formato. **Denso, sin relleno**: no repitas el código ni el contenido de los archivos en la respuesta; referencialos por ruta.

```markdown
## Resumen
<qué se hizo y qué problema resuelve, en 2-4 líneas>

## Archivos modificados
- `ruta/archivo` — <qué cambió>

## Propuesta de cambio (Git)
- Rama origen: `develop`
- Rama destino: `develop`
- Rama de trabajo: `feature/<id>-<descripcion>`
- Commit: `tipo(alcance): descripción`

## Decisiones técnicas
<alternativas consideradas, por qué esta; ADR si aplica>

## Validaciones realizadas
- <build / tests / lint / manual — resultado real, o motivo por el cual no se ejecutó>

## Pendientes o riesgos
- <o "Ninguno">

## Cómo probar
<pasos concretos para que un humano lo verifique>

## Consumo de la sesión
<tokens entrada/salida/cache si la herramienta lo informa (Claude Code: `/cost`; Codex: UI o sessions/*.jsonl); si no, "no disponible">
<salida de `node .ai/tools/check-context.js` (debe terminar en OK)>
```

Para consultas y diagnósticos que no modificaron archivos, omití "Archivos modificados" y "Propuesta de cambio".

---

## 7. Cuándo detenerse y preguntar

- Falta información crítica de negocio, datos o seguridad.
- El pedido contradice un ADR vigente o una regla de `docs/05-ai-rules.md`.
- La solución requiere borrar código, datos o documentación.
- El cambio toca producción, credenciales, esquema de datos o contratos públicos.
- Dos fuentes de verdad (código vs. docs, docs vs. usuario) se contradicen.
- El alcance real resultó mucho mayor que el pedido.

Preguntar bien es parte del trabajo senior. Preguntá con contexto, opciones y recomendación; no con una lista abierta.
