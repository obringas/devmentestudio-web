# 08-known-issues.md

## Headers de seguridad HTTP pendientes

### Fecha
2026-04-24

### Descripcion
El servidor SSR expone `/api/chat` y sirve contenido web, pero no se observa endurecimiento explicito de headers como CSP, `Referrer-Policy` o `Permissions-Policy`.

### Impacto
Medio

### Modulo afectado
`src/server.ts`

### Recomendacion
Agregar headers de seguridad apropiados para SSR y revisar compatibilidad con recursos externos antes de desplegar.

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
