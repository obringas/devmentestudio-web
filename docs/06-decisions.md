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
Crear un `ContactService` tipado que encapsule el `POST` del navegador a Web3Forms y centralizar la configuración pública del proveedor en `site.config.ts`. El componente conserva exclusivamente la validación y los estados de UI, y considera exitoso sólo un HTTP 200 con `success: true`.

### Consecuencias
- Se elimina el falso positivo de éxito y se preservan los datos ante error.
- La integración puede probarse y reemplazarse sin reescribir la pantalla.
- La access key queda visible en el bundle porque Web3Forms la define como identificador público para integraciones cliente.
- El cierre requiere una prueba real después del deploy para confirmar la entrega al buzón configurado.
