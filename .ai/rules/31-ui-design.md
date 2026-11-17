# 31 — Diseño UI/UX profesional

> Se carga cuando la tarea crea o modifica una pantalla, componente visual, flujo de usuario, estilos, tema o design system.
> Complementa `30-frontend-angular.md` (que dice cómo se construye) con **cómo debe verse y sentirse** el producto. Objetivo: que el usuario final diga "wow" porque la interfaz es clara, rápida, cuidada y **propia** de este producto, no porque tenga efectos.

---

## 1. Principio: diseño con identidad, no plantilla

Las interfaces generadas por IA se reconocen a la distancia porque repiten la misma receta. Está **prohibido** entregar esa receta. Señales de "look genérico de IA" que no deben aparecer:

| Señal genérica | Qué hacer en cambio |
|---|---|
| Gradiente violeta/azul/rosa como protagonista; fondos con blobs difuminados | Paleta derivada de la marca o del dominio; un color dominante con intención, acentos escasos |
| Glassmorphism, sombras enormes y bordes redondeados máximos en todo | Profundidad sutil y consistente (1-2 niveles de elevación); radios coherentes con el carácter del producto |
| Hero centrado + tres tarjetas idénticas con ícono arriba | Jerarquía basada en el contenido real y en la tarea del usuario; composiciones asimétricas cuando el contenido lo pide |
| Inter/Roboto por defecto, todo del mismo peso | Pareja tipográfica elegida (display + texto) con escala y pesos definidos |
| Emojis como íconos; íconos de sets mezclados | Un único set de íconos, mismo trazo y tamaño óptico |
| Lorem ipsum, "John Doe", datos de ejemplo irreales | Contenido real del dominio (nombres, montos, estados, longitudes reales) |
| Ilustraciones genéricas de personas flotantes | Sin ilustración, o ilustración/fotografía con criterio de marca; en apps de gestión, mejor datos bien presentados |
| Todo en tarjetas con el mismo padding | Densidad y contenedores según el tipo de información: tablas para datos, formularios con agrupación lógica, tarjetas solo para unidades comparables |
| Animaciones de entrada en cada elemento | Movimiento solo con función (orientar, confirmar, continuidad), corto y consistente |
| Texto placeholder como etiqueta; botones "Enviar"/"Aceptar" genéricos | Etiquetas visibles; verbos específicos ("Liquidar", "Anular orden", "Guardar borrador") |

**Prueba de identidad:** si se quitan el logo y el nombre, ¿se reconoce que es este producto y no cualquier otro? Si la respuesta es no, falta diseño.

---

## 2. Proceso antes de diseñar una pantalla

1. **Entender la tarea del usuario**: quién, qué quiere lograr, con qué frecuencia, en qué dispositivo, bajo qué presión (caja con fila de clientes ≠ reporte mensual).
2. **Relevar lo existente**: design system, tokens, componentes, pantallas hermanas. La pantalla nueva debe parecer de la misma familia.
3. **Definir jerarquía**: ¿cuál es la información o acción principal? Una por pantalla. Lo secundario se subordina visualmente.
4. **Diseñar los estados antes que el estado feliz**: carga, vacío, error, sin permisos, datos parciales, mucho dato, dato largo.
5. **Bocetar en texto** (estructura de la pantalla por bloques y prioridad) y validarla con el usuario si el flujo es nuevo o riesgoso.
6. Recién después: componentes, estilos, movimiento.

Si el proyecto no tiene design system ni tokens, el primer entregable de UI es un **brief visual** (sección 3) registrado en `docs/02-architecture.md` → "Sistema visual" y, si corresponde, un ADR. No se diseñan pantallas sueltas sin sistema.

---

## 3. Sistema visual: tokens obligatorios

Nunca valores sueltos en componentes. Todo sale de tokens (CSS custom properties, tema de la librería UI o equivalente):

### Color
- **Un dominante** (marca), **un acento** para acciones primarias, **neutros** (6-8 pasos de gris con el matiz del dominante, no gris puro), **semánticos** (éxito, advertencia, error, info) con sus variantes de fondo/texto/borde.
- Contraste AA mínimo (4.5:1 texto, 3:1 UI). Verificado, no supuesto.
- El color comunica estado y jerarquía; no decora. Un botón primario por vista.
- Modo oscuro si el producto lo tiene: tokens espejados, no `filter: invert`.

### Tipografía
- Pareja definida: una fuente para títulos/números destacados y una para texto e interfaz (pueden ser la misma familia con pesos distintos si tiene carácter). Evitar la fuente por defecto del framework salvo decisión documentada.
- Escala modular (ej. 12 · 14 · 16 · 20 · 24 · 32 · 40) con alturas de línea y pesos asignados por rol: `display`, `h1-h3`, `body`, `body-sm`, `label`, `caption`, `mono` para códigos e importes tabulares.
- Números financieros: dígitos tabulares (`font-variant-numeric: tabular-nums`), alineados a la derecha, mismo decimal, separadores de miles locales.
- Longitud de línea 45-75 caracteres en texto corrido.

### Espaciado y layout
- Escala de 4 u 8 px (`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`). Nada fuera de escala.
- Grilla definida (12 columnas en desktop; márgenes y gutters tokenizados). Ancho máximo de contenido para lectura; ancho completo para tablas.
- Densidad según el uso: **compacta** en back-office con tablas y formularios intensivos; **cómoda** en flujos ocasionales o públicos. Documentar cuál usa cada tipo de pantalla.
- Alineación estricta: todo se alinea a la grilla y entre sí. El desalineado de 2 px se nota.

### Forma, elevación y movimiento
- Radios: 2-3 valores máximo (ej. `4 · 8 · 16`), asignados por tipo de elemento.
- Elevación: 2-3 niveles con sombras suaves y coherentes con la luz; bordes de 1 px como alternativa en interfaces densas.
- Movimiento: duraciones `150-250 ms` para micro, `250-400 ms` para transiciones de vista; curvas `ease-out` para entrar, `ease-in` para salir; respeta `prefers-reduced-motion`.

### Iconografía
- Un set (Material Symbols, Phosphor, Lucide, Tabler… o el del proyecto), un trazo, tamaños fijos (16 · 20 · 24). Íconos siempre con texto o `aria-label`.

---

## 4. Lo que hace "wow" en una aplicación de gestión

El efecto profesional en software de negocio no viene de efectos visuales sino de **sentir que la aplicación piensa por el usuario**:

- **Velocidad percibida**: skeletons con la forma real del contenido (no spinners genéricos), respuesta optimista donde es seguro, acciones que no bloquean la pantalla.
- **Datos legibles de un vistazo**: tablas con jerarquía (columna clave destacada, totales fijos, estados con color + ícono + texto), números alineados, fechas y montos en formato local, filas con altura consistente, encabezados fijos, columnas con ancho por contenido.
- **Cero fricción en lo repetitivo**: foco automático en el primer campo, Enter para confirmar, Esc para cancelar, atajos documentados, autocompletar con búsqueda tolerante, valores por defecto inteligentes, recordar filtros y columnas del usuario.
- **Feedback preciso**: cada acción confirma qué pasó y sobre qué ("Orden 4521 anulada", no "Operación exitosa"); errores dicen qué falló y cómo seguir; deshacer donde sea posible en lugar de confirmaciones constantes.
- **Estados vacíos que enseñan**: qué es esta sección, por qué está vacía, cuál es el primer paso (con la acción ahí mismo).
- **Detalles cuidados**: truncado con tooltip, textos largos que no rompen el layout, plurales correctos, mayúsculas consistentes, sin "Cargando..." eterno, sin saltos de layout al cargar.
- **Coherencia absoluta**: el mismo concepto siempre se ve igual (mismo verbo, mismo ícono, misma posición). El usuario deja de pensar en la interfaz.
- **Jerarquía clara**: una acción primaria evidente; lo peligroso alejado de lo frecuente; lo secundario discreto pero accesible.

---

## 5. Patrones por tipo de pantalla

Listado, formulario, detalle, dashboard, asistente, diálogo, login: reglas en `32-ui-patterns.md`. Cargalo solo cuando diseñes una de esas pantallas.

---

## 6. Accesibilidad como base de calidad (no como extra)

- Contraste AA, foco visible y con estilo propio (no el outline por defecto, pero **nunca** `outline: none` sin reemplazo).
- Todo operable con teclado en orden lógico; atajos sin conflictos con el navegador.
- Objetivos táctiles ≥ 40 px en móvil; ≥ 32 px en desktop denso.
- Textos reales, no imágenes de texto. Zoom 200 % sin pérdida de funcionalidad.
- Nombres accesibles en controles, `aria-live` para confirmaciones y errores, roles correctos en componentes custom.
- Color nunca como único canal (estado = color + ícono + texto).
- Ver además `30-frontend-angular.md §7`.

---

## 7. Responsive con intención

- Diseñar los **puntos de quiebre según el contenido**, no según dispositivos. Definir qué se reorganiza, qué se oculta tras "más" y qué cambia de patrón (tabla → lista de tarjetas con los 3 datos clave).
- Las aplicaciones de gestión suelen ser desktop-first: priorizar la densidad y la productividad en desktop sin romper en tablet/móvil.
- Nada de scroll horizontal accidental; tablas anchas con columnas fijas o scroll interno declarado.

---

## 8. Entrega de trabajo de UI

Toda tarea con UI incluye en la entrega:

- **Decisiones de diseño**: jerarquía elegida, por qué ese patrón, qué tokens se usaron o crearon.
- **Estados cubiertos**: lista explícita (carga, vacío, error, sin permisos, dato largo, móvil).
- **Verificación**: contraste medido, teclado recorrido, responsive revisado en los anchos definidos, `prefers-reduced-motion` respetado.
- **Qué no se hizo** y por qué (ej. "sin modo oscuro: el producto no lo define").

Si el diseño introduce tokens, componentes base o patrones nuevos, registrarlos en `docs/02-architecture.md` → "Sistema visual" y, si cambia el sistema, ADR.

---

## 9. Skills de diseño: Impeccable + auditoría

Este archivo define **qué** es un diseño profesional en nuestros proyectos. La herramienta recomendada para **producirlo** es la skill **Impeccable** (`pbakaus/impeccable`, Apache 2.0), construida sobre la skill oficial `frontend-design` de Anthropic y disponible para Claude Code, Codex y Gemini CLI. Como control de calidad se usa **`web-design-guidelines`** de Vercel (`vercel-labs/agent-skills`).

### Cuándo usar cada comando en el flujo del protocolo

| Paso del flujo (`00-core.md`) | Comando | Para qué |
|---|---|---|
| Primer contacto con un proyecto con UI | `/impeccable init` → `/impeccable document` | Relevar producto y generar `PRODUCT.md` + `DESIGN.md` (sistema visual existente o nuevo). Reemplaza el "brief visual" manual de §2 |
| Diseñar una pantalla o flujo nuevo | `/impeccable craft` | Generar la pantalla a partir de `DESIGN.md`, con la jerarquía y estados de §2-§5 |
| Mejorar algo existente sin rediseñar | `/impeccable polish` · `clarify` · `harden` | Pulido de detalle, legibilidad, estados y robustez (§4) |
| Ajustar carácter | `typeset` · `colorize` · `layout` · `animate` · `bolder` / `quieter` | Intervenciones focalizadas sobre tipografía, color, grilla o movimiento, siempre dentro de los tokens de §3 |
| Revisar antes de entregar | `/impeccable critique` → `/impeccable audit` → skill `web-design-guidelines` | Crítica de diseño, auditoría propia y auditoría externa de a11y/UX/performance |
| Explorar alternativas | `/impeccable generate` · `live` | Variantes para decidir con el usuario; nunca para entregar varias sin elegir |

### Reglas de integración

- `PRODUCT.md` y `DESIGN.md` viven en la raíz del proyecto (donde Impeccable los espera; en huella `externa`, en la raíz del sidecar) y son la **fuente de verdad del sistema visual**. `docs/02-architecture.md` → "Sistema visual" **enlaza** a `DESIGN.md`; no duplica tokens ni decisiones. `docs/01-context.md` enlaza a `PRODUCT.md` para voz y audiencia.
- **`DESIGN.md` nunca se abre entero** (suele superar 30k tokens). Lleva índice propio al inicio y sus `##` figuran en `docs/INDEX.md`; se leen por ancla las 2-3 secciones que la tarea necesita (tokens, tipografía, estados, layout).
- Lo que Impeccable genere debe cumplir igual este archivo: la skill es un acelerador, no una excepción. Si su salida muestra una señal de §1, se corrige antes de entregar.
- Instalación **a nivel usuario** (`%USERPROFILE%\.claude\skills\impeccable`, equivalente en Codex/Gemini), nunca dentro del repo: la skill trae su propio `node_modules` (~1.000 archivos) que no pertenecen al proyecto, y en huella `externa` sería un rastro. La versión se fija ahí y se **registra en `docs/03-setup.md`** (`Impeccable x.y.z, nivel usuario`); si otro proyecto necesita otra versión, se actualiza la de usuario y se anota en el `03` de cada proyecto afectado. Si alguien la instaló en el repo (`.claude/skills/`), se quita del repo antes de commitear. Antes de instalar, leer el `SKILL.md` (auditorías independientes encontraron fallas de seguridad en una fracción significativa de skills de terceros).
- Costo: los archivos de referencia agregan tokens. Cargar Impeccable solo en tareas de UI, no en tareas de lógica o datos.
- Si el proyecto no permite skills de terceros, se sigue este archivo manualmente y la auditoría se hace con el checklist de §10.

---

## 10. Checklist anti-genérico

Antes de entregar, responder **sí** a todo:

- [ ] Sin logo, ¿se reconoce que es este producto? (identidad)
- [ ] ¿Hay una sola acción primaria evidente por vista? (jerarquía)
- [ ] ¿Todo el color, tipografía, espaciado y radio salen de tokens? (sistema)
- [ ] ¿La tipografía fue elegida y tiene escala, o es la del framework por defecto? (carácter)
- [ ] ¿Los datos son reales del dominio y se leen de un vistazo? (contenido)
- [ ] ¿Los estados vacío, error y carga están diseñados, no improvisados? (completitud)
- [ ] ¿Cada animación tiene una función y respeta `reduced-motion`? (movimiento)
- [ ] ¿Un ícono set, un trazo, un tamaño? (consistencia)
- [ ] ¿Las etiquetas y botones usan verbos y nombres del negocio? (lenguaje)
- [ ] ¿Contraste medido, teclado probado, foco visible? (accesibilidad)
- [ ] ¿Un usuario experto lo haría más rápido que en la pantalla anterior? (productividad)
- [ ] Si lo viera un diseñador senior, ¿diría "esto lo hizo un equipo con criterio"? (prueba final)
