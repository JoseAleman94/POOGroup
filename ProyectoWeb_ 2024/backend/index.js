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
const modeloUsuario = require("../backend/models/userModel");
const modeloEmpleo = require("../backend/models/empleoModel");
const modeloSolicitudes = require("../backend/models/solicitudesModel");
const modeloPerfiles = require("../backend/models/perfilesModel");


//crear una instancia de express
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());



//escuchar en el puerto 3000
app.listen(3000, function () {
    console.log("Servidor escuchando en el puerto 3000");
}); 



// Conectamos a la base de datos
mongoose
  .connect(
    "mongodb+srv://JeinerBlanco3:BRAinner2714@jeinerblanco.rzos5qi.mongodb.net/?retryWrites=true&w=majority&appName=JeinerBlanco"

  )
  // Todo bien.
  .then(function () {
    console.log("Conexion a base de datos exitosa");
  })
  // Todo mal.
  .catch(function (error) {
    console.error("Error al conectar a la base de datos:", error);
  });







// Ruta principal para crear un nuevo usuario
app.post("/users", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /users");

  console.log("Datos recibidos:", solicitud.body);

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
    console.log("Error al obtener datos del usuario, status 400");
    respuesta.status(400).send("No se recibieron datos del usuario");
    return;
  }

  // Crear el nuevo usuario con los datos recibidos
  const nuevoUsuario = new modeloUsuario({
    name: solicitud.body.name,
    email: solicitud.body.email,
    password: solicitud.body.password,
    role: solicitud.body.role,
  });

  console.log("Usuario creado localmente (no guardado aún):", nuevoUsuario);

  try {
    console.log("Guardando nuevo usuario en la base de datos...");
    const usuarioGuardado = await nuevoUsuario.save();
    console.log("Usuario guardado exitosamente:", usuarioGuardado);
    respuesta.status(201).send(usuarioGuardado);
  } catch (error) {
    console.error("Error al guardar usuario en la base de datos:", error);
    respuesta.status(500).send("Error al guardar usuario");
  }
});






// Ruta para obtener un usuario por su correo electrónico
app.get("/users/email/:email", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users/email/:email");
  const email = request.params.email;

  try {
      const usuario = await modeloUsuario.findOne({ email: email });
      if (!usuario) {
          console.log("Usuario no encontrado");
          response.status(404).send("Usuario no encontrado");
          return;
      }

      console.log("Usuario encontrado:", usuario);
      response.status(200).send(usuario);
  } catch (error) {
      console.error("Error al obtener usuario por correo:", error);
      response.status(500).send("Error al obtener usuario");
  }
});



// Ruta para agregar nuevos empleos a la base de datos

app.post("/empleos", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /empleos");

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
      console.log("Error al obtener datos del empleo, status 400");
      respuesta.status(400).send("No se recibieron datos del empleo");
      return;
  }

  // Convertir la fecha de expiración a un objeto Date
  const fechaExpiracion = new Date(solicitud.body.expiration);
  if (isNaN(fechaExpiracion.getTime())) {
      console.log("Fecha de expiración inválida, status 400");
      respuesta.status(400).send("La fecha de expiración no es válida");
      return;
  }

  // Crear el nuevo empleo con los datos recibidos
  const nuevoEmpleo = new modeloEmpleo({
      titulo: solicitud.body.titulo,
      descripcion: solicitud.body.descripcion,
      salary: solicitud.body.salary,
      location: solicitud.body.location,
      job_type: solicitud.body.job_type,
      modalidad: solicitud.body.modalidad,
      expiration: fechaExpiracion // Aseguramos que sea un objeto Date válido
  });

  try {
      console.log("Guardando nuevo empleo en la base de datos...");
      const empleoGuardado = await nuevoEmpleo.save();
      console.log("Empleo guardado exitosamente:", empleoGuardado);
      respuesta.status(201).send(empleoGuardado);

  } catch (error) {
      console.error("Error al guardar empleo en la base de datos:", error);
      respuesta.status(500).send("Error al guardar empleo: " + error.message);
  }
});




/* Ruta para obtener todos los empleos de la base de datos */

app.get("/empleos", async (req, res) => {
  try {
      const empleos = await modeloEmpleo.find();
      res.json(empleos);
  } catch (error) {
    res.status(500).send("Error al obtener empleos: " + error.message);
  }
});






/*Ruta para enviar las solicitudes de empleo a la base de datos*/

app.post("/solicitudes", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /solicitudes");

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
      console.log("Error al obtener datos de la solicitud, status 400");
      respuesta.status(400).send("No se recibieron datos de la solicitud");
      return;
  }

  // Crear la nueva solicitud con los datos recibidos

  const nuevaSolicitud = new modeloSolicitudes({
      titulo: solicitud.body.titulo,
      job_type: solicitud.body.job_type,
      modalidad: solicitud.body.modalidad,
      salary: solicitud.body.salary,
      location: solicitud.body.location,
      usuario: solicitud.body.usuario
  });

  try {
      console.log("Guardando nueva solicitud en la base de datos...");
      const solicitudGuardada = await nuevaSolicitud.save();
      console.log("Solicitud guardada exitosamente:", solicitudGuardada);
      respuesta.status(201).send(solicitudGuardada);
  } catch (error) {
      console.error("Error al guardar solicitud en la base de datos:", error);
      respuesta.status(500).send("Error al guardar solicitud" + error.message);
  }
});





// Ruta principal para crear un nuevo Perfil
app.post("/perfiles", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /perfiles");

  console.log("Datos recibidos:", solicitud.body);

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
    console.log("Error al obtener datos del perfil, status 400");
    respuesta.status(400).send("No se recibieron datos del perfil");
    return;
  }

  // Crear el nuevo perfil con los datos recibidos
  const nuevoPerfil = new modeloPerfiles({
    nombre: solicitud.body.nombre,
    email: solicitud.body.email,
    phone: solicitud.body.phone,
    experience: solicitud.body.experience,
    modalidad: solicitud.body.modalidad,
    job_type: solicitud.body.job_type,
    location: solicitud.body.location,
    previstaImagen: solicitud.body.previstaImagen,
});
  console.log("Perfil creado localmente (no guardado aún):", nuevoPerfil);
  console.log("Datos recibidos:", solicitud.body); // Asegúrate de que solicitud.body.imagen esté presente y tenga valor


  try {
    console.log("Guardando nuevo perfil en la base de datos...");
    const perfilGuardado = await nuevoPerfil.save();
    console.log("Perfil guardado exitosamente:", perfilGuardado);
    respuesta.status(201).send(perfilGuardado);
  } catch (error) {
    console.error("Error al guardar perfil en la base de datos:", error);
    respuesta.status(500).send("Error al guardar el perfil");
  }
});








// Ruta para obtener todos los perfiles de la base de datos

app.get ("/perfiles", async function (req, res) {
  console.log("Atendiendo solicitud GET a /perfiles");
  try {
    const perfiles = await modeloPerfiles.find();
    console.log("Perfiles encontrados:", perfiles);
    res.status(200).send(perfiles);
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    res.status(500).send("Error al obtener perfiles");
    }
  });



  // Ruta para editar un perfil por su correo electrónico

app.put("/perfiles/email/:email", async function (solicitud, respuesta) {
  console.log("Atendiendo petición PUT para actualizar /perfiles/email/:email");

  const email = solicitud.params.email;
  console.log("Datos recibidos:", solicitud.body);

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
      console.log("Error al obtener datos del perfil, status 400");
      respuesta.status(400).send("No se recibieron datos del perfil");
      return;
  }

  try {
      const perfil = await modeloPerfiles.findOne({ email: email });
      if (!perfil) {
          console.log("Perfil no encontrado");
          respuesta.status(404).send("Perfil no encontrado");
          return;
      }

      console.log("Perfil encontrado:", perfil);

      // Actualizar los datos del perfil con los datos recibidos
      perfil.nombre = solicitud.body.nombre || perfil.nombre;
      perfil.phone = solicitud.body.phone || perfil.phone;
      perfil.experience = solicitud.body.experience || perfil.experience;
      perfil.modalidad = solicitud.body.modalidad || perfil.modalidad;
      perfil.job_type = solicitud.body.job_type || perfil.job_type;
      perfil.location = solicitud.body.location || perfil.location;
      perfil.previstaImagen = solicitud.body.previstaImagen || perfil.previstaImagen;

      console.log("Guardando perfil actualizado en la base de datos...");
      const perfilActualizado = await perfil.save();
      console.log("Perfil actualizado exitosamente:", perfilActualizado);
      respuesta.status(200).send(perfilActualizado);
  } catch (error) {
      console.error("Error al actualizar perfil:", error);
      respuesta.status(500).send("Error al actualizar perfil");
  }
});

