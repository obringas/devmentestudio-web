# [2026-09-21] — Agente: Codex

### Cambios
- Se reemplazó el envío simulado del formulario por un `POST` real a Web3Forms encapsulado en `ContactService`.
- Se incorporaron `subject`, `from_name` y el honeypot `botcheck`, junto con un payload legible para las consultas recibidas.
- Se agregó manejo explícito de éxito, error, carga y prevención de envíos duplicados; ante fallas se conservan los datos y se ofrecen email y WhatsApp.
- Se añadió `contacto@devmentestudio.com` como enlace `mailto:` al cierre de `/modernizacion`.
- Se agregaron pruebas unitarias del servicio y del componente para éxito, rechazo, error HTTP y concurrencia.

### Motivo
Eliminar el falso mensaje de éxito del formulario anterior y habilitar la recepción real y verificable de consultas comerciales.

### Archivos afectados
- `src/app/config/site.config.ts`
- `src/app/core/services/contact.service.ts`
- `src/app/core/services/contact.service.spec.ts`
- `src/app/features/contact/contact.component.ts`
- `src/app/features/contact/contact.component.spec.ts`
- `src/app/features/modernization/modernization.component.ts`
- `AI_CONTEXT.md`
- `docs/02-architecture.md`
- `docs/03-setup.md`
- `docs/06-decisions.md`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
Se adoptó la integración cliente recomendada por Web3Forms mediante una capa de servicio. Ver `ADR-0003`.

### Validaciones realizadas
- `npm.cmd run lint`
- Tests unitarios específicos del formulario y su servicio: 8 aprobados.
- `npm.cmd run check`: lint, 14 tests y build SSR aprobados.
- Detector de calidad visual de Impeccable sobre las dos pantallas modificadas: sin hallazgos.

### Pendientes / Follow-ups
- Desplegar la rama aprobada y realizar un único envío real en producción, confirmando la recepción en `contacto@devmentestudio.com` antes de cerrar la tarea.
