# 07-changelog.md

## [2026-09-22] — Agente: Codex

### Cambios
- Se reposicionó el sitio alrededor de modernización gradual y continuidad operativa, con contenido business-first en español e inglés.
- Se reconstruyeron Home y `/modernizacion`, y se alinearon Servicios, Portfolio, Nosotros y Contacto con la nueva narrativa y jerarquía visual.
- Se agregaron componentes de negocio reutilizables, diagrama de convivencia code-first, CTA flotante de WhatsApp móvil y contenido bilingüe centralizado.
- Se reforzó SEO/SSR con prerender de Modernización, canonical, hreflang, JSON-LD, `robots.txt` y sitemap.
- Se generaron capturas desktop/mobile de seis páginas e informes Lighthouse sobre el bundle SSR local.
- Se activó `logo-nuevo.png` como fuente maestra de marca y se generó `logo-nuevo-compact.png` para header y footer, evitando que el espacio interno del original reduzca la legibilidad del monograma.
- Se activó `favicon-concept-c.ico` como favicon y `favicon-concept-c.png` como Apple touch icon; Open Graph y Twitter usan el logo nuevo de alta resolución.
- Se cambió el transporte de Web3Forms de JSON a `FormData`, preservando la validación estricta de HTTP 200 + `success: true`.
- Se eliminó la superposición entre chat y WhatsApp en 481–767 px, se adelantó el formulario en contacto móvil y se corrigieron contrastes de Servicios y páginas secundarias.

### Motivo
Presentar a DevMenteStudio como especialista en sistemas que sostienen operaciones reales, hablar primero del riesgo y el resultado empresarial, y dejar la tecnología como respaldo secundario.

### Archivos afectados
- `src/app/data/business-content.data.ts`
- `src/app/features/home/home.component.ts`
- `src/app/features/modernization/modernization.component.ts`
- `src/app/shared/components/business/*`
- `src/app/features/services/services-list.component.ts`
- `src/app/features/portfolio/*`
- `src/app/features/about/about.component.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/core/services/seo.service.ts`
- `src/styles.scss`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/logo-nuevo.png`
- `public/logo-nuevo-compact.png`
- `public/favicon-concept-c.ico`
- `public/favicon-concept-c.png`
- `src/index.html`
- `DESIGN.md`
- `PRODUCT.md`
- `.impeccable/review/*`

### Decisiones tomadas
Se adoptó azure `#0078D4` como único acento primario y una implementación visual code-first. Ver ADR-0004.

### Validaciones realizadas
- `npm.cmd run check`: lint, 14 tests y build SSR aprobados; 9 rutas prerenderizadas.
- Revisión responsive manual de Home, Modernización, Servicios, Portfolio, Nosotros y Contacto.
- Verificación específica a 600 px: chat oculto y WhatsApp visible sin solapamiento; contraste de `Incluye:` verificado como `rgb(39,39,42)` sobre `rgb(250,250,250)`.
- Verificación de contacto en inglés a 390 px, con formulario antes de la información secundaria y modernización preseleccionada.
- Test de `ContactService` que comprueba cuerpo `FormData`, honeypot vacío y ausencia de `Content-Type` manual.
- Verificación por `curl` y HTML prerenderizado de contenido por ruta, `lang`, canonical, hreflang, JSON-LD y contrato visual.
- Verificación visual y en DOM del nuevo logo en header/footer (`320×208`) y de los enlaces del favicon/Apple touch icon.
- Lighthouse móvil sobre SSR local: Home 72/100/100/100 y Modernización 66/100/100/100 en Performance/Accesibilidad/Buenas prácticas/SEO; CLS 0 en ambas.
- Lighthouse focalizado tras las correcciones: Servicios y Contacto 100/100/100 en Accesibilidad/Buenas prácticas/SEO.

### Pendientes / Follow-ups
- Incorporar foto profesional e ilustración final cuando existan activos aprobados.
- Repetir Lighthouse y el envío real de Web3Forms después del deploy.
- Esperar el OK de Oscar antes de integrar `feature/rediseno-negocio` a `main`.

## [2026-09-22] — Agente: Codex

### Cambios
- Se creó un favicon alternativo basado en el concepto C del nuevo monograma D·M.
- Se generó un `.ico` multirresolución y su fuente PNG plana para revisión antes de reemplazar el favicon vigente.

### Motivo
Adaptar el concepto C a una silueta cuadrada que conserve legibilidad en pestañas del navegador y tamaños desde 16 px.

### Archivos afectados
- `public/favicon-concept-c.ico`
- `public/favicon-concept-c.png`
- `docs/07-changelog.md`

### Decisiones tomadas
La variante usa un contenedor navy, una D blanca y una M azure para sostener contraste a tamaños pequeños. Posteriormente fue aprobada y activada en el rediseño registrado en la entrada superior.

### Validaciones realizadas
- Revisión visual de la fuente PNG a 512 px.
- Revisión ampliada del frame rasterizado a 16 px.
- Verificación de las resoluciones internas 16, 32, 48, 64, 128 y 256 px del archivo ICO.

### Pendientes / Follow-ups
- Resuelto en la entrada superior: el favicon fue aprobado y activado en `src/index.html`.

## [2026-09-22] — Agente: Codex

### Cambios
- Se agregó `https://api.web3forms.com` a la directiva `connect-src` de la CSP de producción en Vercel.
- Se corrigió la documentación de seguridad para reflejar la política CSP real y su dependencia con las integraciones frontend.

### Motivo
La CSP publicada sólo permitía conexiones hacia el mismo origen y Google Gemini. El navegador bloqueaba Web3Forms antes de realizar el `POST`, generando `TypeError: Failed to fetch` y mostrando correctamente el estado de error del formulario.

### Archivos afectados
- `vercel.json`
- `docs/02-architecture.md`
- `docs/03-setup.md`
- `docs/06-decisions.md`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
Mantener la CSP restrictiva y agregar únicamente el endpoint HTTPS requerido por Web3Forms.

### Validaciones realizadas
- `npm.cmd run check`: lint, 14 tests y build SSR aprobados.
- Parseo de `vercel.json` y verificación explícita de `https://api.web3forms.com` en `connect-src`.
- Inspección de los headers publicados, que confirmó la ausencia previa del endpoint en la CSP.

### Pendientes / Follow-ups
- Desplegar y realizar un envío real en producción para confirmar la recepción del correo.

## [2026-09-21] — Agente: Codex

### Cambios
- Se reemplazó el envío simulado del formulario por un `POST` real a Web3Forms encapsulado en `ContactService`.
- Se incorporaron `subject`, `from_name` y el honeypot `botcheck`, junto con un payload legible para las consultas recibidas.
- Se agregó manejo explícito de éxito, error, carga y prevención de envíos duplicados; ante fallas se conservan los datos y se ofrecen email y WhatsApp.
- Se añadió `contacto@devmentestudio.com` como enlace `mailto:` al cierre de `/modernizacion`.
- Se agregaron pruebas unitarias del servicio y del componente para éxito, rechazo, error HTTP y concurrencia.

### Motivo
Eliminar el falso mensaje de éxito del formulario anterior y habilitar la recepción real y verificable de consultas comerciales.

### Archivos afectados
- `src/app/config/site.config.ts`
- `src/app/core/services/contact.service.ts`
- `src/app/core/services/contact.service.spec.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/features/contact/contact.component.spec.ts`
- `src/app/features/modernization/modernization.component.ts`
- `AI_CONTEXT.md`
- `docs/02-architecture.md`
- `docs/03-setup.md`
- `docs/06-decisions.md`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
Se adoptó la integración cliente recomendada por Web3Forms mediante una capa de servicio. Ver `ADR-0003`.

### Validaciones realizadas
- `npm.cmd run lint`
- Tests unitarios específicos del formulario y su servicio: 8 aprobados.
- `npm.cmd run check`: lint, 14 tests y build SSR aprobados.
- Detector de calidad visual de Impeccable sobre las dos pantallas modificadas: sin hallazgos.

### Pendientes / Follow-ups
- Desplegar la rama aprobada y realizar un único envío real en producción, confirmando la recepción en `contacto@devmentestudio.com` antes de cerrar la tarea.

## [2026-09-21] — Agente: Gemini

### Cambios
- Creación de la nueva página estratégica `/modernizacion` (Modernización de sistemas legacy hacia .NET 8 y SQL Server) con sus 6 secciones (Hero, Señales de continuidad, Cómo trabajamos, Servicios, Con quién vas a trabajar con perfil de Oscar Bringas y Cierre) y metaetiquetas SEO completas.
- Reemplazo del placeholder de Portfolio por los 3 casos reales de producción:
  1. Modernización de un sistema Visual FoxPro hacia .NET 8 (Agroindustria / cooperativa).
  2. Middleware de facturación electrónica (Seguros).
  3. Replicación transaccional SQL Server hacia Azure (Agroindustria).
- Incorporación de las portadas de los casos en `public/images/portfolio/` y soporte en `project-detail.component.ts`.
- Reescritura total de la página Nosotros (`/nosotros`): presentación de Oscar Bringas (Ing. UTN, +15 años líder .NET, 20 años SQL Server), nuevos valores profesionales (Criterio antes que velocidad, Cambios graduales y reversibles, Expectativas honestas, Código que otro pueda mantener), números reales y línea de tiempo iniciada en 2005-2006.
- Corrección de tildes y acentuación en castellano en todo el sitio web (`home-content.data.ts`, `services.data.ts`, `navigation.data.ts`, `terms.component.ts`, `privacy.component.ts`, `gemini.service.ts`, etc.).
- Navegación principal: se incorporó "Modernización" como primer enlace luego de Inicio y se retiró "Blog" del menú.
- Formulario de contacto: se eliminó la opción menor a USD 500 fijando el nuevo rango inicial en "USD 1.000 - 5.000", se incorporó "Modernización de sistema existente" como primera opción en servicios de interés, y se agregó soporte de preselección automática vía queryParam (`?servicio=modernizacion`).
- Portada (Home): se integró Modernización de sistemas legacy destacada en la grilla de servicios principales con enlace directo a `/modernizacion`.

### Motivo
Actualización comercial y de posicionamiento estratégico de DevMenteStudio.com para enfocar el estudio en la modernización de sistemas legacy críticos, reflejar el liderazgo técnico real y presentar los casos de portfolio en producción.

### Archivos afectados
- `public/images/portfolio/*`
- `src/app/features/modernization/modernization.component.ts`
- `src/app/features/portfolio/portfolio-list.component.ts`
- `src/app/features/portfolio/project-detail.component.ts`
- `src/app/features/about/about.component.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/features/contact/contact.component.spec.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/data/portfolio.data.ts`
- `src/app/data/services.data.ts`
- `src/app/data/home-content.data.ts`
- `src/app/data/navigation.data.ts`
- `src/app/data/layout-content.data.ts`
- `src/app/data/index.ts`
- `src/app/app.routes.ts`
- `src/app/app.routes.spec.ts`
- `src/app/core/services/seo.service.ts`
- `src/app/core/services/gemini.service.ts`
- `src/app/features/legal/terms.component.ts`
- `src/app/features/legal/privacy.component.ts`
- `docs/07-changelog.md`

### Decisiones tomadas
Se diseñó la página `/modernizacion` como landing page prioritaria para outbound con CTAs directos a diagnóstico y WhatsApp. Se mantuvieron las reglas de negocio estrictas (sin absolutos, sin métricas inventadas, sin nombres de clientes).

### Validaciones realizadas
- `npm run check` (eslint, tests unitarios en vitest y build Angular SSR de producción). Todo aprobado exitosamente.

### Pendientes / Follow-ups
- Ninguno.

## [2026-05-06] - Agente: Gemini

### Cambios
- Se modificó la configuración de internacionalización para establecer el inglés (`en`) como idioma predeterminado de la aplicación.
- Se ajustaron los bordes y sombras de las tarjetas y paneles (`styles.scss`) para darles mayor relieve y definición.
- Se cambió el favicon por defecto de Angular por el logo de DevMenteStudio (`logo.png`) en `index.html`.

### Motivo
El usuario solicitó que el idioma por defecto sea el inglés y mejorar el contorno de las tarjetas para destacarlas más sobre el nuevo fondo claro.

### Archivos afectados
- `src/app/core/services/locale.service.ts`
- `src/styles.scss`
- `docs/07-changelog.md`

### Decisiones tomadas
Se invirtió la lógica de fallback en el `LocaleService`. Ahora devuelve `'en'` en SSR y como fallback del navegador, a menos que se detecte explícitamente `'es'`. Además, se incrementó la opacidad y tamaño de las sombras y bordes en el CSS global.

### Validaciones realizadas
- Se verificó que el servicio compile correctamente y la página cargue con la configuración.

### Pendientes / Follow-ups
- Ninguno por el momento.

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
