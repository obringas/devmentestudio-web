---
name: "DevMenteStudio"
description: "Sistema editorial business-first para comunicar continuidad operativa y modernización gradual."
colors:
  navy-foundation: "#1C2A3C"
  navy-deep: "#0F172A"
  azure-action: "#0078D4"
  azure-action-hover: "#0067B8"
  azure-soft: "#E1F1FC"
  continuity-green: "#00965F"
  white: "#FFFFFF"
  canvas: "#F8FAFC"
  surface-muted: "#F4F7F9"
  surface-tint: "#F1F6FA"
  surface-technical: "#EAF3F9"
  body-ink: "#526274"
  border-calm: "#CAD7E2"
  inverse-body: "#CBD9E5"
  error: "#EF4444"
  error-surface: "#FEF2F2"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
  lead:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.8vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.13em"
  action:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  module: "0.4rem"
  mark: "0.75rem"
  media: "0.9rem"
  panel: "1rem"
  card: "1.5rem"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  section-min: "4.5rem"
  section-max: "7.5rem"
components:
  button-primary:
    backgroundColor: "{colors.azure-action}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.azure-action-hover}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.azure-action-hover}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.navy-foundation}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy-foundation}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    padding: "0.75rem 1rem"
    height: "3rem"
  content-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy-foundation}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
---

# Design System: DevMenteStudio

## Overview

**Creative North Star: "Continuidad visible"**

El sistema visual hace tangible una promesa de negocio: la empresa puede avanzar sin detener lo que hoy la sostiene. Su carácter es editorial, sobrio y claro; combina títulos con autoridad, texto de lectura tranquila, superficies luminosas y diagramas code-first que muestran coexistencia, transición y control sin recurrir a imágenes genéricas.

La experiencia es persuasiva, pero no estridente. Primero expone el riesgo que el comprador reconoce, después explica un camino gradual y reversible, aporta evidencia real y finalmente abre una consulta concreta. La tecnología aparece como respaldo para el equipo técnico, nunca como requisito para entender la propuesta principal.

**Características clave:**

- Negocio primero y jerga técnica en un segundo nivel de lectura.
- Continuidad operativa representada de forma visible, gradual y verificable.
- Jerarquía editorial con mucho aire, contraste nítido y pocas superficies elevadas.
- Un único acento de acción; el color semántico nunca compite con el CTA.
- Contenido bilingüe con paridad de intención, estructura y estados.
- Responsive desde el contenido, con composición apilada antes de que la lectura se comprima.
- Movimiento breve y funcional, con una experiencia completa sin animación.

**The Business-First Rule.** Una página debe poder entenderse sin conocer tecnologías: riesgo, consecuencia, camino y evidencia preceden siempre al stack.

**The Visible Continuity Rule.** Siempre que se explique modernización, mostrar convivencia y avance por etapas; nunca representar una reescritura como salto abrupto.

**The Honest Evidence Rule.** Sólo se publican datos, experiencia, casos y tiempos verificables. No se inventan métricas, clientes, certificaciones ni resultados.

## Colors

La paleta combina una base institucional navy, superficies frías y luminosas y un único acento azure que concentra la acción.

### Primary

- **Azure de acción** (`azure-action`): CTA principal, enlaces de avance, foco, indicadores activos y trayectorias del diagrama.
- **Azure profundo** (`azure-action-hover`): hover, enlaces de texto y etiquetas que necesitan mayor contraste.
- **Azure suave** (`azure-soft`): fondos de marcas, iconos o apoyos de baja intensidad; nunca sustituye al CTA.

### Secondary

- **Navy de continuidad** (`navy-foundation`): títulos, secciones inversas, sistema nuevo en diagramas y anclaje institucional.
- **Navy profundo** (`navy-deep`): texto oscuro global o fallback cuando la jerarquía necesita un negro cromático.

### Tertiary

- **Verde de continuidad** (`continuity-green`): confirmación, operación vigente, éxito verificado y check semántico. No es un segundo color de marca ni un acento promocional.

### Neutral

- **Blanco editorial** (`white`): hero, contenido principal, campos y superficies de máximo contraste.
- **Lienzo frío** (`canvas`): fondo global y base de áreas amplias.
- **Superficie de evidencia** (`surface-muted`): portfolio y alternancia de secciones.
- **Superficie de resultado** (`surface-tint`): cambios esperados y bloques de apoyo.
- **Superficie técnica** (`surface-technical`): detalle para equipos de sistemas.
- **Tinta de lectura** (`body-ink`): párrafos y descripciones extensas.
- **Borde calmo** (`border-calm`): divisores, listas y límites estructurales.
- **Texto inverso** (`inverse-body`): párrafos sobre navy.
- **Error y recuperación** (`error`, `error-surface`): validación y fallas de envío con instrucciones accionables.

**The One Action Color Rule.** Azure es el único color de acción. No sumar naranja, violeta u otro acento a botones, enlaces o selección.

**The Green Means Continuity Rule.** Verde sólo comunica continuidad o confirmación; nunca sirve para decoración, categorías ni un CTA alternativo.

**The Light Surface Rule.** La experiencia es predominantemente clara. Navy se reserva para pausas de alto contraste —servicios, persona y cierre—, no para convertir todo el sitio en tema oscuro.

## Typography

**Display Font:** Cormorant Garamond, con Georgia como fallback.

**Body Font:** Outfit, con `system-ui` y sans-serif como fallbacks.

**Technical Font:** JetBrains Mono, con Consolas y monospace como fallbacks, sólo para código o datos que realmente lo requieran.

**Carácter:** Cormorant Garamond aporta criterio editorial y experiencia; Outfit mantiene claridad contemporánea en navegación, formularios y lectura prolongada. El contraste entre ambas familias debe sentirse intencional, no ornamental.

### Hierarchy

- **Display** (`display`): H1 de Home y Modernización; máximo 12–14 caracteres tipográficos de ancho cuando sea posible y nunca mayor al token definido.
- **Headline** (`headline`): H2 de sección, con líneas cortas y ritmo compacto.
- **Title** (`title`): H3 de servicio, caso, FAQ o módulo.
- **Lead** (`lead`): bajada de hero o introducción de sección; ancho objetivo de 42–46rem.
- **Body** (`body`): copy explicativa; ancho de lectura objetivo de 62–66ch y mínimo visual de 16px en móvil.
- **Label** (`label`): clasificación funcional breve. Puede aparecer sobre un hero sólo si aporta contexto real; no agregar kickers decorativos.
- **Action** (`action`): botones, enlaces de avance y controles.

**The Editorial Authority Rule.** Los títulos transmiten autoridad por familia, escala y espacio; no usar texto degradado, mayúsculas gigantes ni peso extremo para forzar énfasis.

**The Plain-Language Rule.** La tipografía técnica no convierte una frase en “tecnológica”. Mono se usa únicamente para código, identificadores o mediciones.

**The Translation Fit Rule.** Español e inglés deben conservar intención y jerarquía, pero no longitud literal. Ajustar la traducción antes que reducir el tamaño de fuente para hacerla entrar.

## Layout

El contenedor principal tiene un ancho máximo de 80rem y padding lateral progresivo: 1rem en móvil, 1.5rem desde 640px y 2rem desde 1024px. Las secciones usan padding vertical fluido entre `section-min` y `section-max`; el cierre puede ampliar el aire hasta 9rem por su función de pausa final.

La grilla editorial alterna entre:

- Hero de dos columnas, con copy levemente dominante y diagrama de continuidad al costado.
- Encabezados de sección en una columna contenida, seguidos por grillas de dos columnas.
- Listas de servicios de ancho completo con título, explicación y acción alineados por fila.
- Casos en composición alternada de imagen y relato, nunca como mosaico de cards iguales.
- Bloques persona, FAQ y detalle técnico con proporciones asimétricas que favorecen lectura.

### Ritmo espacial

- Dentro de un grupo, usar `xs` a `lg`; entre bloques relacionados, `xl` a `2xl`.
- Separar secciones con el ritmo amplio de sección, no con cards adicionales.
- Dejar más aire antes de un título que después de él.
- Preferir divisores de un píxel para estructurar listas antes que encerrar cada ítem.
- Mantener el cuerpo en 62–66ch; el máximo recomendado absoluto es 75ch.

### Responsive

- **Hasta 520px:** la tira de confianza pasa a una columna; cada dato conserva su divisor.
- **Hasta 600px:** las filas de servicios apilan su acción debajo del contenido.
- **Hasta 640px:** el diagrama de continuidad se vuelve vertical y la flecha rota; el significado permanece accesible mediante `aria-label`.
- **Hasta 767px:** grillas de contenido, casos, persona, FAQ y detalle técnico pasan a una columna; los casos dejan de alternar orden.
- **Hasta 900px:** hero y encabezados/listas complejas se apilan antes de comprimir la copy.
- **Desde 1024px:** aparecen navegación y selector de idioma completos; contacto usa su composición de cinco columnas.
- Los objetivos táctiles tienen un mínimo de 44px. No ocultar información esencial por breakpoint.

**The Content-First Collapse Rule.** La composición colapsa cuando la lectura pierde claridad, no cuando la grilla todavía “entra”.

**The Same Story Rule.** Desktop y móvil cuentan la misma historia. Puede cambiar el orden —por ejemplo, el formulario primero en móvil—, pero no la información, las acciones ni la evidencia.

## Elevation & Depth

El sistema es plano por defecto y usa profundidad sólo para distinguir acción, interactividad o una pieza explicativa. Las listas editoriales se separan por tono y divisores; no se transforman en colecciones de tarjetas con sombra.

### Shadow Vocabulary

- **Acción primaria:** `0 12px 28px -16px rgba(0, 82, 153, 0.75)`; en hover se amplía a `0 16px 34px -18px rgba(0, 82, 153, 0.8)`.
- **Panel elevado:** `0 24px 60px -16px rgba(15, 23, 42, 0.2)`; reservado para superficies que deben separarse claramente del lienzo.
- **Diagrama de continuidad:** `0 30px 70px -40px rgba(28, 42, 60, 0.55)`; profundidad ambiental, nunca borde duro.
- **Media de caso:** `0 24px 55px -35px rgba(28, 42, 60, 0.65)`; sostiene la imagen sin convertirla en card.
- **Glow interactivo:** `0 28px 80px -28px rgba(0, 120, 212, 0.28)`; sólo en interacción relevante y con moderación.

**The Flat-by-Default Rule.** Una superficie está delimitada por tono o por borde. Sombra y borde sólo conviven cuando cada uno cumple una función perceptible distinta.

**The Structural Blur Rule.** `backdrop-blur` se admite en el header fijo para preservar legibilidad sobre contenido en movimiento; no se usa como decoración de paneles.

## Shapes

La forma es suave, precisa y contenida. Paneles y medios usan radios entre `media` y `panel`; las cards utilitarias pueden llegar a `card`. Los botones, selectores compactos, badges y estados breves usan `pill` porque son controles, no contenedores de contenido.

Los diagramas se construyen con geometría limpia, HTML, CSS y SVG liviano. Las formas deben explicar módulos, conexión, dirección o estado; no imitar ilustraciones orgánicas ni sumar textura de boceto.

- Módulos internos: `module`.
- Marcas e iconos contenidos: `mark`.
- Imágenes de caso: `media`.
- Paneles, retrato pendiente y campos: `panel`.
- Cards utilitarias excepcionales: `card`.
- Controles compactos: `pill`.

**The Pill Is a Control Rule.** No usar pills como contenedor por defecto para párrafos, métricas o tarjetas de servicio.

**The Code-First Diagram Rule.** Toda visualización debe ser semántica, liviana y describible. Una ilustración final sólo reemplaza al diagrama si conserva mensaje, proporción, accesibilidad y peso de carga.

## Components

### Brand assets

- **Master mark:** `public/logo-nuevo.png` (1254×1254) is the high-resolution source and the active asset for social metadata or other square, large-format brand contexts. Preserve its white field and complete DM construction; do not crop or recolor it ad hoc.
- **Compact layout mark:** `public/logo-nuevo-compact.png` (320×208) is the active header/footer variant. It removes the master asset's excess surrounding whitespace so the monogram reads at navigation scale; use this file instead of shrinking the square master into the available box.
- **Browser icon:** `public/favicon-concept-c.ico` is the active favicon. Its navy rounded container, white D and azure M are intentionally simplified for small sizes; do not substitute the full logo in the favicon slot.
- **Accessible name:** when the adjacent wordmark is absent, the logo image uses `alt="DevMenteStudio"`. If visible text already supplies the same name, use an empty alt to avoid duplicate announcement.
- **Clear space:** keep the mark visually isolated from navigation labels and controls. Never stretch it, force it into a circle, add a second container color or place copy over it.

**The Right Asset for the Slot Rule.** Master, compact and favicon assets share one identity but are not interchangeable; select by context instead of resizing one source for every surface.

### Buttons

- **Forma:** pill, altura mínima de 44px, padding horizontal generoso y texto explícito.
- **Primary:** `button-primary`; concentra la conversión principal de cada viewport.
- **Outline:** `button-outline`; acompaña al CTA principal para ampliar información o abrir WhatsApp, sin competir por peso.
- **Secondary:** `button-secondary`; reinicio, recuperación y acciones de menor jerarquía.
- **Ghost:** texto navy o tinta secundaria sobre fondo transparente; sólo para navegación o acciones discretas.
- **Hover:** primary usa el tono profundo, asciende 1px y amplía suavemente su sombra. Outline recibe una superficie azure muy clara.
- **Active:** primary reduce apenas su escala; nunca rebota ni desplaza el layout.
- **Focus:** anillo azure de 2px, offset de 2px y contraste visible sobre la superficie actual.
- **Disabled / Loading:** opacidad reducida, cursor no disponible y acción bloqueada. Loading conserva el ancho, agrega spinner y cambia el texto por una acción en progreso.

**The One Primary Action Rule.** En cada bloque de decisión hay una sola acción primaria. Las alternativas son outline, enlace o contacto textual.

### Cards / Containers

- **Contenido de negocio:** preferir filas, listas y divisores; no encerrar cada idea en una card idéntica.
- **Superficie:** blanco o un neutral claro; navy sólo en secciones de pausa y cierre.
- **Borde:** fino, frío y de bajo contraste.
- **Padding:** `lg` como base; ampliar a `xl` o `2xl` sólo si el contenido lo necesita.
- **Interacción:** una card clickeable puede elevarse hasta 1.5 unidades Tailwind y recibir glow; una card estática permanece quieta.

### Inputs / Fields

- **Estilo:** `input`, fondo blanco, borde neutral, texto oscuro y placeholder secundario.
- **Label:** visible, asociado mediante `for`/`id`; el asterisco sólo identifica obligatoriedad.
- **Focus:** borde azure más anillo azure suave; no depender únicamente del cambio de color.
- **Error:** borde rojo, mensaje específico debajo del campo y recuperación clara. No borrar datos válidos.
- **Loading:** el formulario expone `aria-busy`; el submit queda deshabilitado y evita envíos duplicados.
- **Success:** reemplaza el formulario por confirmación, check verde y opción secundaria para enviar otro mensaje.
- **Submission failure:** alerta con `role="alert"`, datos preservados y alternativas directas por email y WhatsApp.

### Navigation

- Header fijo de 6rem, transparente al inicio y con superficie blanca translúcida, borde y sombra tenue después de 50px de scroll.
- Navegación desktop en contenedor pill; el activo usa fondo blanco, sombra leve y texto azure profundo.
- Selector ES/EN muestra un estado activo inequívoco y conserva ambos idiomas accesibles.
- Debajo de 1024px, usar botón de menú con `aria-expanded`, icono SVG consistente y panel móvil de ancho completo.
- La acción de contacto conserva prioridad en desktop y ocupa todo el ancho del cierre del menú móvil.

### Content grids

- Dos columnas en escritorio, una en móvil, con divisor superior y separación por filas.
- Riesgos y resultados usan marca geométrica; proceso usa números tabulares porque la secuencia sí aporta significado.
- No sumar iconos decorativos sin relación con el contenido.

### Continuity diagram

- Contrasta sistema actual claro y sistema nuevo navy dentro de una misma superficie.
- Azure muestra módulos incorporados y dirección del traspaso; verde confirma que la operación continúa.
- El movimiento de handoff dura 2.4s con easing de salida expresivo y no oculta el estado inicial.
- En móvil, apila los sistemas sin perder orden ni descripción accesible.

### Cases and evidence

- Casos en filas editoriales alternadas con imagen real anonimizada, industria, situación y cambio logrado.
- Las imágenes usan dimensiones declaradas, `loading="lazy"` y zoom sutil en hover.
- La evidencia antecede al bloque personal, el detalle técnico y el cierre comercial.

### Disclosure sections

- FAQ y detalle técnico usan `details`/`summary` nativos, divisores y un indicador azure.
- El estado abierto rota el indicador, pero el contenido sigue siendo usable con motion reducido.
- El primer detalle técnico puede abrirse en escritorio; nunca obligar al comprador no técnico a recorrerlo.

### Motion

- Transiciones de estado: 150–300ms.
- Entrada editorial: 500–600ms con desplazamiento corto y easing de salida.
- Zoom de imagen: 500ms con `cubic-bezier(.22, 1, .36, 1)`.
- No repetir la misma entrada en todas las secciones ni animar contenido esencial desde un estado invisible permanente.
- Con `prefers-reduced-motion: reduce`, animaciones y transiciones se reducen a 0.01ms, el scroll deja de ser suave y el handoff queda estático.

## Do's and Don'ts

### Do:

- **Do** iniciar por una consecuencia reconocible para el negocio y explicar después la solución.
- **Do** mantener el arco `riesgo → camino gradual → evidencia → consulta` en páginas comerciales.
- **Do** usar la secuencia ampliada `entender → asegurar → reemplazar por partes → documentar` cuando se explique el método.
- **Do** separar la capa técnica en acordeones o secciones secundarias para que respalde, sin dominar.
- **Do** centralizar copy en español e inglés y revisar ambas variantes con contenido real en cada breakpoint.
- **Do** nombrar botones por su resultado: “Quiero saber cómo está mi sistema”, “Ver cómo trabajamos”, “Consultar”.
- **Do** mantener labels, foco visible, semántica de encabezados, navegación por teclado, `aria-live`/`role="alert"` y contraste WCAG AA.
- **Do** usar SVG consistente para iconos y diagramas; incluir `aria-label` o marcar como decorativo según corresponda.
- **Do** usar `logo-nuevo-compact.png` en header/footer, `logo-nuevo.png` para metadata social y `favicon-concept-c.ico` como favicon activo.
- **Do** conservar los valores reales aprobados —20 años, 50+ proyectos y respuesta en 24 horas hábiles— sólo en contextos donde sigan siendo ciertos.
- **Do** medir nuevamente performance sobre el deploy productivo antes de decidir una optimización tipográfica.

### Don't:

- **Don't** abrir con frameworks, versiones, bases de datos ni arquitectura.
- **Don't** mezclar azure con el naranja anterior ni introducir otro color promocional.
- **Don't** usar verde como CTA, categoría, ornamento o sustituto de azure.
- **Don't** crear una página a partir de cards idénticas de icono, título y párrafo ni anidar cards.
- **Don't** usar texto degradado, glass decorativo, sombras duras, glows sin profundidad, doodles, grano o fotos de stock.
- **Don't** convertir labels funcionales en kickers vacíos sobre cada heading.
- **Don't** usar monospace como disfraz visual de “tecnología”.
- **Don't** reducir el logo maestro cuadrado dentro del header/footer ni reemplazar el favicon simplificado por una miniatura ilegible del logo completo.
- **Don't** inventar nombres de clientes, métricas, testimonios, claims absolutos ni un nivel de servicio no confirmado.
- **Don't** declarar exitoso un envío porque la UI cambió: Web3Forms requiere respuesta válida y verificación real de recepción.
- **Don't** reducir tipografía móvil por debajo del mínimo para compensar una traducción larga; reescribir la copy.

### Criterios para extender nuevas páginas

Una página nueva pertenece a este sistema sólo si cumple todos estos puntos:

1. Resuelve una pregunta de negocio clara y define una acción primaria.
2. Conserva la secuencia narrativa business-first o justifica un orden distinto por la tarea del usuario.
3. Reutiliza tokens y componentes existentes antes de crear una nueva variante.
4. Usa azure para acción, navy para estructura y verde sólo para continuidad/confirmación.
5. Incluye estados reales de carga, vacío, error, éxito y disabled cuando el flujo los tenga.
6. Ofrece copy equivalente en español e inglés, no traducción literal sin revisión.
7. Mantiene lectura de 62–66ch, objetivos táctiles de 44px y foco visible.
8. Se revisa con copy real en 390px, 640px, 768px, 900px y escritorio amplio.
9. Respeta `prefers-reduced-motion` y sigue siendo completa sin animación.
10. No agrega activos pesados, dependencias o afirmaciones comerciales sin evidencia y aprobación.

### Activos pendientes y calidad

- **Foto profesional de Oscar:** pendiente. El monograma actual es un placeholder honesto; reemplazarlo sólo por una foto aprobada y optimizada, conservando relación 4:5 y evitando layout shift.
- **Ilustración final:** pendiente. El diagrama code-first es la implementación vigente y completa; cualquier reemplazo debe preservar su significado, accesibilidad, proporción y bajo peso.
- **Web3Forms:** la integración visual y técnica está implementada, pero requiere una prueba real post-deploy y confirmación en el buzón antes de considerarse cerrada de extremo a extremo.
- **Performance móvil:** los últimos resultados de laboratorio fueron 72 en Home y 66 en Modernización. Son riesgos no bloqueantes; repetir medición con hosting productivo y evaluar self-hosting de los pesos/subconjuntos tipográficos usados si el objetivo sigue incumplido.

### Veredicto independiente

**PASS.** El sistema implementado es coherente, reconocible y extensible: prioriza negocio, hace visible la continuidad, sostiene una jerarquía editorial clara, responde en mobile y cubre accesibilidad y motion reduced. Los puntos anteriores son riesgos o activos pendientes no bloqueantes y no invalidan la dirección visual actual.
