# AI_CONTEXT.md - Contexto Tecnico Integral del Proyecto

Este documento es la fuente de verdad para que cualquier IA (o dev nuevo) pueda entrar al proyecto y trabajar sin friccion.

## 1. Objetivo del Proyecto

`devmentestudio-web` es el sitio corporativo de DevMenteStudio.

Objetivos funcionales:
- Presentar servicios de software (landing pages, e-commerce, desarrollo a medida, consultoria).
- Mostrar portfolio y paginas informativas.
- Permitir contacto comercial.
- Incluir asistente de chat con IA para consultas rapidas.

Objetivos tecnicos:
- Angular moderno (standalone + signals + control flow nuevo).
- SSR con Express para SEO/performance.
- Seguridad: claves solo en backend, no en frontend.
- Calidad: lint + tests + build automatizados.

## 2. Stack Tecnologico

- Angular 21 (standalone components)
- TypeScript 5.9
- SSR: `@angular/ssr` + Express
- Estilos: Tailwind CSS + SCSS
- Reactive programming: RxJS
- IA: `@google/generative-ai` en servidor
- Hosting/Deploy: Vercel (deploy automatico por push)
- Testing: Vitest via `ng test`
- Lint: ESLint flat config + angular-eslint

## 3. Arquitectura General

Arquitectura por capas:
- `features`: paginas y casos de uso.
- `shared`: componentes reutilizables UI/Layout.
- `core`: servicios globales y logica transversal.
- `data/models/config`: contratos, catalogos estaticos y config.
- `server.ts`: API backend SSR + endpoint de chat.

Reglas clave ya aplicadas:
- Standalone components.
- `ChangeDetectionStrategy.OnPush` en componentes relevantes.
- Uso de `signal`/`computed` para estado.
- Rutas lazy-loaded.
- SEO por ruta con servicio centralizado.

## 4. Estructura de Carpetas (Actual)

```text
src/
  app/
    app.ts
    app.config.ts
    app.config.server.ts
    app.routes.ts
    app.routes.server.ts

    config/
      site.config.ts

    core/
      services/
        gemini.service.ts         # Chat frontend (consume /api/chat + fallback)
        gemini.service.spec.ts
        seo.service.ts            # Meta tags dinamicos por ruta

    data/
      navigation.data.ts
      services.data.ts
      tech-stack.data.ts
      index.ts

    models/
      navigation.model.ts
      project.model.ts
      service.model.ts
      team-member.model.ts
      testimonial.model.ts
      index.ts

    features/
      home/
        home.component.ts
        components/
          hero/
          services-preview/
          tech-stack/
          cta-section/
      services/
        services-list.component.ts
        service-detail.component.ts
      portfolio/
        portfolio-list.component.ts
        project-detail.component.ts
      about/
        about.component.ts
      contact/
        contact.component.ts
        contact.component.spec.ts
      blog/
        blog.component.ts
      legal/
        terms.component.ts
        privacy.component.ts

    shared/
      components/
        layout/
          header/
          footer/
          container/
          section/
        ui/
          button/
          card/
          badge/
          input/
          chat/

  environments/
    environment.ts
    environment.production.ts

  main.ts
  main.server.ts
  server.ts
  styles.scss
```

Archivos de calidad:
- `eslint.config.js`
- `README.md`
- `AI_CONTEXT.md`

## 5. Rutas y Modulos

Rutas cliente (`app.routes.ts`):
- `/` Home
- `/servicios`
- `/servicios/:slug`
- `/portfolio`
- `/portfolio/:slug`
- `/nosotros`
- `/contacto`
- `/blog`
- `/terminos`
- `/privacidad`
- wildcard -> `/`

Rutas SSR (`app.routes.server.ts`):
- Prerender: `''`, `servicios`, `portfolio`, `nosotros`, `contacto`, `blog`, `terminos`, `privacidad`
- Server render: `servicios/:slug`, `portfolio/:slug`, `**`

## 6. Funcionalidad por Modulo

### Home
- Hero principal + secciones de valor.
- Resumen de servicios y stack.
- CTA a contacto.

### Servicios
- Listado de servicios.
- Detalle por slug con features, beneficios y tecnologias.

### Portfolio
- Vista principal y detalle por slug (detalle actual placeholder/controlado).

### Nosotros
- Informacion institucional y propuesta de valor.

### Contacto
- Formulario reactivo con validaciones.
- Estado de envio simulado.
- Bloques de contacto y redes.

### Blog
- Landing de blog (placeholder funcional con ruta real).

### Legal
- Terminos y politica de privacidad con contenido base.

### Chat IA
- Componente flotante global `app-chat`.
- Frontend llama backend `/api/chat`.
- Si backend/IA falla, responde fallback local.

## 7. Flujo del Chat IA (Arquitectura Segura)

Flujo:
1. Usuario envia mensaje en UI.
2. `GeminiService` (frontend) hace `POST /api/chat`.
3. `server.ts` usa `GEMINI_API_KEY` (solo backend) y consulta Gemini.
4. Respuesta vuelve al frontend.
5. Si falla, `GeminiService` usa fallback local.

Seguridad:
- NO hay API keys en frontend.
- Variables `environment.ts` ya no contienen clave Gemini.
- Clave leida desde entorno del servidor.

## 8. SEO Implementado

- Titulos por ruta (`title` en rutas).
- Descripcion por ruta (`data.description`).
- `SeoService` actualiza dinamicamente:
  - `meta description`
  - `og:title`, `og:description`, `og:url`, `og:image`
  - `twitter:title`, `twitter:description`, `twitter:url`, `twitter:image`
  - `canonical`

## 9. Buenas Practicas Adoptadas

- Componentes standalone.
- `OnPush` en componentes principales.
- Estado con signals.
- Lazy loading por rutas.
- Evitar `innerHTML` inseguro:
  - Se removio `bypassSecurityTrustHtml` en footer/contacto.
  - SVGs renderizados via paths controlados.
- Servicios tipados y manejo de errores.
- Tests unitarios minimos agregados.
- Lint configurado para TS + templates Angular.

## 10. Scripts de Desarrollo y Calidad

- `npm start` -> dev server
- `npm run build` -> build de produccion
- `npm test` -> tests (watch)
- `npm run test:ci` -> tests sin watch
- `npm run lint` -> lint TS/HTML
- `npm run lint:fix` -> lint con fix
- `npm run check` -> `lint + test:ci + build`

Regla recomendada antes de push:
- Ejecutar `npm run check` y verificar verde.

## 11. Variables de Entorno

Local (`.env`):

```env
GEMINI_API_KEY=AIza...
```

Produccion (Vercel):
- Configurar `GEMINI_API_KEY` en Project Settings -> Environment Variables.

Notas:
- El formato valido de key debe iniciar con `AIza`.
- Si aparece `API_KEY_INVALID`, la key es invalida/incompleta/no corresponde al servicio.

## 12. Deploy en Vercel

- Trigger: push a rama conectada (actualmente `main`).
- Vercel ejecuta build y deploy automatico.
- El proyecto ya esta adaptado para SSR en Vercel.

Checklist rapido pre-push:
1. `npm run check`
2. Verificar que no haya secretos en codigo.
3. Commit descriptivo.
4. Push a `main`.

## 13. Testing Actual

Suites agregadas:
- `app.routes.spec.ts` (smoke de rutas)
- `gemini.service.spec.ts` (flujo `/api/chat`, fallback, server platform)
- `contact.component.spec.ts` (validaciones y submit)

Estado esperado:
- `npm run test:ci` en verde.

## 14. Convenciones para Commits

Preferencia del proyecto:
- Mensajes en castellano.
- Claros y detallados.
- Incluir resumen + bullets de cambios relevantes.

Ejemplo:
- Titulo: `Implementa mejoras de seguridad y SEO por ruta`
- Cuerpo:
  - `- Migra chat a backend /api/chat con key en servidor.`
  - `- Agrega SeoService y metadata dinamica.`
  - `- Incorpora tests y lint.`

## 15. Guia Operativa para IA (Playbook)

Si una IA toma este repo:
1. Leer `README.md` y este `AI_CONTEXT.md`.
2. Ejecutar `npm install`.
3. Validar `.env` (`GEMINI_API_KEY`).
4. Ejecutar `npm run check`.
5. Revisar rutas y modulos impactados antes de editar.
6. Mantener consistencia con patterns actuales.
7. No introducir secretos en frontend.
8. Si cambia funcionalidad critica, agregar/ajustar tests.

## 16. Estado Actual y Pendientes Recomendados

Ya resuelto:
- Seguridad de key Gemini (backend only).
- Chat funcional con fallback.
- Rutas faltantes (`/blog`, `/terminos`, `/privacidad`).
- SEO por ruta.
- Lint + tests + check.

Pendientes sugeridos:
- Endurecer headers de seguridad (CSP, Referrer-Policy, Permissions-Policy).
- Tipar `FormGroup` de contacto de forma estricta.
- Mejorar limpieza de listeners globales en header.
- Agregar CI remoto (GitHub Actions) ejecutando `npm run check`.

## 17. Definicion de Hecho (DoD)

Un cambio se considera listo si:
- Compila (`npm run build`).
- Pasa tests (`npm run test:ci`).
- Pasa lint (`npm run lint`).
- No expone secretos.
- Mantiene coherencia arquitectonica.
- Incluye documentacion minima cuando cambia comportamiento.

---

Ultima actualizacion: 2026-02-12
