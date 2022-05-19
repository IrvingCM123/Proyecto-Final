import {
    verUsuarios,
    AltaUsuario,
    EncontrarUsuario,
    EliminarUsuario,
    ContarUsuario,
    ActualizarUsuarios,
  } from "../Controllers/controlador";

  const router = Router();

  var requestURL = router.get(verUsuarios);

            // agrego el evento onclick al botón
            $('#visualizar').on('click', function () {
                $.ajax({
                    url: requestURL,
                    success: function (data) {
                        // una vez que obtenga el json parseo los resultados
                        $datos = $('#datosUsuario');

                        // creo la tabla y muestro los datos
                        $tabla = $('<table></table>');

                        // hago un ciclo
                        for (var i = 0; i < data.recordsets.length; i++) {
                            var $tr = $('<tr></tr>');
                            $tr.append('<td>' + data.recordsets[i].IDUsuario + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Nombre_Usuario + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Apellido_Usuario + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Correo_Electronico + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Contraseña + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Fecha_Creacion + '</td>');
                            $tr.append('<td>' + data.recordsets[i].Fecha_Baja+ '</td>');
                            // agrego la columna tr a la tabla
                            $tabla.append($tr);
                        }

                        // agrego la tabla al div datosPersona
                        $datos.append($tabla);
                    }
                });
            });