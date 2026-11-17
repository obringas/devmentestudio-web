# [2026-09-22] — Agente: Codex

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
- Lighthouse final sobre SSR local con la marca nueva: Home móvil 74/100/100/100 y Modernización móvil 73/100/100/100 en Performance/Accesibilidad/Buenas prácticas/SEO; CLS 0 y 0,009 respectivamente. Home desktop alcanzó 98/100/100/100 y CLS 0,001.
- Lighthouse focalizado tras las correcciones: Servicios y Contacto 100/100/100 en Accesibilidad/Buenas prácticas/SEO.

### Pendientes / Follow-ups
- Incorporar foto profesional e ilustración final cuando existan activos aprobados.
- Repetir Lighthouse y el envío real de Web3Forms después del deploy.
- Esperar el OK de Oscar antes de integrar `feature/rediseno-negocio` a `main`.
