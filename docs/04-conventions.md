# 04-conventions.md

## Convenciones generales

- Mantener mensajes, textos de UI y commits en castellano, salvo que una API o libreria requiera ingles.
- Respetar la arquitectura por capas del proyecto.
- Evitar duplicar logica entre `features`, `core` y `server`.
- No exponer secretos en frontend ni en logs.

## TypeScript y Angular

- Usar standalone components.
- Preferir `signal` para estado local cuando el patron actual ya lo usa.
- Mantener `ChangeDetectionStrategy.OnPush` en componentes donde ya esta aplicado o donde mejore consistencia.
- Usar formularios reactivos para formularios complejos.
- Cargar pantallas por `loadComponent` en rutas.

## Estilo de codigo

- `singleQuote: true`.
- `printWidth: 100`.
- Evitar `any` salvo justificacion fuerte.
- Evitar variables no usadas; si un argumento debe existir pero no se usa, prefijarlo con `_`.
- Comentar solo cuando el motivo de la decision no sea obvio.

## Frontend

- Componentes chicos y con una responsabilidad clara.
- Evitar llamadas HTTP directas desde componentes si existe un servicio para ello.
- Mostrar estados de carga, error y vacio cuando corresponda.
- Mantener consistencia visual con Tailwind y la paleta ya usada en el sitio.
- Cuidar accesibilidad basica con labels, `aria-label`, foco visible y semantica.

## Backend

- Validar entradas antes de procesar.
- Responder errores amigables y sin detalles internos.
- Mantener endpoints chicos y explicitos.
- No hardcodear secretos, URLs sensibles ni credenciales.

## Ramas y commits

- Preferencia del proyecto: mensajes de commit en castellano y descriptivos.
- Antes de push, correr `npm run check`.
