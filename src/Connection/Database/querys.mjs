export const querys = {
 verUsuarios: "SELECT * FROM Usuarios",
 RegistrarUsuario: "INSERT INTO Usuarios (Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña) VALUES (@NombreUsuario, @ApellidoUsuario, @CorreoElectronico, @Contraseña )",
 EncontrarUsuario: "SELECT * FROM Usuarios AS U WHERE U.IDUsuario = @Id",
 EliminarUsuario: "DELETE FROM Usuarios WHERE IDUsuario = @Id",
 ContarUsuarios: "SELECT COUNT(*) FROM Usuarios",
 ActualizarUsuario: "UPDATE Usuarios SET Nombre_Usuario = @Nombre, Apellido_Usuario = @Apellido, Correo_Electronico = @Correo, Contraseña = @Contraseña WHERE Correo_Electronico = @CorreoE",
 AltaInformacion: "INSERT INTO Informacion (Letra, Titulo, Descripcion, Imagen) VALUES (@letra, @palabra, @significado, @imagen)",
 VerInformacion : "SELECT * FROM Informacion"
};