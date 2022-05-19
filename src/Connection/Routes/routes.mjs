import { Router } from "express";
import {
  verUsuarios,
  AltaUsuario,
  EncontrarUsuario,
  EliminarUsuario,
  ContarUsuario,
  ActualizarUsuarios,
  AltaInformacion,
} from "../Controllers/controlador.mjs";

const router = Router();
const books = [];

// Enlazar páginas para navegar
router.get("/", function (req, res) {
  res.render("Index.ejs")
})
router.get("/Catalogo", function (req, res) {
  res.render("Catalogo.ejs")
})

router.get("/CajaComentario", function (req, res) {
  res.render("Comentarios.ejs")
})

router.get("/MandarInfo", function (req, res) {
  res.render("MandarIinfo.ejs")
})

router.get("/Glosario", function (req, res) {
  res.render("Glosario.ejs"), {
    newInfo
  }
})

router.get("/Prueba", function (req, res) {
  res.render("Prueba.ejs")
})

router.get("/Catalogo/Glosario", function (req, res) {
  res.render("Glosario_A.ejs")
})

router.get("/", function (req, res) {
  res.render('Mostrar.ejs', {
    books
  })
})

router.post("/MandarInfo",AltaInformacion, function (req, res) {
  const { letra, palabra, significado, imagen } = req.body;

  if (!letra || !palabra || !significado || !imagen) {
    res.status(400).send("Faltan campos");
    return;
  }
  let newInfo = {
    letra,
    palabra,
    significado,
    imagen
  };

  console.log(newInfo);

  AltaInformacion.push(newInfo);

  res.render("/MandarInfo")

})
 



router.get("/Servidor/MostrarUsuarios", verUsuarios); //GET = Obtener información

router.post("/Servidor", AltaUsuario);

router.get("/Servidor/count", ContarUsuario);

router.get("/Servidor/:Id", EncontrarUsuario);

router.delete("/Servidor/:Id", EliminarUsuario);

router.put("/Servidor/:CorreoE", ActualizarUsuarios);


export default router;
