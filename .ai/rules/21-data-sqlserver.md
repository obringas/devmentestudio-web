# 21 — Datos: SQL Server, esquema, migraciones y SP

> Se carga cuando la tarea crea o modifica tablas, escribe SQL, migraciones EF Core, stored procedures, vistas, funciones, índices o cualquier cambio de datos.
> SQL Server es el motor por defecto. Si el proyecto usa otro motor, las secciones 1-3 y 5-8 aplican igual; adaptá la sintaxis de 4 y 9.

---

## 1. Principios

0. **Antes de tocar una tabla, leé su sección en `docs/db-schema.md#<esquema><tabla>`** (columnas con tipo, PK/FK, defaults, índices, triggers, si está replicada y si tiene auditoría). Lo genera `node .ai/tools/db-schema.js` desde los catálogos del servidor; es la verdad del esquema, no las entidades de EF ni los scripts viejos. **Después de cada cambio de esquema, regeneralo** y corré `regen-index`. Si no existe o tiene más de un cambio de esquema de antigüedad, generalo primero.

1. **El esquema es un contrato.** Cambiarlo afecta código, reportes, replicación e integraciones. Siempre analizá impacto antes.
2. **Nada en producción sin autorización explícita.** Ni DDL, ni DML, ni "solo un SELECT pesado".
3. **Todo cambio de datos es transaccional, verificado y reversible.**
4. **Toda tabla de negocio está normalizada, nombrada según convención y auditada.** Sin excepciones silenciosas; una desnormalización deliberada es un ADR.
5. **Los scripts son idempotentes y repetibles**: pueden correrse dos veces sin romper nada.

---

## 2. Diseño de tablas: normalización

Toda tabla nueva debe cumplir **Tercera Forma Normal (3FN)** como mínimo:

| Forma | Criterio observable | Violación típica |
|---|---|---|
| **1FN** | Cada columna atómica; sin listas separadas por coma; sin columnas repetidas (`Telefono1`, `Telefono2`, `Telefono3`) | `Emails = 'a@x.com;b@x.com'` |
| **2FN** | Todo atributo no clave depende de **toda** la clave primaria (relevante en claves compuestas) | En `DetallePedido(PedidoId, ProductoId, NombreProducto)`, `NombreProducto` depende solo de `ProductoId` |
| **3FN** | Ningún atributo no clave depende de otro atributo no clave | `Cliente(…, LocalidadId, NombreLocalidad, Provincia)` |

Reglas derivadas:

- Catálogos y estados en **tablas propias** con FK, no en strings libres ni en magic numbers (`Estado = 3`).
- Relaciones N:N vía tabla intermedia con su propia PK o PK compuesta, más auditoría.
- Sin columnas calculables desde otras columnas o tablas (`Total`, `Edad`, `CantidadHijos`), salvo columnas computadas de SQL Server o desnormalización justificada en ADR con mecanismo de sincronización documentado.
- Sin `NULL` como valor de negocio ("NULL significa activo"). Si una columna admite NULL, el significado de NULL debe ser "no se conoce / no aplica" y estar documentado.
- Tipos de datos precisos: `DECIMAL(p,s)` para dinero (nunca `FLOAT`), `DATE`/`DATETIME2` (nunca `DATETIME` nuevo ni `VARCHAR` para fechas), `BIT` para booleanos, `NVARCHAR(n)` con longitud real (nunca `NVARCHAR(MAX)` por comodidad).
- Toda tabla tiene PK. Preferí `INT IDENTITY` o `BIGINT IDENTITY` como clave sustituta más una restricción `UNIQUE` sobre la clave natural si existe.
- Toda FK tiene índice. Toda columna de búsqueda frecuente evalúa índice (justificado, no "por las dudas").

**Desnormalizar** solo con medición de performance que lo justifique, registrado en `06-decisions.md`, con la estrategia de sincronización explícita.

---

## 3. Convención de nombres

> Si el proyecto ya tiene una convención documentada en `docs/04-conventions.md`, esa manda. Si no, aplicá esta y registrala allí.

| Objeto | Convención | Ejemplo |
|---|---|---|
| Esquema | `PascalCase` por área funcional; evitar todo en `dbo` en proyectos nuevos | `Ventas`, `Liquidacion`, `Seguridad` |
| Tabla | `PascalCase`, **singular**, sin prefijo `tbl` | `Cliente`, `OrdenCompra`, `DetalleOrdenCompra` |
| Tabla intermedia N:N | Nombres de ambas tablas concatenados | `UsuarioRol`, `ProductoCategoria` |
| Columna | `PascalCase`, sin prefijo de tabla, sin tipo en el nombre | `Nombre`, `FechaAlta`, `MontoTotal` |
| Clave primaria | `<Tabla>Id` | `ClienteId` |
| Clave foránea (columna) | Mismo nombre que la PK referenciada; si hay dos FK a la misma tabla, rol + nombre | `ClienteId`; `VendedorUsuarioId`, `SupervisorUsuarioId` |
| Booleanos | Prefijo `Es`/`Tiene`/`Permite` | `EsActivo`, `TieneDeuda` |
| Fechas | Prefijo `Fecha` (solo fecha) o `FechaHora` | `FechaVencimiento`, `FechaHoraEnvio` |
| Constraint PK | `PK_<Tabla>` | `PK_Cliente` |
| Constraint FK | `FK_<TablaOrigen>_<TablaDestino>[_<Rol>]` | `FK_OrdenCompra_Cliente` |
| Unique | `UQ_<Tabla>_<Columnas>` | `UQ_Cliente_Cuit` |
| Check | `CK_<Tabla>_<Regla>` | `CK_OrdenCompra_MontoPositivo` |
| Default | `DF_<Tabla>_<Columna>` | `DF_Cliente_EsActivo` |
| Índice | `IX_<Tabla>_<Columnas>`; único: `UX_` | `IX_OrdenCompra_ClienteId_Fecha` |
| Vista | `vw_<Descripcion>` | `vw_SaldoPorCliente` |
| Stored procedure | `usp_<Entidad>_<Accion>` (nunca `sp_`, reservado por SQL Server) | `usp_Cliente_Obtener`, `usp_OrdenCompra_Anular` |
| Función escalar / tabla | `fn_<Descripcion>` / `tvf_<Descripcion>` | `fn_CalcularDigitoVerificador` |
| Trigger | `tr_<Tabla>_<Evento>` | `tr_Cliente_AuditoriaUpdate` |
| Tabla de auditoría | `<Tabla>Auditoria` o esquema `Auditoria.<Tabla>` | `Auditoria.Cliente` |

Sin espacios, sin acentos, sin palabras reservadas, sin abreviaturas no documentadas. Idioma consistente con el resto del esquema.

---

## 4. Auditoría obligatoria

Toda tabla de negocio (no catálogos estáticos de sistema) incluye **columnas de auditoría**:

```sql
FechaCreacion      DATETIME2(0)   NOT NULL CONSTRAINT DF_<Tabla>_FechaCreacion DEFAULT SYSDATETIME(),
UsuarioCreacion    NVARCHAR(100)  NOT NULL,
FechaModificacion  DATETIME2(0)   NULL,
UsuarioModificacion NVARCHAR(100) NULL,
EsEliminado        BIT            NOT NULL CONSTRAINT DF_<Tabla>_EsEliminado DEFAULT 0,  -- baja lógica si el dominio lo requiere
FechaEliminacion   DATETIME2(0)   NULL,
UsuarioEliminacion NVARCHAR(100)  NULL
```

Reglas:

- `UsuarioCreacion`/`UsuarioModificacion` guardan el usuario **de la aplicación**, no el login de SQL (salvo procesos batch, donde se guarda el nombre del proceso).
- La aplicación completa estos campos en un **único lugar** (interceptor de `SaveChanges`, clase base, SP), nunca a mano en cada operación.
- Tablas críticas (dinero, liquidaciones, stock, seguridad, datos personales) además llevan **historial de cambios**: tabla `<Tabla>Auditoria` (o `Auditoria.<Tabla>`) con imagen anterior/posterior, operación (`I/U/D`), fecha, usuario y origen; o **System-Versioned Temporal Tables** si la versión de SQL Server y el proyecto lo permiten. Elegí uno, documentalo en `02-architecture.md`.
- Baja lógica (`EsEliminado`) por defecto para entidades de negocio; `DELETE` físico solo con decisión documentada. Toda consulta de negocio filtra `EsEliminado = 0` (idealmente vía filtro global de EF o vista).
- Nunca se modifica ni borra una fila de auditoría. Los permisos del usuario de aplicación sobre tablas de auditoría son solo `INSERT`.

---

## 5. Transacciones y cambios de datos

**Todo** `INSERT`/`UPDATE`/`DELETE`/`MERGE` fuera de EF Core, y toda operación EF que combine varias escrituras o SQL directo, sigue esta plantilla:

Plantilla completa: `.ai/templates/sql/transaccion.sql`. Esqueleto: `SET XACT_ABORT ON` → `BEGIN TRY` → `BEGIN TRAN` → sentencia → `IF @@ROWCOUNT <> esperado THROW` → `COMMIT` → `CATCH: ROLLBACK; THROW`.


Reglas:

- `@@ROWCOUNT` se verifica **inmediatamente** después de cada sentencia (cualquier sentencia posterior lo resetea) contra el valor esperado (`= 1`, `= @Cantidad`, `> 0` según el caso).
- `SET XACT_ABORT ON` para que cualquier error aborte la transacción completa.
- Transacciones **cortas**: sin lógica de aplicación, sin llamadas externas, sin esperas dentro.
- Nivel de aislamiento explícito solo si el default (`READ COMMITTED`) no alcanza, y documentado.
- Operaciones masivas: por lotes (`TOP (n)` en bucle o rangos de clave), transacción por lote, con registro de progreso para poder reanudar.
- Antes de un `UPDATE`/`DELETE` masivo: `SELECT COUNT(*)` con el mismo `WHERE`, backup o tabla espejo, y plan de reversión escrito.

---

## 6. Consultas: estilo y correctitud

- `NOT EXISTS` sobre `NOT IN` (semántica con `NULL` y performance). `EXISTS` sobre `IN` con subconsulta cuando solo importa existencia.
- Fechas en formato **ISO 8601** siempre: `'2026-10-07'` o `'2026-10-07T14:30:00'`. Nunca `'07/10/2026'`. Sin depender de `SET DATEFORMAT` ni del idioma del login.
- Rangos de fecha semiabiertos: `Fecha >= @Desde AND Fecha < DATEADD(DAY, 1, @Hasta)`; nunca `BETWEEN` con fin de día ni funciones sobre la columna (`CONVERT(DATE, Fecha) = …` anula índices).
- Sin `SELECT *` en código. Listar columnas.
- Alias de tabla cortos y significativos; prefijo de columnas siempre que haya más de una tabla.
- `JOIN` explícito (ANSI); nunca coma en el `FROM`.
- Sin funciones sobre columnas indexadas en `WHERE`/`JOIN` (SARGable).
- Sin cursores salvo necesidad documentada; preferir conjuntos. Sin `WHILE` fila por fila para lo que un `UPDATE … FROM` o `MERGE` resuelve.
- `MERGE` solo con `HOLDLOCK` y revisado: tiene casos borde conocidos.
- Sin `NOLOCK` para "ganar performance". Si hay bloqueos, se analiza la causa.
- Parámetros tipados con la longitud real de la columna (evita conversiones implícitas y planes malos).
- Siempre pensar en volumen real: ¿qué pasa con 10 millones de filas?

---

## 7. Stored procedures, vistas y funciones

- Un SP hace **una** cosa, nombrada en su nombre (`usp_Cliente_Obtener`, no `usp_Cliente_Todo`).
- Encabezado obligatorio: propósito, parámetros, autor, fecha, ticket/ADR, historial de cambios breve.
- `SET NOCOUNT ON` al inicio. Parámetros validados con mensajes claros (`THROW 5xxxx`). Sin SQL dinámico salvo necesidad justificada, y entonces con `sp_executesql` parametrizado.
- Sin lógica de presentación (formateo de fechas o montos) en SP: eso es de la capa de aplicación.
- Funciones escalares en `WHERE`/`SELECT` sobre muchas filas: evitarlas (se ejecutan fila por fila). Preferir funciones con valores de tabla inline.
- Vistas sin `ORDER BY`, sin anidar vistas sobre vistas más de un nivel.
- Triggers solo para auditoría o invariantes que no pueden garantizarse desde la aplicación; nunca para lógica de negocio. Deben manejar múltiples filas (`inserted`/`deleted` como conjuntos).

---

## 8. Scripts, migraciones y despliegue

- **Idempotencia obligatoria**: `IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE …)`, `IF COL_LENGTH(…) IS NULL`, `CREATE OR ALTER PROCEDURE`.
- Un script = un cambio lógico, con nombre `YYYYMMDD_HHmm_<descripcion>.sql` (o la convención de migraciones del proyecto).
- Cada script DDL va acompañado de su **script de reversión** o de la justificación de por qué no es reversible.
- Orden: tablas → constraints → índices → vistas/funciones → SP → datos semilla.
- Migraciones EF Core: revisar el SQL generado (`dotnet ef migrations script`) antes de aplicar. Renombrar columnas/tablas con `RenameColumn`, nunca drop + add (pierde datos).
- Cambios en tablas **publicadas en replicación**: verificar impacto en publicaciones y suscriptores antes; algunos DDL requieren re-snapshot. Documentar en `02-architecture.md` qué tablas están replicadas.
- Datos semilla y catálogos: scripts `MERGE`/`IF NOT EXISTS` versionados, nunca inserts manuales en producción.
- Antes de ejecutar en cualquier ambiente compartido: ambiente, base, usuario y backup confirmados por escrito.

---

## 9. Plantilla de creación de tabla

En `.ai/templates/sql/tabla.sql`: esquema idempotente, PK/UQ/FK/CK/DF con nombres según §3, bloque de auditoría de §4, índice filtrado por `EsEliminado = 0`. Copiala y adaptala; no la reescribas de memoria.

---

## 10. Checklist antes de entregar cambios de datos

- [ ] Tabla en 3FN; catálogos/estados en tablas propias; sin columnas calculables.
- [ ] Nombres según convención (tabla singular, PK `<Tabla>Id`, constraints e índices con prefijo).
- [ ] Columnas de auditoría presentes; historial/temporal en tablas críticas; baja lógica si corresponde.
- [ ] Tipos precisos: `DECIMAL` para dinero, `DATE`/`DATETIME2` para fechas, `NVARCHAR(n)` acotado.
- [ ] Toda FK con índice; índices adicionales justificados.
- [ ] Todo DML en `TRY/CATCH` + transacción + `XACT_ABORT` + verificación de `@@ROWCOUNT` + rollback.
- [ ] `NOT EXISTS` en vez de `NOT IN`; fechas ISO; sin `SELECT *`; consultas SARGables.
- [ ] Scripts idempotentes, con reversión, en orden correcto.
- [ ] Impacto en replicación, reportes y consumidores analizado.
- [ ] Nada ejecutado en producción sin autorización explícita y por escrito.
