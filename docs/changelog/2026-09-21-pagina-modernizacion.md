# [2026-09-21] — Agente: Gemini

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
