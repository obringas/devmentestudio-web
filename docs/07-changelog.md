# 07-changelog.md

## [2026-05-06] - Agente: Gemini

### Cambios
- Se migró toda la aplicación de un diseño oscuro a un tema claro.
- Se invirtió la paleta base (`--color-surface`) en `styles.scss` y se aclararon las utilidades de los componentes.
- Se actualizaron el `header` y `footer` para usar fondos claros (`bg-white/80`, `bg-surface-50`) en lugar de oscuros.
- Se modificaron los tokens de paleta de colores del componente `hero.component.ts`.
- Se reemplazaron masivamente las clases Tailwind de modo oscuro (ej. `bg-surface-900`, `text-surface-100`) por sus equivalentes claros en todas las vistas de la aplicación (contacto, servicios, legales, portfolio, blog, etc.).

### Motivo
Atender a la solicitud de mejorar la dirección visual hacia una estética más fresca, luminosa y limpia, eliminando el fondo oscuro predominante para "darle una vuelta de tuerca" al diseño.

### Archivos afectados
- `src/styles.scss`
- `src/index.html`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/shared/components/layout/footer/footer.component.html`
- `src/app/features/home/components/hero/hero.component.ts`
- Múltiples componentes dentro de `src/app/features/` (actualización masiva de estilos).
- `docs/07-changelog.md`

### Decisiones tomadas
Se propuso y aprobó un rediseño empleando fondos blancos o grises ultra-claros y textos oscuros. El *glassmorphism* se mantuvo ajustando sombras sutiles en lugar de iluminar el fondo oscuro. No se introdujeron nuevos colores de acento estructurales para conservar un perfil limpio y moderno.

### Validaciones realizadas
- Se generó el plan de implementación y la documentación (walkthrough).
- Reemplazo automatizado y manual en componentes para asegurar consistencia del tema claro a través de los archivos del sistema.

### Pendientes / Follow-ups
- Verificar visualmente levantando el servidor local si todas las sombras y efectos responden como se espera en dispositivos móviles.

## [2026-04-24] - Agente: Codex

### Cambios
- Se movio la copy localizada de `home` y `layout` a una capa centralizada en `src/app/data`.
- Se actualizaron header, footer, hero, services preview, tech stack y CTA para consumir getters de contenido en lugar de textos embebidos en los componentes.

### Motivo
Corregir una mala practica de base: la copy localizada no debe vivir dentro de los componentes UI porque complica mantenimiento, escalabilidad y consistencia de la internacionalizacion.

### Archivos afectados
- `src/app/data/home-content.data.ts`
- `src/app/data/layout-content.data.ts`
- `src/app/data/index.ts`
- `src/app/features/home/components/hero/hero.component.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/features/home/components/tech-stack/tech-stack.component.ts`
- `src/app/features/home/components/cta-section/cta-section.component.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/footer/footer.component.ts`
- `src/app/shared/components/layout/footer/footer.component.html`
- `docs/07-changelog.md`

### Decisiones tomadas
Se mantuvo la signal de idioma existente y se extrajo la copy a archivos de datos tipados para separar contenido de presentacion sin sumar dependencias nuevas.

### Validaciones realizadas
- `npm.cmd run lint`
- `npm.cmd run build`

### Pendientes / Follow-ups
- Extender el mismo criterio de extraccion de copy al resto de pantallas traducidas si queres dejar toda la app con la misma regla.

## [2026-04-24] - Agente: Codex

### Cambios
- Se agrego soporte bilingue `es/en` persistido en frontend con selector visible en header y actualizacion del atributo `lang`.
- Se tradujeron home, servicios, detalle de servicio, contacto, nosotros, portfolio, blog, legales, footer y chat para que el cambio de idioma afecte toda la experiencia principal.
- Se reforzo la adaptacion responsive en hero, formularios y layouts principales para que la web pueda navegarse mejor desde celular.
- Se actualizo SEO por ruta para que titulos y descripciones respondan al idioma activo.
- Se ajustaron tests y fallback del chat para contemplar el nuevo comportamiento bilingue.

### Motivo
Resolver dos necesidades de producto: que el sitio se vea y se use bien en mobile, y que exista una opcion real de visualizarlo en ingles sin dejar partes importantes sin traducir.

### Archivos afectados
- `src/app/core/services/locale.service.ts`
- `src/app/core/services/seo.service.ts`
- `src/app/core/services/gemini.service.ts`
- `src/app/core/services/gemini.service.spec.ts`
- `src/app/app.ts`
- `src/app/app.routes.ts`
- `src/app/app.routes.spec.ts`
- `src/app/data/navigation.data.ts`
- `src/app/data/services.data.ts`
- `src/app/data/tech-stack.data.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/shared/components/layout/footer/footer.component.ts`
- `src/app/features/home/components/hero/hero.component.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/features/home/components/tech-stack/tech-stack.component.ts`
- `src/app/features/home/components/cta-section/cta-section.component.ts`
- `src/app/features/services/services-list.component.ts`
- `src/app/features/services/service-detail.component.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/features/about/about.component.ts`
- `src/app/features/portfolio/portfolio-list.component.ts`
- `src/app/features/portfolio/project-detail.component.ts`
- `src/app/features/blog/blog.component.ts`
- `src/app/features/legal/terms.component.ts`
- `src/app/features/legal/privacy.component.ts`
- `src/app/shared/components/ui/chat/chat.component.ts`
- `src/app/shared/components/ui/chat/chat.component.html`
- `docs/07-changelog.md`

### Decisiones tomadas
Se implemento internacionalizacion liviana con un `LocaleService` propio y copy localizada por componente para evitar agregar una dependencia externa fuera de alcance. Se mantuvieron las rutas actuales en espanol y se adapto el SEO para reaccionar al idioma activo sin cambiar la estructura de navegacion.

### Validaciones realizadas
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run test:ci`

### Pendientes / Follow-ups
- Si se quiere SEO multilenguaje mas completo, el siguiente paso natural es sumar rutas diferenciadas o etiquetas `hreflang`.
- El build sigue mostrando una advertencia de presupuesto de estilos en el hero por el CSS del motion reel, aunque compila correctamente.

## [2026-04-24] - Agente: Codex

### Cambios
- Se redisenaron el home, header y footer con una direccion visual mas sobria, editorial y profesional.
- Se reemplazo la estetica generica del hero y de las cards por una composicion con mejor jerarquia, ritmo visual y llamados a la accion.
- Se reemplazo el poster estatico del hero por un motion reel animado generado en frontend para que la pieza visual se vea viva desde la carga inicial.

### Motivo
Mejorar la calidad percibida del front para que el sitio transmita una imagen mas profesional y menos cercana a una plantilla generica.

### Archivos afectados
- `src/styles.scss`
- `src/app/app.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/shared/components/layout/footer/footer.component.ts`
- `src/app/shared/components/layout/footer/footer.component.html`
- `src/app/features/home/components/hero/hero.component.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/features/home/components/tech-stack/tech-stack.component.ts`
- `src/app/features/home/components/cta-section/cta-section.component.ts`
- `src/assets/studio-reel-poster.svg`
- `docs/07-changelog.md`

### Decisiones tomadas
Se mantuvo el stack y la arquitectura actuales, concentrando el rediseño en estilos y composicion de la home para evitar cambios estructurales fuera de alcance.

### Validaciones realizadas
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run test:ci`

### Pendientes / Follow-ups
- Si se quiere un reel todavia mas cinematografico, incorporar despues un video MP4 propio del estudio.
- El hero quedo con advertencia de presupuesto de estilos del componente por el CSS extra del motion reel, aunque el build pasa correctamente.

## [2026-04-24] - Agente: Codex

### Cambios
- Se creo la carpeta `/docs` con la estructura documental obligatoria del proyecto.
- Se incorporo el contexto funcional, tecnico e historico existente en `AI_CONTEXT.md`, `README.md` y la configuracion real del repo.
- Se agrego `05-ai-rules.md` con la plantilla obligatoria y se documento la decision de estandarizar la documentacion.

### Motivo
Cumplir el protocolo definido en `AGENTS.md`, dejando una base documental consistente para futuras tareas y agentes.

### Archivos afectados
- `docs/README.md`
- `docs/01-context.md`
- `docs/02-architecture.md`
- `docs/03-setup.md`
- `docs/04-conventions.md`
- `docs/05-ai-rules.md`
- `docs/06-decisions.md`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
Se consolido la informacion operativa en `/docs` y se dejo `AI_CONTEXT.md` como insumo historico complementario. Ver `ADR-0002`.

### Validaciones realizadas
- Revision manual de `AGENTS.md`.
- Revision manual de `AI_CONTEXT.md`.
- Revision manual de `README.md`, `package.json`, `eslint.config.js`, `src/server.ts`, rutas y estructura de carpetas.

### Pendientes / Follow-ups
- Mantener sincronizados `/docs` y `AI_CONTEXT.md` ante futuros cambios relevantes.

## [2026-02-12] - Agente: [PENDIENTE: completar por el desarrollador]

### Cambios
- Se movio la integracion de Gemini al backend y se formalizo el endpoint `/api/chat`.
- Se agregaron SEO por ruta, rutas legales y mejoras de calidad con lint, tests y check.
- Se consolido un contexto tecnico compartido en `AI_CONTEXT.md`.

### Motivo
Fortalecer seguridad, SEO y mantenibilidad del sitio corporativo.

### Archivos afectados
- `src/server.ts`
- `src/app/core/services/gemini.service.ts`
- `src/app/core/services/seo.service.ts`
- `src/app/app.routes.ts`
- `AI_CONTEXT.md`

### Decisiones tomadas
Se mantuvo la API key solo en backend y se agrego fallback local en frontend. Ver `ADR-0001`.

### Validaciones realizadas
- `npm run check` segun el contexto historico disponible en `AI_CONTEXT.md`.

### Pendientes / Follow-ups
- Endurecer headers de seguridad.
- Tipar mas estrictamente el formulario de contacto.
- Mejorar limpieza de listeners globales en header.
- Agregar CI remoto para `npm run check`.
