# Checklist de Revision Legal (Pre-Produccion)

Este documento debe ser revisado y aprobado por una persona responsable legal antes de pasar a produccion.

## 1. Paginas legales publicadas

- [ ] `src/app/features/legal/terms.component.ts` revisado por asesor legal.
- [ ] `src/app/features/legal/privacy.component.ts` revisado por asesor legal.
- [ ] Fecha de actualizacion validada y coherente en ambos documentos.

## 2. Privacidad y datos personales

- [ ] Finalidad del tratamiento coincide con la operacion real del negocio.
- [ ] Base legal declarada correctamente para el pais/mercado objetivo.
- [ ] Politica de retencion de datos definida y aplicada operativamente.
- [ ] Canal para ejercer derechos de titular (acceso/rectificacion/eliminacion) vigente.
- [ ] Proveedores terceros (hosting, correo, analytics, IA) listados si corresponde.

## 3. Terminos de servicio

- [ ] Alcance de servicios y limitacion de responsabilidad revisados.
- [ ] Clausal de propiedad intelectual validada.
- [ ] Jurisdiccion y ley aplicable definidas (si aplica).
- [ ] Procedimiento de cambios de terminos documentado.

## 4. Seguridad y cumplimiento tecnico

- [ ] Variables sensibles solo en servidor (`GEMINI_API_KEY` no expuesta en frontend).
- [ ] Headers de seguridad en `vercel.json` validados por legal/seguridad.
- [ ] Politica de cookies/consentimiento definida si se incorporan trackers.

## 5. Evidencia de aprobacion

- [ ] Fecha de aprobacion legal registrada.
- [ ] Responsable legal registrado.
- [ ] Version/commit aprobado registrado.

---

Nota: este checklist no reemplaza asesoramiento legal profesional.
