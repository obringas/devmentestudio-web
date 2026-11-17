# [2026-11-12] — Agente: Gemini

### Cambios
- Se incorporó el nuevo caso real anonimizado de portfolio **"De una planilla Excel con macros a un sistema de stock y panorama financiero"** (`de-excel-macros-a-sistema-web-stock`, rubro: *Insumos médicos quirúrgicos*, stack: `.NET`, `Angular`, `PostgreSQL (Supabase)`).
- Se generaron las capturas reales anonimizadas de las pantallas **Inicio operativo** (`public/images/portfolio/medical-stock-operacion-es.png`) y **Panorama ejecutivo en USD/ARS** (`public/images/portfolio/medical-stock-panorama-es.png`), junto con la lámina de portada 1600×900 (`public/images/portfolio/medical-supplies-excel-to-web-es.png`), eliminando nombres de clientes, usuarios e instituciones médicas.
- Se extendió `PortfolioCase` y `ProjectDetailComponent` para mostrar la galería de pantallas del sistema en la vista de detalle del caso (`/portfolio/de-excel-macros-a-sistema-web-stock`).
- Se destacó la propuesta comercial **"De planillas Excel con macros a un sistema web"** (`excel-a-sistema`) en Inicio (`/`), Modernización (`/modernizacion`), Servicios (`/servicios` y `/servicios/excel-a-sistema`) y en el selector del formulario de Contacto (`/contacto?servicio=excel-a-sistema`).
- Se incorporó la foto real de Oscar Bringas optimizada en formato 4:5 (`public/images/oscar-bringas.jpg`, 640×800) en Inicio, Modernización y Nosotros, eliminando el placeholder `OB` y el texto de foto pendiente.
- Se abrió el mensaje del Hero de Inicio y se agregó la sección de **3 puertas de entrada** (`entryPaths`: *Salir de un Excel inmanejable*, *Web comercial, tienda o sistema a medida* y *Modernizar un sistema viejo sin parar*) junto con CTA directo a WhatsApp en el Hero.
- Se fijó el español (`es`) como idioma predeterminado en `LocaleService` independientemente del idioma del sistema operativo del navegador, salvo selección explícita de inglés (`?lang=en` o `localStorage`).
- Se sumaron opciones accesibles de presupuesto en Contacto (*"A definir / Cotizar por etapas"* y *"Hasta USD 1.000"*), se actualizó `siteConfig.contact.whatsappUrl` con el mensaje comercial prearmado (*"Hola Oscar, vi tu web y te quería consultar por un sistema / página para mi empresa"*), se incorporó un botón directo de WhatsApp en la barra superior de escritorio (`HeaderComponent`) y se añadió un bloque destacado de contacto directo por WhatsApp al lado del formulario en `/contacto` (además del CTA junto al botón de envío).
- Se completó la unificación estética editorial en el cuerpo y cierre de `/servicios`, `/servicios/:slug`, `/contacto` y `/nosotros`, reemplazando las tarjetas redondeadas antiguas (`rounded-[2rem]`, íconos con `bg-gradient-to-br` y círculos `blur-3xl`) por el sistema editorial limpio de Inicio, Modernización y Portfolio (`#1c2a3c`, `#0067b8`, `#f4f7f9`, `#c7d3dd`, `#00965f`).
- Se actualizaron el contexto del asistente IA (`src/server.ts`, `api/chat.js`, `gemini.service.ts`), el `public/sitemap.xml` y los tests unitarios de `ContactComponent` y `portfolio.data.ts`.

### Motivo
Promocionar la solución entregada en producción (reemplazo en una semana de una planilla Excel con macros inmanejable por un sistema web de stock con trazabilidad de movimientos y tablero financiero Panorama para dirección/gerencia) y optimizar la conversión comercial del sitio para captar tanto PyMEs y comercios como empresas con sistemas críticos.

### Archivos afectados
- `public/images/oscar-bringas.jpg`
- `public/images/portfolio/medical-supplies-excel-to-web-es.png`
- `public/images/portfolio/medical-stock-operacion-es.png`
- `public/images/portfolio/medical-stock-panorama-es.png`
- `src/app/config/site.config.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/core/services/locale.service.ts`
- `src/app/data/portfolio.data.ts`
- `src/app/data/business-content.data.ts`
- `src/app/data/services.data.ts`
- `src/app/features/home/home.component.ts`
- `src/app/features/about/about.component.ts`
- `src/app/features/services/services-list.component.ts`
- `src/app/features/services/service-detail.component.ts`
- `src/app/features/portfolio/portfolio-list.component.ts`
- `src/app/features/portfolio/project-detail.component.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/features/contact/contact.component.spec.ts`
- `src/app/shared/components/business/person-section.component.ts`
- `src/app/core/services/gemini.service.ts`
- `src/server.ts`
- `api/chat.js`
- `public/sitemap.xml`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
- Se mantuvo la regla de anonimización estricta del sitio (`PRODUCT.md` / `DESIGN.md`), limpiando de forma permanente en las imágenes los nombres propios, sanatorios y marca original, conservando la interfaz real del producto.
- Se comunicó el hito de puesta en producción en una semana como resultado verificable del caso puntual, sin fijarlo como promesa rígida general para cualquier alcance.

### Validaciones realizadas
- Ejecución de `npm run check` (lint, tests unitarios en Vitest y build Angular SSR de producción).
- Revisión visual de las 3 imágenes generadas en `public/images/portfolio/`.

### Pendientes / Follow-ups
- Ninguno.
