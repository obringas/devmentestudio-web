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
