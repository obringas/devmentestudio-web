# [2026-05-06] - Agente: Gemini

### Cambios
- Se modificó la configuración de internacionalización para establecer el inglés (`en`) como idioma predeterminado de la aplicación.
- Se ajustaron los bordes y sombras de las tarjetas y paneles (`styles.scss`) para darles mayor relieve y definición.
- Se cambió el favicon por defecto de Angular por el logo de DevMenteStudio (`logo.png`) en `index.html`.

### Motivo
El usuario solicitó que el idioma por defecto sea el inglés y mejorar el contorno de las tarjetas para destacarlas más sobre el nuevo fondo claro.

### Archivos afectados
- `src/app/core/services/locale.service.ts`
- `src/styles.scss`
- `docs/07-changelog.md`

### Decisiones tomadas
Se invirtió la lógica de fallback en el `LocaleService`. Ahora devuelve `'en'` en SSR y como fallback del navegador, a menos que se detecte explícitamente `'es'`. Además, se incrementó la opacidad y tamaño de las sombras y bordes en el CSS global.

### Validaciones realizadas
- Se verificó que el servicio compile correctamente y la página cargue con la configuración.

### Pendientes / Follow-ups
- Ninguno por el momento.
