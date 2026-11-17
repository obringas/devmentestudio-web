# [2026-09-22] — Agente: Codex

### Cambios
- Se agregó `https://api.web3forms.com` a la directiva `connect-src` de la CSP de producción en Vercel.
- Se corrigió la documentación de seguridad para reflejar la política CSP real y su dependencia con las integraciones frontend.

### Motivo
La CSP publicada sólo permitía conexiones hacia el mismo origen y Google Gemini. El navegador bloqueaba Web3Forms antes de realizar el `POST`, generando `TypeError: Failed to fetch` y mostrando correctamente el estado de error del formulario.

### Archivos afectados
- `vercel.json`
- `docs/02-architecture.md`
- `docs/03-setup.md`
- `docs/06-decisions.md`
- `docs/07-changelog.md`
- `docs/08-known-issues.md`

### Decisiones tomadas
Mantener la CSP restrictiva y agregar únicamente el endpoint HTTPS requerido por Web3Forms.

### Validaciones realizadas
- `npm.cmd run check`: lint, 14 tests y build SSR aprobados.
- Parseo de `vercel.json` y verificación explícita de `https://api.web3forms.com` en `connect-src`.
- Inspección de los headers publicados, que confirmó la ausencia previa del endpoint en la CSP.

### Pendientes / Follow-ups
- Desplegar y realizar un envío real en producción para confirmar la recepción del correo.
