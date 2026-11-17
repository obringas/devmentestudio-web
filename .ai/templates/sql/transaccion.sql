-- Plantilla de cambio de datos (21-data-sqlserver §5). Adaptar sentencia, condición y valor esperado de @@ROWCOUNT.
SET NOCOUNT ON;
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Ventas.OrdenCompra
       SET Estado = 'ANULADA',
           FechaModificacion = SYSDATETIME(),
           UsuarioModificacion = @Usuario
     WHERE OrdenCompraId = @OrdenCompraId
       AND Estado = 'PENDIENTE';

    IF @@ROWCOUNT <> 1
    BEGIN
        THROW 50001, 'La orden no existe o no está en estado PENDIENTE.', 1;
    END

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
