# [2026-04-24] - Agente: Codex

### Cambios
- Se movio la copy localizada de `home` y `layout` a una capa centralizada en `src/app/data`.
- Se actualizaron header, footer, hero, services preview, tech stack y CTA para consumir getters de contenido en lugar de textos embebidos en los componentes.

### Motivo
Corregir una mala practica de base: la copy localizada no debe vivir dentro de los componentes UI porque complica mantenimiento, escalabilidad y consistencia de la internacionalizacion.

### Archivos afectados
- `src/app/data/home-content.data.ts`
- `src/app/data/layout-content.data.ts`
- `src/app/data/index.ts`
- `src/app/features/home/components/hero/hero.component.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/features/home/components/tech-stack/tech-stack.component.ts`
- `src/app/features/home/components/cta-section/cta-section.component.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/footer/footer.component.ts`
- `src/app/shared/components/layout/footer/footer.component.html`
- `docs/07-changelog.md`

### Decisiones tomadas
Se mantuvo la signal de idioma existente y se extrajo la copy a archivos de datos tipados para separar contenido de presentacion sin sumar dependencias nuevas.

### Validaciones realizadas
- `npm.cmd run lint`
- `npm.cmd run build`

### Pendientes / Follow-ups
- Extender el mismo criterio de extraccion de copy al resto de pantallas traducidas si queres dejar toda la app con la misma regla.
