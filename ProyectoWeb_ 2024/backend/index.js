//REST API representational state transfer
// CRUD (Create, Read, Update, Delete)

/* 
Primero crear backend con "npm init -y"
para que se instalen todos los archivos que se van a crear.

Ingresar al archivo package.json y personalizar el archivo, 
Borrar el "main" y en la parte de scripts, poner dentro "start": "nodemon index.js"

Despues instalar varios modulos (npm install express mongoose nodemon)
*/

//importar express,mongoose y cors
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// importar cada model

const  modeloUsuario = require("./models/usuarioModel");



const app = express();
app.use(express.json());
app.use(cors());

//escuchar en el puerto 3000
app.listen(3000, function () {
  console.log("Servidor escuchando en el puerto 3000");
}); 

// Conectamos con la base de datos

mongoose
  .connect(
    "mongodb+srv://JeinerBlanco3:BRAinner2714@jeinerblanco.rzos5qi.mongodb.net/?retryWrites=true&w=majority&appName=JeinerBlanco"
  )
  // escuchando al puerto 3000
 

  // Todo bien.
  .then(function () {
    console.log("Conexion a base de datos exitosa");
  })
  // Todo mal.
  .catch(function (error) {
    console.error("Error al conectar a la base de datos:", error);
  });

   // Aqui empieza el CRUD

   //Codigo para crear un nuevo usuario

   app.post("/usuario", async function (solicitud, respuesta) {
    console.log("Atendiendo solicitud POST a /usuario");

    // Verificar que se proporcionaron datos
    if (!solicitud.body) {
      console.log("No se proporcionaron datos para el nuevo usuario");
      respuesta.status(400).send("No se enviaron datos para el nuevo usuario");
      return;
    }

    // Crear un nuevo usuario en el servidor
    const nuevoUsuario = new modeloUsuario({
    name: solicitud.body.nombre,
    email: solicitud.body.email,
    password: solicitud.body.password,
    role: solicitud.body.role,
  });

  try {
    console.log ("Guardando el nuevo usuario...");
    const usuarioGuardado = await nuevoUsuario.save();
    console.log("Usuario guardado:", usuarioGuardado);
    respuesta.status(201).send(usuarioGuardado);
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    respuesta.status(500).send("Error al guardar el usuario");
    return;
  }
});


