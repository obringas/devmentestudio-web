-- db-schema.sql — emite docs/db-schema.md (Markdown compacto) desde los catálogos del sistema. Solo lectura; sin datos.
-- Ejecutar con: node .ai/tools/db-schema.js  (usa sqlcmd -h -1 -W -y 0 -v SCHEMAS="…")
-- Requiere SQL Server 2017+ (STRING_AGG). Variable SCHEMAS: lista separada por comas; vacía = todos los esquemas de usuario.
SET NOCOUNT ON;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

DECLARE @schemas nvarchar(max) = N'$(SCHEMAS)';
DECLARE @out TABLE (o1 int, o2 nvarchar(400), o3 int, line nvarchar(max));

IF OBJECT_ID('tempdb..#t') IS NOT NULL DROP TABLE #t;
SELECT s.name AS sch, t.name AS tbl, t.object_id, s.name + N'.' + t.name AS full_name,
       t.temporal_type, t.is_replicated, t.is_published, t.is_merge_published
INTO #t
FROM sys.tables t JOIN sys.schemas s ON s.schema_id = t.schema_id
WHERE t.is_ms_shipped = 0 AND t.temporal_type <> 1  -- excluye tablas de historial temporal (se listan junto a su tabla)
  AND (@schemas = N'' OR s.name IN (SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@schemas, N',')));

-- Encabezado
INSERT @out VALUES
 (0, N'', 0, N'# Esquema de base de datos — ' + DB_NAME()),
 (0, N'', 1, N''),
 (0, N'', 2, N'> Generado por `node .ai/tools/db-schema.js` desde sys.* · **No editar a mano**; regenerar tras cada cambio de esquema. Leer por ancla (`#esquema-tabla`), nunca entero.'),
 (0, N'', 3, N'> Columna: `nombre tipo NULL|NOT NULL [PK] [IDENTITY] [COMPUTED] [FK→Esquema.Tabla(col)] [DF valor]`. Índice: `IX nombre [UNIQUE] (cols) [INCLUDE (…)] [WHERE …]`.'),
 (0, N'', 4, N'> ' + @@SERVERNAME + N' · ' + DB_NAME() + N' · ' + CONVERT(nvarchar(19), SYSDATETIME(), 120) + N' · esquemas: ' + CASE WHEN @schemas = N'' THEN N'todos' ELSE @schemas END),
 (0, N'', 5, N'');

-- Tablas: encabezado + resumen
INSERT @out
SELECT 1, t.full_name, 0, N'' FROM #t t
UNION ALL
SELECT 1, t.full_name, 1, N'## ' + t.full_name FROM #t t
UNION ALL
SELECT 1, t.full_name, 2,
       CAST(cnt.c AS nvarchar(10)) + N' columnas · PK ' + ISNULL(pk.cols, N'—')
     + N' · FK ' + CAST(fkc.c AS nvarchar(10)) + N' · índices ' + CAST(ixc.c AS nvarchar(10))
     + CASE WHEN t.temporal_type = 2 THEN N' · temporal' ELSE N'' END
     + CASE WHEN t.is_replicated = 1 OR t.is_published = 1 OR t.is_merge_published = 1 THEN N' · REPLICADA' ELSE N'' END
     + CASE WHEN aud.c >= 2 THEN N' · auditoría' ELSE N' · SIN auditoría' END
     + CASE WHEN trg.c > 0 THEN N' · triggers ' + CAST(trg.c AS nvarchar(10)) ELSE N'' END
FROM #t t
CROSS APPLY (SELECT COUNT(*) c FROM sys.columns WHERE object_id = t.object_id) cnt
OUTER APPLY (SELECT STRING_AGG(c.name, N',') WITHIN GROUP (ORDER BY ic.key_ordinal) cols
             FROM sys.indexes i JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
             JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
             WHERE i.object_id = t.object_id AND i.is_primary_key = 1) pk
CROSS APPLY (SELECT COUNT(*) c FROM sys.foreign_keys WHERE parent_object_id = t.object_id) fkc
CROSS APPLY (SELECT COUNT(*) c FROM sys.indexes WHERE object_id = t.object_id AND index_id > 0 AND is_primary_key = 0) ixc
CROSS APPLY (SELECT COUNT(*) c FROM sys.columns WHERE object_id = t.object_id
             AND name IN (N'FechaCreacion', N'UsuarioCreacion', N'FechaModificacion', N'UsuarioModificacion',
                          N'fecha_creacion', N'usuario_creacion', N'fecha_modificacion', N'usuario_modificacion',
                          N'CreatedAt', N'CreatedBy', N'UpdatedAt', N'UpdatedBy', N'created_at', N'created_by')) aud
CROSS APPLY (SELECT COUNT(*) c FROM sys.triggers WHERE parent_id = t.object_id) trg;

-- Columnas
INSERT @out
SELECT 1, t.full_name, 10 + c.column_id,
       N'- ' + c.name + N' ' + ty.name
     + CASE WHEN ty.name IN (N'varchar', N'nvarchar', N'char', N'nchar', N'varbinary', N'binary')
              THEN N'(' + CASE WHEN c.max_length = -1 THEN N'MAX'
                               ELSE CAST(CASE WHEN ty.name IN (N'nvarchar', N'nchar') THEN c.max_length / 2 ELSE c.max_length END AS nvarchar(10)) END + N')'
            WHEN ty.name IN (N'decimal', N'numeric') THEN N'(' + CAST(c.precision AS nvarchar(10)) + N',' + CAST(c.scale AS nvarchar(10)) + N')'
            WHEN ty.name IN (N'datetime2', N'time', N'datetimeoffset') THEN N'(' + CAST(c.scale AS nvarchar(10)) + N')'
            ELSE N'' END
     + CASE WHEN c.is_nullable = 1 THEN N' NULL' ELSE N' NOT NULL' END
     + CASE WHEN pkc.column_id IS NOT NULL THEN N' PK' ELSE N'' END
     + CASE WHEN c.is_identity = 1 THEN N' IDENTITY' ELSE N'' END
     + CASE WHEN c.is_computed = 1 THEN N' COMPUTED' ELSE N'' END
     + ISNULL(N' FK→' + fk.ref, N'')
     + ISNULL(N' DF ' + dc.definition, N'')
FROM #t t
JOIN sys.columns c ON c.object_id = t.object_id
JOIN sys.types ty ON ty.user_type_id = c.user_type_id
LEFT JOIN (SELECT ic.object_id, ic.column_id FROM sys.indexes i JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id WHERE i.is_primary_key = 1) pkc
       ON pkc.object_id = c.object_id AND pkc.column_id = c.column_id
OUTER APPLY (SELECT TOP 1 SCHEMA_NAME(rt.schema_id) + N'.' + rt.name + N'(' + rc.name + N')' AS ref
             FROM sys.foreign_key_columns f JOIN sys.tables rt ON rt.object_id = f.referenced_object_id
             JOIN sys.columns rc ON rc.object_id = f.referenced_object_id AND rc.column_id = f.referenced_column_id
             WHERE f.parent_object_id = c.object_id AND f.parent_column_id = c.column_id) fk
LEFT JOIN sys.default_constraints dc ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id;

-- Índices (no PK)
INSERT @out
SELECT 1, t.full_name, 1000 + i.index_id,
       N'- IX ' + i.name + CASE WHEN i.is_unique = 1 THEN N' UNIQUE' ELSE N'' END
     + N' (' + ISNULL(cols.c, N'') + N')'
     + ISNULL(N' INCLUDE (' + inc.c + N')', N'')
     + ISNULL(N' WHERE ' + i.filter_definition, N'')
FROM #t t
JOIN sys.indexes i ON i.object_id = t.object_id AND i.index_id > 0 AND i.is_primary_key = 0 AND i.type > 0
OUTER APPLY (SELECT STRING_AGG(c.name, N',') WITHIN GROUP (ORDER BY ic.key_ordinal) c
             FROM sys.index_columns ic JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
             WHERE ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.is_included_column = 0) cols
OUTER APPLY (SELECT STRING_AGG(c.name, N',') c
             FROM sys.index_columns ic JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
             WHERE ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.is_included_column = 1) inc;

-- Triggers
INSERT @out
SELECT 1, t.full_name, 2000 + ROW_NUMBER() OVER (PARTITION BY t.object_id ORDER BY tr.name),
       N'- TR ' + tr.name + N' (' + ISNULL(ev.e, N'') + N')' + CASE WHEN tr.is_disabled = 1 THEN N' DISABLED' ELSE N'' END
FROM #t t
JOIN sys.triggers tr ON tr.parent_id = t.object_id
OUTER APPLY (SELECT STRING_AGG(te.type_desc, N',') e FROM sys.trigger_events te WHERE te.object_id = tr.object_id) ev;

-- Vistas
INSERT @out VALUES (2, N'', 0, N''), (2, N'', 1, N'## Vistas');
INSERT @out
SELECT 2, SCHEMA_NAME(v.schema_id) + N'.' + v.name, 10, N'- ' + SCHEMA_NAME(v.schema_id) + N'.' + v.name
FROM sys.views v WHERE v.is_ms_shipped = 0
  AND (@schemas = N'' OR SCHEMA_NAME(v.schema_id) IN (SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@schemas, N',')));

-- Procedimientos (con parámetros)
INSERT @out VALUES (3, N'', 0, N''), (3, N'', 1, N'## Procedimientos almacenados');
INSERT @out
SELECT 3, SCHEMA_NAME(p.schema_id) + N'.' + p.name, 10,
       N'- ' + SCHEMA_NAME(p.schema_id) + N'.' + p.name + N' (' + ISNULL(prm.p, N'') + N')'
FROM sys.procedures p
OUTER APPLY (SELECT STRING_AGG(pa.name + N' ' + ty.name, N', ') WITHIN GROUP (ORDER BY pa.parameter_id) p
             FROM sys.parameters pa JOIN sys.types ty ON ty.user_type_id = pa.user_type_id WHERE pa.object_id = p.object_id) prm
WHERE p.is_ms_shipped = 0
  AND (@schemas = N'' OR SCHEMA_NAME(p.schema_id) IN (SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@schemas, N',')));

-- Funciones
INSERT @out VALUES (4, N'', 0, N''), (4, N'', 1, N'## Funciones');
INSERT @out
SELECT 4, SCHEMA_NAME(o.schema_id) + N'.' + o.name, 10,
       N'- ' + SCHEMA_NAME(o.schema_id) + N'.' + o.name + N' [' + o.type_desc + N']'
FROM sys.objects o WHERE o.type IN ('FN', 'IF', 'TF') AND o.is_ms_shipped = 0
  AND (@schemas = N'' OR SCHEMA_NAME(o.schema_id) IN (SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@schemas, N',')));

SELECT line FROM @out ORDER BY o1, o2, o3;
