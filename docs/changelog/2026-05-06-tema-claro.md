# [2026-05-06] - Agente: Gemini

### Cambios
- Se migró toda la aplicación de un diseño oscuro a un tema claro.
- Se invirtió la paleta base (`--color-surface`) en `styles.scss` y se aclararon las utilidades de los componentes.
- Se actualizaron el `header` y `footer` para usar fondos claros (`bg-white/80`, `bg-surface-50`) en lugar de oscuros.
- Se modificaron los tokens de paleta de colores del componente `hero.component.ts`.
- Se reemplazaron masivamente las clases Tailwind de modo oscuro (ej. `bg-surface-900`, `text-surface-100`) por sus equivalentes claros en todas las vistas de la aplicación (contacto, servicios, legales, portfolio, blog, etc.).

### Motivo
Atender a la solicitud de mejorar la dirección visual hacia una estética más fresca, luminosa y limpia, eliminando el fondo oscuro predominante para "darle una vuelta de tuerca" al diseño.

### Archivos afectados
- `src/styles.scss`
- `src/index.html`
- `src/app/shared/components/layout/header/header.component.ts`
- `src/app/shared/components/layout/header/header.component.html`
- `src/app/shared/components/layout/footer/footer.component.html`
- `src/app/features/home/components/hero/hero.component.ts`
- Múltiples componentes dentro de `src/app/features/` (actualización masiva de estilos).
- `docs/07-changelog.md`

### Decisiones tomadas
Se propuso y aprobó un rediseño empleando fondos blancos o grises ultra-claros y textos oscuros. El *glassmorphism* se mantuvo ajustando sombras sutiles en lugar de iluminar el fondo oscuro. No se introdujeron nuevos colores de acento estructurales para conservar un perfil limpio y moderno.

### Validaciones realizadas
- Se generó el plan de implementación y la documentación (walkthrough).
- Reemplazo automatizado y manual en componentes para asegurar consistencia del tema claro a través de los archivos del sistema.

### Pendientes / Follow-ups
- Verificar visualmente levantando el servidor local si todas las sombras y efectos responden como se espera en dispositivos móviles.
