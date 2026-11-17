# 20 — Backend .NET / ASP.NET Core

> Se carga cuando la tarea toca API, lógica de negocio, servicios, persistencia o configuración del backend.
> Lo relativo a SQL Server, esquema, migraciones y SP está en `21-data-sqlserver.md`. Seguridad transversal en `60-security.md`.

---

## 1. Primer contacto: qué inspeccionar

Si existen:

- `*.sln`, `*.slnx`, `*.csproj`, `global.json`, `Directory.Build.props/targets`, `Directory.Packages.props`, `NuGet.config`.
- `Program.cs`/`Startup.cs`: composición de DI, middleware, autenticación, CORS, Swagger/OpenAPI.
- `appsettings*.json` (solo **nombres** de claves; nunca copiar valores).
- Organización en proyectos/capas: API · Application · Domain · Infrastructure (o la que exista).
- `DbContext`, configuraciones de entidades, migraciones, scripts SQL, SP.
- Contratos: DTOs, requests/responses, versionado de API.
- Tests: framework (xUnit/NUnit/MSTest), mocks, fixtures, integración.
- Dockerfile, pipelines (`azure-pipelines.yml`), scripts de deploy.

Registrá lo detectado en `docs/02-architecture.md` y `docs/00-repo-map.md`. Marcá inferencias como `[INFERIDO: validar]`.

---

## 2. Arquitectura y capas

- Respetá la arquitectura **detectada**. No introduzcas Clean Architecture, CQRS, MediatR, repositorios genéricos ni Vertical Slices si el proyecto no los usa; si creés que conviene, proponelo como ADR.
- Estructura típica que debe mantenerse clara (adaptar a la real del repo):

```text
src/
├── <Proyecto>.Api/            controllers / endpoints, filtros, middleware, mapeo DTO ↔ dominio
├── <Proyecto>.Application/    casos de uso, servicios de aplicación, validaciones, interfaces de puertos
├── <Proyecto>.Domain/         entidades, value objects, reglas de negocio, eventos, excepciones de dominio
├── <Proyecto>.Infrastructure/ EF Core, repositorios concretos, clientes externos, email, archivos
└── <Proyecto>.Shared/         contratos y utilidades verdaderamente transversales
tests/
├── <Proyecto>.UnitTests/
└── <Proyecto>.IntegrationTests/
```

- **Controllers / Minimal APIs / handlers** solo transportan: reciben, validan forma, delegan, mapean la respuesta. Sin reglas de negocio, sin acceso a datos directo.
- **Reglas de negocio** en dominio o aplicación, según el diseño existente. Nunca en el controller ni en el `DbContext`.
- **DTOs/contratos explícitos** en los límites. No exponer entidades de persistencia por la API salvo decisión documentada.
- Compatibilidad hacia atrás por defecto. Cambio incompatible → versionar o documentar y coordinar con los consumidores.
- Respuestas y códigos HTTP consistentes. Errores con `ProblemDetails` o el mecanismo ya adoptado. Nunca stack traces ni detalles internos al consumidor.

---

## 3. Inyección de dependencias y configuración

- Respetá lifetimes: nunca capturar un servicio `Scoped` desde un `Singleton`. `DbContext` es `Scoped`.
- Interfaces, factories y wrappers solo con necesidad real de sustitución, desacople o testabilidad. No una interfaz por clase "por si acaso".
- Configuración tipada con `IOptions<T>`/`IOptionsSnapshot<T>`; no leer `IConfiguration` desde la lógica de negocio.
- Validá configuración al arrancar (`ValidateDataAnnotations`, `ValidateOnStart`) cuando el proyecto lo soporte.
- Secretos fuera del repo: user-secrets, variables de entorno, Key Vault. En `appsettings` solo placeholders.

---

## 4. Asincronía

- Asincronía de extremo a extremo para I/O. Sin `.Result`, `.Wait()`, `.GetAwaiter().GetResult()`.
- Sin `Task.Run` para "simular" asincronía de I/O. Sin `async void` salvo event handlers.
- Propagá `CancellationToken` desde el límite HTTP hasta la base de datos.
- Sufijo `Async` según la convención del repo (sé consistente con lo existente).

---

## 5. Validación y errores

- Validación de **forma** en el límite (DataAnnotations, FluentValidation o lo que use el repo). Validación de **negocio** en dominio/aplicación.
- Excepciones de dominio específicas (`SaldoInsuficienteException`), mapeadas a HTTP en un solo lugar (middleware/filtro).
- Separar: 400 validación · 401/403 auth · 404 no existe · 409 conflicto/negocio · 500 inesperado. No devolver 200 con `{ error: … }`.
- Resultado esperado vs. excepción: si el repo usa `Result<T>`, seguilo; si usa excepciones, seguilo. No mezclar.

---

## 6. EF Core y acceso a datos

- `DbContext` ya implementa Unit of Work y Repository; no agregues un repositorio genérico sin justificación en ADR.
- `IQueryable` no sale de infraestructura/persistencia. Los servicios reciben listas, DTOs o resultados materializados.
- Proyectá solo las columnas necesarias (`Select`). Evitá `Include` indiscriminado y N+1.
- `AsNoTracking()` para lecturas sin modificación.
- Paginación obligatoria en colecciones potencialmente grandes. Sin `ToList()` de tablas enteras.
- SQL crudo (`FromSqlInterpolated`, `ExecuteSqlInterpolated`, Dapper) **siempre parametrizado**. Nunca concatenar entradas.
- Transacciones explícitas para unidades atómicas que cruzan más de un `SaveChanges` o combinan EF con SQL directo. Ver `21-data-sqlserver.md §4`.
- Las entidades mapean tablas que cumplen `21-data-sqlserver.md` (normalización, nombres, auditoría). Si la tabla no cumple, registralo; no la "arregles" desde el mapeo.
- Migraciones: una por cambio lógico, con nombre descriptivo, revisadas antes de aplicar. Migración destructiva → plan de despliegue y reversión aprobado.

---

## 7. Logging y observabilidad

- Logging estructurado (`ILogger<T>`, plantillas con placeholders, no interpolación de strings).
- Niveles correctos: `Error` solo para fallos reales; `Warning` para degradación; `Information` para hitos de negocio; `Debug`/`Trace` para detalle.
- Correlation ID si el proyecto lo soporta. Nunca loguear tokens, passwords, cadenas de conexión, datos personales ni payloads sensibles.
- Una excepción se loguea **una vez**, donde hay contexto.

---

## 8. Performance

- No optimices por intuición. Medí antes de agregar caché, paralelismo o complejidad.
- Evitá allocations innecesarias en rutas calientes, reflexión en runtime, serializaciones múltiples.
- Timeouts explícitos en clientes HTTP y base de datos. `HttpClient` vía `IHttpClientFactory`.
- Operaciones masivas: por lotes, con transacción por lote, idempotentes y reanudables.

---

## 9. Convenciones C#

- Respetá `.editorconfig`, nullable reference types y analizadores habilitados. Sin `#pragma warning disable` sin justificación.
- `record` para contratos y value objects inmutables; `class` para entidades con identidad.
- `PascalCase` tipos/métodos/propiedades; `camelCase` locales/parámetros; `_camelCase` campos privados (o la convención del repo).
- Un tipo público por archivo; nombre del archivo = nombre del tipo.
- Sin regiones para ocultar tamaño. Si necesitás `#region`, la clase es demasiado grande.

---

## 10. Checklist específico .NET

- [ ] El controller/endpoint no contiene lógica de negocio ni acceso a datos.
- [ ] DTOs en los límites; entidades no expuestas.
- [ ] Sin `.Result`/`.Wait()`; `CancellationToken` propagado.
- [ ] Lifetimes de DI correctos.
- [ ] Consultas proyectadas, sin N+1, con paginación donde aplica.
- [ ] SQL parametrizado; cambios de datos en transacción (ver `21`).
- [ ] Errores mapeados a HTTP en un solo lugar; sin stack traces al cliente.
- [ ] Logging estructurado sin datos sensibles.
- [ ] Build + tests del proyecto afectado ejecutados (o explicado por qué no).

---

## 11. Skill `dotnet-api`: la herramienta para producir lo anterior

Este archivo define **qué** se exige; la skill **`dotnet-api`** (instalada a nivel usuario, master en `ai-protocol-template\skills\dotnet-api\`) es el **cómo**: genera por script una API nueva (`new-api.js`), un recurso completo (`new-feature.js`: entidad, configuración EF, repositorio, servicio, validators, controller, tests, SQL con auditoría) y audita una existente (`audit.js`: capas, código limpio detectable, SQL, secretos, `format`/`build -warnaserror`/tests). Lo repetitivo lo hace el script, idéntico cada vez; el agente escribe solo el dominio.

- Cargarla en toda tarea que cree una API o agregue/modifique un recurso .NET; seguir su `SKILL.md` y la referencia que la tarea necesite (una sola).
- Lo que genere debe cumplir igual este archivo, `10` y `21`: la skill es un acelerador, no una excepción. Si su salida viola algo, se corrige en la plantilla de la skill, no a mano en el repo.
- Proyectos preexistentes con otra estructura: no se "migran" a la skill; se usa solo `audit.js` como revisión y las reglas de este archivo. Excepciones del proyecto van en `docs/05-ai-rules.md`.
- Registrar en `docs/03-setup.md` la versión de la skill y sus tres comandos; en `02-architecture.md`, las capas (`references/architecture.md`).
