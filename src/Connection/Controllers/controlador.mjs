import { query } from "express";
import { getConnection, sql, querys } from "../Database/index.mjs"
import fs from "fs"


export const verUsuarios = async (req, res, fields) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.verUsuarios);
    console.log(result.recordset);
    res.json(result);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const verInformacion = async (req, res, fields) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.verUsuarios);
    console.log(result.recordset);
    res.json(result);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const AltaInformacion = async (req, res) => {
  const { letra, palabra, significado, imagen } = req.body;

  if (letra == null || palabra == null || significado == null || imagen == null) {
    return res.status(400).json({ message: "Por favor llena todos los campos" });
  }

  try {
    const pool = await getConnection();

    await pool.request()
      .input("letra", sql.VarChar, letra)
      .input("palabra", sql.VarChar, palabra)
      .input("significado", sql.VarChar, significado)
      .input("imagen", sql.VarChar, imagen)
      .query(querys.AltaInformacion);
    res.json({ letra, palabra, significado, imagen})
  }
  catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const AltaUsuario = async (req, res) => {
  const { Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña } = req.body

  if (Nombre_Usuario == null || Apellido_Usuario == null || Correo_Electronico == null || Contraseña == null) {
    return res.status(400).json({ message: "Por favor llena todos los campos" });
  }

  try {
    const pool = await getConnection();

    await pool.request()
      .input("NombreUsuario", sql.VarChar, Nombre_Usuario)
      .input("ApellidoUsuario", sql.VarChar, Apellido_Usuario)
      .input("CorreoElectronico", sql.VarChar, Correo_Electronico)
      .input("Contraseña", sql.VarChar, Contraseña)
      .query(querys.RegistrarUsuario);

    res.json({ Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const EncontrarUsuario = async (req, res) => {
  const { Id } = req.params;
  const pool = await getConnection()
  const result = await pool
    .request()
    .input("Id", sql.Int, Id)
    .query(querys.EncontrarUsuario)
  res.send(result.recordset[0])
}

export const EliminarUsuario = async (req, res) => {
  const { Id } = req.params;
  const pool = await getConnection()
  const result = await pool
    .request()
    .input("Id", sql.Int, Id)
    .query(querys.EliminarUsuario)
  res.sendStatus(204)
}


export const ContarUsuario = async (req, res) => {
  const pool = await getConnection()
  const result = await pool
    .request()
    .query(querys.ContarUsuarios)
  res.json(result.recordset[0][''])
}

export const ActualizarUsuarios = async (req, res) => {
  const { Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña } = req.body
  const { CorreoE } = req.params

  if (Nombre_Usuario == null || Apellido_Usuario == null || Correo_Electronico == null || Contraseña == null) {
    return res.status(400).json({ message: "Por favor llena todos los campos" });
  }

  try {
    const pool = await getConnection();

    await pool.request()
      .input("Nombre", sql.VarChar, Nombre_Usuario)
      .input("Apellido", sql.VarChar, Apellido_Usuario)
      .input("Correo", sql.VarChar, Correo_Electronico)
      .input("Contraseña", sql.VarChar, Contraseña)
      .query(querys.ActualizarUsuario);
    res.json({ Nombre_Usuario, Apellido_Usuario, Correo_Electronico, Contraseña });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
