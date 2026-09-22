# 08-known-issues.md

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
Se integró Web3Forms mediante un servicio tipado, con estados reales de éxito, error y carga. Resta validar la entrega extremo a extremo con un envío desde producción después del deploy.
