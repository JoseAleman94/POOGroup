function redirectToHomePage() {
    window.location.href = "./registroSolicitante.html";
}


window.onload = function() {
  const formulario=document.getElementById("formulario");
  formulario.addEventListener("submit",enviarFormulario);

  // agregar eventos cloudinary
  const boton = document.getElementById('subir-imagen');
  const previstaImagen = document.getElementById('prevista-imagen');
  let myWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dbhmj9ozd',
      uploadPreset: 'JeinerBlanco',

    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Imagen subida con exito', result.info);
        previstaImagen.src = result.info.secure_url;
      }
    }

  );

  boton.addEventListener(
    'click', 
    function() {
      myWidget.open();
    }, 
    false
  );
    };


async function enviarFormulario(evento) {
  evento.preventDefault();
  try {
     
      const correoElectronico = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const nombre = document.getElementById("name").value;
      const apellidos = document.getElementById("lastname").value;
      const fechaNacimiento = document.getElementById("date").value;
      const numContacto = document.getElementById("phone").value;
      const direccion = document.getElementById("address").value;
     const imagenUrl = document.getElementById('prevista-imagen');
      const puesto = document.getElementById("puesto").value;

if (!correoElectronico || !password || !nombre || !apellidos || !fechaNacimiento || !numContacto || !direccion || !imagenUrl.src || !puesto) {          
    alert("Faltan datos");
          return;
      }

      const respuesta = await fetch("http://localhost:3000/solicitantes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              correoElectronico: correoElectronico,
              password: password, // undefined
              nombre: nombre,
              apellidos: apellidos, 
              fechaNacimiento: fechaNacimiento,
              numContacto: numContacto,
              direccion: direccion,
              imagen: imagenUrl.src,
              puesto: puesto

          })  
      }); 

      if (respuesta.status === 201) {
          alert("Usuario creado");
          
          // borramos los datos del formulario
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
          document.getElementById("name").value = "";
          document.getElementById("lastname").value = "";
          document.getElementById("date").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("address").value = "";
          document.getElementById("prevista-imagen").src = "";
          document.getElementById("puesto").value = "";

          
          // Abrimos blank el resultado de la busqueda


          window.location.href = "../listaSolicitantes/resultadoBusqueda.html","blank";
        }

  } catch (error) {
      alert("Error al crear el usuario");
      console.error(error);
  }

}

