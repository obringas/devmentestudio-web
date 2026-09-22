# 06-decisions.md

## ADR-0001 - Mantener IA solo en backend con fallback local en frontend

### Fecha
2026-02-12

### Estado
Aceptada

### Contexto
El sitio necesitaba ofrecer chat con IA sin exponer claves sensibles en el navegador.

### Decision
Consumir Gemini exclusivamente desde `src/server.ts` mediante `POST /api/chat`, y dejar en `GeminiService` un fallback local para preservar la UX si el backend o el proveedor fallan.

### Consecuencias
- Mejora la seguridad al no filtrar `GEMINI_API_KEY` al frontend.
- El frontend mantiene una respuesta minima aun con fallas de infraestructura.
- La experiencia del chat queda limitada por respuestas locales cuando el backend no esta disponible.

## ADR-0002 - Documentacion base estandarizada en `/docs`

### Fecha
2026-04-24

### Estado
Aceptada

### Contexto
El repositorio tenia `AGENTS.md`, `README.md` y `AI_CONTEXT.md`, pero no contaba con la carpeta `/docs` exigida por el protocolo operativo del proyecto.

### Decision
Crear la estructura documental estandar en `/docs`, consolidando el contexto funcional y tecnico ya existente y usando `AI_CONTEXT.md` como insumo historico complementario.

### Consecuencias
- El proyecto queda alineado con el protocolo de agentes.
- El contexto operativo queda mas accesible y versionable.
- Futuras tareas deben mantener sincronizados `AI_CONTEXT.md` y `/docs` si ambos siguen conviviendo.

## ADR-0003 - Integrar el formulario de contacto mediante un servicio Web3Forms

### Fecha
2026-09-21

### Estado
Aceptada

### Contexto
El formulario validaba datos pero simulaba el envío con un temporizador y mostraba éxito sin realizar ninguna solicitud. Se necesitaba un envío real con recuperación visible ante fallas, sin acoplar el proveedor al componente.

### Decision
Crear un `ContactService` tipado que encapsule el `POST` multipart del navegador a Web3Forms mediante `FormData` y centralizar la configuración pública del proveedor en `site.config.ts`. El componente conserva exclusivamente la validación y los estados de UI, y considera exitoso sólo un HTTP 200 con `success: true`. La CSP de producción debe permitir `https://api.web3forms.com` en `connect-src`.

### Consecuencias
- Se elimina el falso positivo de éxito y se preservan los datos ante error.
- La integración puede probarse y reemplazarse sin reescribir la pantalla.
- La allowlist CSP queda acotada al endpoint HTTPS específico del proveedor.
- `FormData` evita el preflight CORS asociado al JSON y deja que el navegador establezca el boundary multipart.
- La access key queda visible en el bundle porque Web3Forms la define como identificador público para integraciones cliente.
- El cierre requiere una prueba real después del deploy para confirmar la entrega al buzón configurado.

## ADR-0004 - Reposicionar el sitio alrededor de continuidad operativa

### Fecha
2026-09-22

### Estado
Aceptada

### Contexto
El sitio presentaba a DevMenteStudio como una agencia tecnológica genérica y priorizaba tecnologías antes que el problema empresarial. Se necesitaba comunicar con claridad la especialidad real: modernizar sistemas de gestión sin detener la operación.

### Decision
Adoptar una narrativa business-first y bilingüe, con Home y `/modernizacion` como superficies principales. Centralizar el contenido en una fuente tipada, reutilizar componentes editoriales orientados a negocio y reservar los detalles técnicos para niveles secundarios. Mantener un único acento azure `#0078D4`, navy como base y verde sólo para continuidad o confirmación.

La solución permanece code-first: el diagrama de convivencia se implementa con HTML, CSS y SVG liviano, sin incorporar dependencias ni recursos pagos. SEO se refuerza con prerender, canonical, hreflang, sitemap y datos estructurados.

### Consecuencias
- La propuesta de valor se entiende sin conocimientos técnicos.
- Home, Modernización, Servicios, Portfolio, Nosotros y Contacto comparten una jerarquía y vocabulario consistentes.
- El contenido bilingüe queda versionado y testeable dentro del repositorio.
- La foto profesional de Oscar y una eventual ilustración final siguen siendo activos editoriales pendientes, no bloqueos técnicos.
- La carga remota de tipografías conserva la dirección visual, aunque limita el puntaje móvil de Performance en mediciones de laboratorio.
