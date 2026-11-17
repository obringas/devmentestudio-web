# [2026-04-24] - Agente: Codex

### Cambios
- Se redisenaron el home, header y footer con una direccion visual mas sobria, editorial y profesional.
- Se reemplazo la estetica generica del hero y de las cards por una composicion con mejor jerarquia, ritmo visual y llamados a la accion.
- Se reemplazo el poster estatico del hero por un motion reel animado generado en frontend para que la pieza visual se vea viva desde la carga inicial.

### Motivo
Mejorar la calidad percibida del front para que el sitio transmita una imagen mas profesional y menos cercana a una plantilla generica.

### Archivos afectados
- `src/styles.scss`
- `src/app/app.ts`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/shared/components/layout/footer/footer.component.ts`
- `src/app/shared/components/layout/footer/footer.component.html`
- `src/app/features/home/components/hero/hero.component.ts`
- `src/app/features/home/components/services-preview/services-preview.component.ts`
- `src/app/features/home/components/tech-stack/tech-stack.component.ts`
- `src/app/features/home/components/cta-section/cta-section.component.ts`
- `src/assets/studio-reel-poster.svg`
- `docs/07-changelog.md`

### Decisiones tomadas
Se mantuvo el stack y la arquitectura actuales, concentrando el rediseño en estilos y composicion de la home para evitar cambios estructurales fuera de alcance.

### Validaciones realizadas
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run test:ci`

### Pendientes / Follow-ups
- Si se quiere un reel todavia mas cinematografico, incorporar despues un video MP4 propio del estudio.
- El hero quedo con advertencia de presupuesto de estilos del componente por el CSS extra del motion reel, aunque el build pasa correctamente.
