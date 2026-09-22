# 08-known-issues.md

## Activos editoriales definitivos pendientes

### Fecha
2026-09-22

### Descripcion
La sección de Oscar usa un monograma neutral y el diagrama de convivencia es una implementación code-first. Todavía no se incorporaron la foto profesional definitiva ni una ilustración final producida por diseño.

### Impacto
Bajo

### Modulo afectado
Home, `/modernizacion` y `/nosotros`.

### Recomendacion
Reemplazar el monograma sólo cuando exista una foto aprobada y optimizada. Mantener las medidas actuales para evitar cambios de layout. La ilustración final puede reemplazar al diagrama actual si conserva el mismo mensaje, proporción y peso liviano.

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
