USE Construccion
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND type in (N'U'))
DROP TABLE [dbo].[Usuarios]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Informacion]') AND type in (N'U'))
DROP TABLE [dbo].[Informacion]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE Usuarios(
IDUsuario INT IDENTITY NOT NULL,
Nombre_Usuario VARCHAR(30) NOT NULL,
Apellido_Usuario VARCHAR(40) NOT NULL,
Correo_Electronico VARCHAR(40) PRIMARY KEY NOT NULL CHECK(Correo_Electronico LIKE('%@gmail.com')),
Contraseña VARCHAR(500) NOT NULL,
Fecha_Creacion DATETIME NULL,
Fecha_Baja DATETIME NULL
);
GO

CREATE TABLE Informacion(
IdPalabra INT IDENTITY NOT NULL,
Titulo VARCHAR(30) NOT NULL,
Descripcion VARCHAR(300) NOT NULL,
Imagen BINARY NOT NULL
);
GO

IF OBJECT_ID('Registrar') IS NOT NULL
	DROP PROCEDURE dbo.Registrar;
GO

CREATE PROCEDURE [dbo].[Registrar]
@Nombre VARCHAR(30),
@Apellido VARCHAR(40),
@Correo_Electronico VARCHAR(40),
@Contraseña VARCHAR(100)
AS
BEGIN
	IF (SELECT COUNT(*) FROM Usuarios AS U WHERE UPPER(@Correo_Electronico) = UPPER(U.Correo_Electronico) ) > 0
		BEGIN
			RAISERROR('El usuario ya existe! Tonto Unu', 16, 1);
		END 

	BEGIN TRANSACTION
		BEGIN TRY

		DECLARE @ContraseñaCifrada VARBINARY(500)
		SET @ContraseñaCifrada = ENCRYPTBYPASSPHRASE(UPPER(@Nombre), @Contraseña);

		INSERT INTO Usuarios (Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña, Fecha_Creacion) 
		VALUES (@Nombre, @Apellido, @Correo_Electronico, @ContraseñaCifrada, GETDATE());

		IF @@TRANCOUNT > 0
			COMMIT TRANSACTION

	END TRY

	BEGIN CATCH

		SELECT ERROR_MESSAGE() AS Mensaje_Error, ERROR_NUMBER() AS Numero_Error;

		PRINT('La transacción ha sido un fracaso');

		IF @@TRANCOUNT > 0
			 ROLLBACK TRANSACTION

	END CATCH
END
GO

IF OBJECT_ID('Mostrar_Contraseña') IS NOT NULL
	DROP PROCEDURE Mostrar_Contraseña
GO

CREATE PROCEDURE Mostrar_Contraseña
@Correo VARCHAR(40)
AS
BEGIN
	
	IF (SELECT COUNT(*) FROM Usuarios AS U WHERE UPPER(U.Correo_Electronico) = UPPER(@Correo) ) = 0
		RAISERROR ('La cuenta no existe', 16, 1)
	
	SELECT U.Correo_Electronico AS Correo, CONVERT(VARCHAR(500), DECRYPTBYPASSPHRASE(UPPER(U.Nombre_Usuario), U.Contraseña)) AS Contraseña FROM Usuarios AS U WHERE UPPER(U.Correo_Electronico) = UPPER(@Correo)
END

GO

IF OBJECT_ID('BajaCliente') IS NOT NULL
DROP PROCEDURE BajaCliente

GO

CREATE PROCEDURE BajaCliente
@Correo VARCHAR(40),
@Contraseña VARCHAR(100)
AS
BEGIN
	
	IF (SELECT COUNT(*) FROM Usuarios AS U WHERE U.Correo_Electronico = @Correo) = 0
		BEGIN
			RAISERROR( 'El correo no existe, tonto ',16,1);
		END

	BEGIN TRANSACTION

	BEGIN TRY

	DECLARE @ContraseñaClara VARCHAR(100);

	SELECT @ContraseñaClara = CONVERT(VARCHAR(500), DECRYPTBYPASSPHRASE(UPPER(U.Nombre_Usuario), U.Contraseña)) FROM Usuarios AS U WHERE UPPER(U.Correo_Electronico) = UPPER(@Correo)


	IF (SELECT COUNT(*) FROM Usuarios AS U WHERE U.Contraseña = @ContraseñaClara) = 0
		BEGIN
			RAISERROR('La contraseña no coincide', 16, 1);
		END

	IF (SELECT COUNT(*) FROM Usuarios AS U WHERE (U.Fecha_Baja IS NOT NULL) AND (U.Correo_Electronico = @Correo)) = 0
		BEGIN
			RAISERROR('La cuenta ya ha sido dada de baja', 16, 1)
		END

	UPDATE Usuarios
	SET Fecha_Baja = GETDATE(),
	Fecha_Creacion = NULL;
	
	PRINT ('El cliente ha sido dado de baja con éxito');

	IF @@TRANCOUNT > 0
		COMMIT TRANSACTION

	END TRY

	BEGIN CATCH

		SELECT ERROR_MESSAGE() AS Mensaje_Error, ERROR_NUMBER() AS Numero_Error;

		PRINT('La transacción ha sido un fracaso');

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

	END CATCH

END


EXEC Mostrar_Contraseña @Correo = 'Irving@gmail.com'

EXEC Registrar @Nombre = 'Irving' , @Apellido = 'Conde', @Correo_Electronico = 'Irving@gmail.com', @Contraseña = 'micontraseña'

EXEC BajaCliente @Correo = 'Prueba2@gmail.com', @Contraseña = 'Contraseña2'

SELECT * FROM Usuarios

SELECT db_name(dbid) as DatabaseName, count(dbid) as NoOfConnections,
loginame as LoginName
FROM sys.sysprocesses
WHERE dbid > 0
GROUP BY dbid, loginame

