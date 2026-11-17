# 08-known-issues.md

## Activos editoriales definitivos pendientes

### Fecha
2026-11-12

### Descripcion
La foto real de Oscar (`public/images/oscar-bringas.jpg`) ya fue incorporada en Home, `/modernizacion` y `/nosotros`. El diagrama de convivencia sigue siendo una implementación code-first; una ilustración final producida por diseño es opcional.

### Impacto
Bajo

### Modulo afectado
Home y `/modernizacion`.

### Recomendacion
La ilustración final sólo debe reemplazar al diagrama actual si conserva el mismo mensaje, proporción y peso liviano.

## Rendimiento móvil condicionado por fuentes remotas

### Fecha
2026-09-22

### Descripcion
Lighthouse móvil sobre el bundle SSR local obtuvo Performance 72 en Home y 66 en Modernización. Accesibilidad, buenas prácticas y SEO alcanzaron 100. El principal recurso bloqueante es la hoja de Google Fonts; el servidor local tampoco aplica la compresión propia del hosting productivo.

### Impacto
Medio

### Modulo afectado
`src/index.html`, carga inicial global.

### Recomendacion
Medir nuevamente después del deploy y, si Performance sigue por debajo del objetivo, self-hostear únicamente los subconjuntos y pesos usados o evaluar una pila tipográfica local equivalente.

## Headers de seguridad HTTP pendientes (resuelto)

### Fecha
2026-04-24

### Estado
Resuelto el 2026-09-22.

### Descripcion
Originalmente no se había identificado el endurecimiento de headers. La configuración de Vercel sí define CSP, `Referrer-Policy`, `Permissions-Policy`, HSTS y otros headers defensivos.

### Impacto
Medio

### Modulo afectado
`vercel.json`

### Recomendacion
Mantener la CSP sincronizada con las integraciones frontend. El 2026-09-22 se agregó `https://api.web3forms.com` a `connect-src` para habilitar el formulario sin ampliar innecesariamente la política.

## Duplicacion potencial entre `api/chat.js` y `src/server.ts`

### Fecha
2026-04-24

### Descripcion
Existe una implementacion bajo `api/chat.js` y otra integracion de chat dentro de `src/server.ts`. Si ambas evolucionan por separado, pueden divergirse comportamiento, validaciones o seguridad.

### Impacto
Medio

### Modulo afectado
`api/chat.js`, `src/server.ts`

### Recomendacion
Definir una unica fuente de verdad para el endpoint de chat y documentar claramente el rol de cada archivo en deploy y desarrollo.

## Formulario de contacto sin persistencia real (resuelto)

### Fecha
2026-04-24

### Estado
Resuelto el 2026-09-21.

### Descripcion
El formulario de contacto validaba datos del lado cliente pero simulaba el envio con `setTimeout`, sin integración real ni comprobación del resultado.

### Impacto
Medio

### Modulo afectado
`src/app/features/contact/contact.component.ts`

### Recomendacion
Se integró Web3Forms mediante un servicio tipado y transporte `FormData`, con estados reales de éxito, error y carga. Resta validar la entrega extremo a extremo con un envío desde producción después del deploy.

## Tailwind 3 declarado con el plugin PostCSS de Tailwind 4

### Fecha
2026-11-17

### Descripcion
`package.json` fija `tailwindcss` ^3.4.19 y `@tailwindcss/postcss` ^4.1.18; `postcss.config.js` usa el plugin v4 y existe `tailwind.config.js` (formato v3). Versiones mezcladas; el build hoy funciona.

### Impacto
Medio

### Modulo afectado
`package.json`, `postcss.config.js`, `tailwind.config.js`

### Recomendacion
Decidir una sola versión (migrar a v4 o volver al plugin v3) con ADR. No tocado en la migración de protocolo.

## Sin CI remoto

### Fecha
2026-11-17

### Descripcion
`.github/workflows/` está vacío: `npm run check` (lint, tests, build) solo corre en local. Ya figuraba como follow-up en el changelog de 2026-02-12.

### Impacto
Medio

### Modulo afectado
`.github/workflows/`

### Recomendacion
Agregar un workflow que corra `npm run check` en PR a `develop` y `main`.

## `AI_CONTEXT.md` se superpone con `/docs`

### Fecha
2026-11-17

### Descripcion
`AI_CONTEXT.md` en la raíz duplica contexto que hoy vive en `/docs` y puede divergir.

### Impacto
Bajo

### Modulo afectado
`AI_CONTEXT.md`

### Recomendacion
Consolidar lo vigente en `/docs` y archivar o eliminar el archivo, con autorización.

## `02-architecture.md` sin sección "Sistema visual"

### Fecha
2026-11-17

### Descripcion
El protocolo pide en frontends una sección "Sistema visual" que apunte a `DESIGN.md`. `02-architecture.md` solo lo menciona en "Activos de marca". Además su árbol "Estructura principal" omite `src/assets/` y `api/`.

### Impacto
Bajo

### Modulo afectado
`docs/02-architecture.md`

### Recomendacion
Agregar la sección en una tarea que permita editar `02`; no se corrigió en la migración por alcance.

## `npm run check` falla con EPERM al limpiar `dist/` (Windows)

### Fecha
2026-11-17

### Descripcion
El build Angular genera el bundle y las 9 rutas prerenderizadas, pero termina con `EPERM: unlink dist/devmentestudio-web/3rdpartylicenses.txt`, probablemente por un proceso que bloquea `dist/`. Lint y tests (17) pasan. Además `home.component.ts` excede el presupuesto de estilos por 42 bytes (warning).

### Impacto
Bajo

### Modulo afectado
Build local en Windows

### Recomendacion
Cerrar procesos que usen `dist/` y reintentar; confirmar si persiste en CI.

## `check-context.js` marca falso positivo de secreto en `api/chat.js:35`

### Fecha
2026-11-17

### Descripcion
La línea solo invoca una función que lee la clave; no hay valor literal. La causa está en `.ai/tools/check-context.js`: `isPlaceholder` solo exime `process.env`.

### Impacto
Bajo

### Modulo afectado
`.ai/tools/check-context.js` (copia del master)

### Recomendacion
Corregir en el master del template y re-sincronizar `.ai/`. El repo no se toca (ni `api/` ni `.ai/`).
