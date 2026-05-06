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

## Formulario de contacto sin persistencia real

### Fecha
2026-04-24

### Descripcion
El formulario de contacto valida datos del lado cliente pero hoy simula el envio con `setTimeout`, sin integracion backend ni auditoria del resultado.

### Impacto
Medio

### Modulo afectado
`src/app/features/contact/contact.component.ts`

### Recomendacion
Implementar un endpoint backend o integracion externa para envio real, con estados de error y exito persistentes.
