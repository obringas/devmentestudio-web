# [2026-04-24] - Agente: Codex

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
