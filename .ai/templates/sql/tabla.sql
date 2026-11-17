-- Plantilla de tabla (21-data-sqlserver §2-§4, §9). Reemplazar Ventas.OrdenCompra por esquema.Tabla reales.
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = N'Ventas')
    EXEC(N'CREATE SCHEMA Ventas');
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables t JOIN sys.schemas s ON s.schema_id = t.schema_id
               WHERE s.name = N'Ventas' AND t.name = N'OrdenCompra')
BEGIN
    CREATE TABLE Ventas.OrdenCompra
    (
        OrdenCompraId        INT IDENTITY(1,1) NOT NULL,
        Numero               NVARCHAR(20)      NOT NULL,
        ClienteId            INT               NOT NULL,
        EstadoOrdenCompraId  TINYINT           NOT NULL,
        FechaEmision         DATE              NOT NULL,
        MontoTotal           DECIMAL(18,2)     NOT NULL,
        Observaciones        NVARCHAR(500)     NULL,

        -- Auditoría
        FechaCreacion        DATETIME2(0)      NOT NULL CONSTRAINT DF_OrdenCompra_FechaCreacion DEFAULT SYSDATETIME(),
        UsuarioCreacion      NVARCHAR(100)     NOT NULL,
        FechaModificacion    DATETIME2(0)      NULL,
        UsuarioModificacion  NVARCHAR(100)     NULL,
        EsEliminado          BIT               NOT NULL CONSTRAINT DF_OrdenCompra_EsEliminado DEFAULT 0,
        FechaEliminacion     DATETIME2(0)      NULL,
        UsuarioEliminacion   NVARCHAR(100)     NULL,

        CONSTRAINT PK_OrdenCompra PRIMARY KEY CLUSTERED (OrdenCompraId),
        CONSTRAINT UQ_OrdenCompra_Numero UNIQUE (Numero),
        CONSTRAINT FK_OrdenCompra_Cliente FOREIGN KEY (ClienteId) REFERENCES Ventas.Cliente (ClienteId),
        CONSTRAINT FK_OrdenCompra_EstadoOrdenCompra FOREIGN KEY (EstadoOrdenCompraId) REFERENCES Ventas.EstadoOrdenCompra (EstadoOrdenCompraId),
        CONSTRAINT CK_OrdenCompra_MontoTotalNoNegativo CHECK (MontoTotal >= 0)
    );

    CREATE NONCLUSTERED INDEX IX_OrdenCompra_ClienteId_FechaEmision
        ON Ventas.OrdenCompra (ClienteId, FechaEmision) INCLUDE (MontoTotal)
        WHERE EsEliminado = 0;
END
GO
