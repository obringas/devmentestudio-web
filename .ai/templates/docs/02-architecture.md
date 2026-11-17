# Arquitectura

## Stack y versiones
| Componente | Versión | Fuente |
|---|---|---|
| `[PENDIENTE: .NET / Angular / Node / SQL Server / …]` | `[exacta]` | `[csproj / package.json / …]` |

## Organización y capas
`[PENDIENTE: proyectos o carpetas principales, responsabilidad de cada uno y dirección de dependencias. Patrón detectado (capas clásicas, Clean, vertical slices, features Angular…)]`

```text
[PENDIENTE: diagrama de dependencias entre capas en texto]
```

## Flujos principales
### `[PENDIENTE: nombre del flujo]`
`[PENDIENTE: entrada → capas que atraviesa → salida; qué tablas toca]`

## Base de datos
- **Motor y versión:** `[PENDIENTE]`
- **Acceso:** `[EF Core x.y / Dapper / SP / mixto]`
- **Esquemas y tablas clave:** `[PENDIENTE]` · detalle real por tabla en `db-schema.md` (generado; leer por ancla)
- **Auditoría:** `[columnas estándar + historial/temporal en: …]` (ver `.ai/rules/21-data-sqlserver.md §4`)
- **Migraciones:** `[EF migrations / scripts versionados en …]`
- **Replicación:** `[tablas publicadas, suscriptores, o "No aplica"]`
- **Convención de nombres:** `[estándar de 21-data-sqlserver / propia, documentada en 04-conventions]`

## Sistema visual (solo frontend)
- **Fuente de verdad:** `DESIGN.md` en la raíz (generado con Impeccable) · `[o: tokens en …]`
- **Librería UI / design system:** `[PENDIENTE]`
- **Tipografía:** `[PENDIENTE: pareja y escala]` · **Iconos:** `[set]` · **Densidad:** `[compacta/cómoda por tipo de pantalla]`
- **Modo oscuro:** `[sí/no]`

## Autenticación y autorización
`[PENDIENTE: mecanismo, proveedor, dónde se valida, cómo se modelan permisos]`

## Integraciones externas
| Sistema | Protocolo | Dirección | Dónde está el cliente |
|---|---|---|---|
| `[PENDIENTE]` | | | |

## Observabilidad
`[PENDIENTE: logging, correlation id, métricas, health checks]`

## Deuda arquitectónica conocida
Ver `08-known-issues.md`.
