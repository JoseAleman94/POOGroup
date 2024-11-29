window.onload = function() {
    const formulario = document.getElementById("formulario_publicar_empleo");
    formulario.addEventListener("submit", enviarFormulario);

    // Mostrar fecha de expiración si ya existe en el elemento correspondiente
    const expirationElement = document.getElementById("vencimiento");
    if (expirationElement) {
        const expirationDate = expirationElement.getAttribute("data-expiration"); // Supone que tienes un atributo data-expiration con la fecha ISO
        if (expirationDate) {
            expirationElement.textContent = `Vencimiento: ${formatearFechaVisual(expirationDate)}`;
        }
    }
};

// Función para formatear la fecha a dd/mm/aa para mostrarla en la interfaz
function formatearFechaVisual(fechaISO) {
    const fecha = new Date(fechaISO);
    if (isNaN(fecha)) return ''; // Manejar fechas no válidas
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const anio = String(fecha.getFullYear()).slice(-2); // Solo los dos últimos dígitos del año
    return `${dia}/${mes}/${anio}`;
}

// Función para verificar si la fecha de expiración es mayor a la fecha actual
function esFechaFutura(fechaISO) {
    const fechaExpiracion = new Date(`${fechaISO}T00:00:00`); // Especificar la hora en 00:00:00 para evitar problemas de zona horaria
    const fechaActual = new Date();
    
    // Comparar solo las fechas, ignorando la hora
    fechaExpiracion.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    return fechaExpiracion > fechaActual;
}

// Enviar formulario a la base de datos
async function enviarFormulario(evento) {
    evento.preventDefault();
    try {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const salary = document.getElementById("salary").value;
        const location = document.getElementById("location").value;
        const job_type = document.getElementById("job_type").value;
        const modalidad = document.getElementById("modalidad").value;
        let expiration = document.getElementById("expiration").value;

        // Validación de los campos
        if (!titulo || !descripcion || !salary || !location || !job_type || !modalidad || !expiration) {
            alert("Faltan datos");
            return;
        }

        // Validar que la fecha de expiración sea en el futuro
        if (!esFechaFutura(expiration)) {
            alert("La fecha de expiración debe ser mayor a la fecha actual.");
            return;
        }

        // Enviar los datos a la API
        const respuesta = await fetch("http://localhost:3000/empleos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                salary: salary,
                location: location,
                job_type: job_type,
                modalidad: modalidad,
                expiration: expiration // Enviar en formato `aaaa-mm-dd` sin conversión adicional
            })
        });

        if (respuesta.status === 201) {
            alert("Empleo publicado exitosamente");
            // Limpia los campos del formulario
            document.getElementById("formulario_publicar_empleo").reset();
            window.location.href = "../5_lista_empleos/empleos.html";
        } else {
            const errorData = await respuesta.text(); // Obtener el mensaje de error del servidor
            alert("Error al publicar el empleo: " + errorData);
        }
    } catch (error) {
        alert("Error al publicar el empleo");
        console.error("Error:", error);
    }
}
