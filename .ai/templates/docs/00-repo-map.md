# Mapa del repositorio

> Qué hay en cada carpeta y qué **no** va ahí. Generado a partir del árbol real (sin artefactos). Actualizar al crear carpetas, módulos o proyectos.

## Árbol comentado

```text
/
├── AGENTS.md · CLAUDE.md · GEMINI.md   protocolo para agentes IA
├── .ai/                                reglas y plantillas del protocolo (no modificar desde el proyecto; excepciones en docs/05-ai-rules.md)
├── docs/                               esta documentación
├── src/                                [PENDIENTE: completar con el árbol real, 2-3 niveles]
│   ├── <Proyecto>.Api/                 [PENDIENTE: responsabilidad en una línea]
│   ├── <Proyecto>.Application/
│   ├── <Proyecto>.Domain/
│   └── <Proyecto>.Infrastructure/
├── tests/
├── db/ o scripts/                      [PENDIENTE: scripts SQL, migraciones, semillas]
└── pipelines/ o .azure/                [PENDIENTE]
```

## Dónde va cada cosa

| Quiero agregar… | Va en | No va en |
|---|---|---|
| Un endpoint | `[PENDIENTE]` | Lógica de negocio en el controller |
| Una regla de negocio | `[PENDIENTE]` | Controller, componente, SP |
| Un acceso a datos | `[PENDIENTE]` | Capa de aplicación o UI |
| Una tabla / migración | `[PENDIENTE]` | — |
| Un componente reutilizable | `[PENDIENTE]` | `shared/` si lo usa una sola feature |
| Una utilidad transversal | `[PENDIENTE]` | `utils/` genérico sin dueño |
| Un test | `[PENDIENTE]` | — |

## Carpetas ignoradas

`bin/`, `obj/`, `node_modules/`, `dist/`, cobertura, cachés, artefactos generados. `[PENDIENTE: agregar las propias del proyecto]`
