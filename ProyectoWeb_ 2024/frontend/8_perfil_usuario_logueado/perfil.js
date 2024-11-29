
window.onload = function() {
    //agregar evento al formulario
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", enviarFormulario);

    //agregar eventos de cloudinary
const boton = document.getElementById("subir_archivo");
const previstaImagen = document.getElementById("vista-previa"); 

let myWidget = cloudinary.createUploadWidget(
    {
        cloudName: "dbhmj9ozd", // Reemplaza con tu Cloud Name
        uploadPreset: "271451", // Reemplaza con tu Upload Preset sin firma
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Archivo subido con éxito", result.info.secure_url);
            previstaImagen.src = result.info.secure_url; // Muestra la imagen subida
        }
    }
);

boton.addEventListener("click", function() {
    myWidget.open();
}, false);
};

// Función para enviar el formulario

async function enviarFormulario(evento) {
    evento.preventDefault(); // Evita la recarga de la página

    try {
        const nombre = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const experience = document.getElementById("experience").value;
        const modalidad = document.getElementById("modalidad").value;
        const job_type = document.getElementById("job_type").value;
        const location = document.getElementById("location").value;
        const previstaImagen = document.getElementById("vista-previa");
        if (!nombre || !email || !phone || !experience || !modalidad || !job_type || !location || !previstaImagen.src) {
            alert("Por favor llene todos los campos");
            return;
        }

       const respuesta = await fetch("http://localhost:3000/perfiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            nombre: nombre,
            email: email,
            phone: phone,
            experience: experience,
            modalidad: modalidad,
            job_type: job_type,
            location: location,
            previstaImagen: previstaImagen.src,           
}),
        });

        if (respuesta.ok) {
            alert("Perfil creado exitosamente");
            // Limpiar el formulario
            document.getElementById("formulario").reset();
            window.location.href = "/frontend/6_perfil_solicitante/perfil_solicitante.html";
        }
        else {
            const errorData = await respuesta.text();
            alert("Error al crear el perfil: " + errorData);
        }
    } catch (error) {
        alert("Error al crear el perfil");
        console.error("Error:", error);
    }
}
