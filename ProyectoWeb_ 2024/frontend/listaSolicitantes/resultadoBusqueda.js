// app.js

// Función para obtener los solicitantes desde la API y mostrarlos
async function cargarSolicitantes() {
  try {
      const respuesta = await fetch("http://localhost:3000/solicitantes", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (respuesta.ok) {
          const solicitantes = await respuesta.json();
          mostrarSolicitantes(solicitantes);
      } else {
          console.error("Error al obtener los solicitantes", respuesta.status);
      }
  } catch (error) {
      console.error("Error en la solicitud", error);
  }
}

function mostrarSolicitantes(solicitantes) {
    const lista = document.getElementById("solicitantes");
    lista.innerHTML = ""; // Limpia la lista antes de agregar los solicitantes

    solicitantes.forEach((solicitante) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = solicitante.imagen;
        imagen.alt = `${solicitante.nombre} ${solicitante.apellidos}`;
        imagen.classList.add("card-img");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const nombre = document.createElement("h3");
        nombre.textContent = `${solicitante.nombre} ${solicitante.apellidos}`;
        nombre.classList.add("card-title");

        const email = document.createElement("p");
        email.textContent = `Correo electrónico: ${solicitante.correoElectronico}`;

        const telefono = document.createElement("p");
        telefono.textContent = `Teléfono: ${solicitante.numContacto}`;

        const direccion = document.createElement("p");
        direccion.textContent = `Dirección: ${solicitante.direccion}`;

        const curriculum = document.createElement("a");
        curriculum.href = solicitante.curriculum;

        // Botón para ver el currículum
        const verCurriculum = document.createElement("button");
        verCurriculum.textContent = "Ver currículum";
        verCurriculum.classList.add("ver-curriculum-btn");
        verCurriculum.onclick = function() {
            // Asegúrate de que solicitante.curriculum contiene la URL del PDF en Cloudinary
            window.open(solicitante.curriculum, "_blank"); // Abre el PDF en una nueva pestaña
        };

        // Agregar los elementos al contenedor de la tarjeta
        cardBody.appendChild(nombre);
        cardBody.appendChild(email);
        cardBody.appendChild(telefono);
        cardBody.appendChild(direccion);
        cardBody.appendChild(verCurriculum); // Agregar el botón de currículum
        card.appendChild(imagen);
        card.appendChild(cardBody);
        lista.appendChild(card);
    });
}

// Llamar a la función cargarSolicitantes cuando la página cargue
window.onload = function () {
  cargarSolicitantes();

  // Actualizar la lista cada cierto tiempo para que refleje los cambios
  setInterval(cargarSolicitantes, 5000); // Actualiza cada 5 segundos
};
