document.getElementById("loadProfileBtn").addEventListener("click", async () => {
    await obtenerPerfiles();
    mostrarPerfiles(perfiles);
});

const perfiles = [];

async function obtenerPerfiles() {
    try {
        const respuesta = await fetch("http://localhost:3000/perfiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const todosLosPerfiles = await respuesta.json();
            perfiles.length = 0;
            perfiles.push(...todosLosPerfiles);
        } else {
            console.error("Error al obtener los perfiles", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}

// Función para cargar perfil en modo edición
async function cargarPerfilParaEditar(email) {
    try {
        const respuesta = await fetch(`http://localhost:3000/perfiles/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const perfil = await respuesta.json();

            document.getElementById("email_oculto").value = perfil.email;
            document.getElementById("name").value = perfil.nombre;
            document.getElementById("phone").value = perfil.phone;
            document.getElementById("experience").value = perfil.experience;
            document.getElementById("modalidad").value = perfil.modalidad;
            document.getElementById("job_type").value = perfil.job_type;
            document.getElementById("location").value = perfil.location;

            // Cambiar texto del botón a "Actualizar Perfil"
            const submitButton = document.querySelector("button[type='submit']");
            submitButton.textContent = "Actualizar Perfil";
        } else {
            console.error("Error al cargar el perfil para edición", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud de edición", error);
    }
}

// Función para enviar el formulario
async function enviarFormulario(evento) {
    evento.preventDefault();

    const email = document.getElementById("email_oculto").value; // Obtener correo electrónico
    const url = email
        ? `http://localhost:3000/perfiles/email/${email}` // URL para actualizar perfil por correo
        : "http://localhost:3000/perfiles"; // URL para crear un nuevo perfil

    const method = email ? "PUT" : "POST"; // Usar PUT para actualizar, POST para crear

    try {
        const perfilData = {
            nombre: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            experience: document.getElementById("experience").value,
            modalidad: document.getElementById("modalidad").value,
            job_type: document.getElementById("job_type").value,
            location: document.getElementById("location").value,
            previstaImagen: document.getElementById("pdf_url").value
        };

        const respuesta = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(perfilData),
        });

        if (respuesta.ok) {
            alert("Perfil guardado exitosamente");
            document.getElementById("formulario").reset();
            await obtenerPerfiles(); // Recargar perfiles
        } else {
            const errorData = await respuesta.text();
            alert("Error al guardar el perfil: " + errorData);
        }
    } catch (error) {
        alert("Error al guardar el perfil");
        console.error("Error:", error);
    }
}
