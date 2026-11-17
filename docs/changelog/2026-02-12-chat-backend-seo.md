# [2026-02-12] - Agente: [PENDIENTE: completar por el desarrollador]

### Cambios
- Se movio la integracion de Gemini al backend y se formalizo el endpoint `/api/chat`.
- Se agregaron SEO por ruta, rutas legales y mejoras de calidad con lint, tests y check.
- Se consolido un contexto tecnico compartido en `AI_CONTEXT.md`.

### Motivo
Fortalecer seguridad, SEO y mantenibilidad del sitio corporativo.

### Archivos afectados
- `src/server.ts`
- `src/app/core/services/gemini.service.ts`
- `src/app/core/services/seo.service.ts`
- `src/app/app.routes.ts`
- `AI_CONTEXT.md`

### Decisiones tomadas
Se mantuvo la API key solo en backend y se agrego fallback local en frontend. Ver `ADR-0001`.

### Validaciones realizadas
- `npm run check` segun el contexto historico disponible en `AI_CONTEXT.md`.

### Pendientes / Follow-ups
- Endurecer headers de seguridad.
- Tipar mas estrictamente el formulario de contacto.
- Mejorar limpieza de listeners globales en header.
- Agregar CI remoto para `npm run check`.
