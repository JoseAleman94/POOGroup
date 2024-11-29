// Arreglo global para almacenar todos los datos de empleos
const empleos = [];

// Arreglo global para almacenar todos los datos de usuarios
const usuarios = [];

// Función para obtener los empleos desde MongoDB y almacenarlos en el arreglo global
async function cargarEmpleos() {
    try {
        const respuesta = await fetch("http://localhost:3000/empleos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const datosEmpleos = await respuesta.json();
            
            // Limpiar el arreglo de empleos y añadir los datos obtenidos
            empleos.length = 0;
            empleos.push(...datosEmpleos);
            
            actualizarEmpleos(); // Mostrar empleos después de cargar los datos
        } else {
            console.error("Error al obtener los empleos", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}

// Función para formatear la fecha en el formato dd/mm/aa
function formatearFechaVisual(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
}

// Función que muestra los empleos en el DOM
function mostrarEmpleos(empleosFiltrados) {
    const listaEmpleos = document.getElementById("cardSection");
    if (!listaEmpleos) {
        console.error("El elemento 'cardSection' no se encuentra en el DOM");
        return;
    }

    listaEmpleos.innerHTML = "";

    if (empleosFiltrados.length === 0) {
        listaEmpleos.innerHTML = `<p class="modern-card">No se encontraron empleos que coincidan con los filtros.</p>`;
        listaEmpleos.style.textAlign = "center";
        listaEmpleos.style.padding = "20px";
        listaEmpleos.style.fontSize = "1.5rem";
        listaEmpleos.style.color = "red";
        return;
    }

    empleosFiltrados.forEach(empleo => {
        const card = document.createElement("div");
        card.classList.add("card", "modern-card");

        const fechaVencimiento = formatearFechaVisual(empleo.expiration);

        card.innerHTML = `
            <div class="card-body">
                <h3 class="card-title text-center">${empleo.titulo}</h3>
                <p class="card-text descripcion">${empleo.descripcion}</p>
                <p class="card-text job-type">${empleo.job_type} <br>(${empleo.modalidad})</p>
                <p class="card-text location"><strong>Lugar:</strong> <br>${empleo.location}</p>
                <p class="card-text salary"><strong>Salario:</strong> <br>${empleo.salary}</p>
                <p class="card-text title2"><strong>Vencimiento:</strong> <br>${fechaVencimiento}</p>
                <button onclick="guardarSolicitud('${empleo._id}', '${empleo.titulo}', '${empleo.job_type}', '${empleo.modalidad}', '${empleo.salary}', '${empleo.location}')" class="btn btn-outline-primary apply-button">Solicitar Ahora</button>
            </div>
        `;
        listaEmpleos.appendChild(card);
    });
}

// Función para guardar una solicitud en la base de datos
async function guardarSolicitud(idEmpleo, titulo, jobType, modalidad, salary, location) {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtener usuario autenticado
        if (!usuario || !usuario._id) {
            alert("Usuario no autenticado. Inicie sesión para aplicar.");
            return;
        }

        // Crear el objeto solicitud con datos del empleo y usuario
        const solicitud = {
            empleo_id: idEmpleo,
            titulo: titulo,
            job_type: jobType,
            modalidad: modalidad,
            salary: salary,
            location: location,
            usuario: usuario.name
        };

        // Añadir la solicitud al arreglo de usuarios
        usuarios.push(solicitud);

        // Enviar la solicitud a la base de datos en la colección 'solicitudes'
        const respuesta = await fetch("http://localhost:3000/solicitudes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solicitud)
        });

        if (respuesta.ok) {
            alert("Solicitud enviada exitosamente");
        } else {
            console.error("Error al enviar la solicitud:", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}

// Funciones para filtros y limpieza de filtros
function obtenerValoresSeleccionados(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function aplicarFiltros() {
    const titulo = document.getElementById("titulo").value.toLowerCase();
    const jobTypes = obtenerValoresSeleccionados("job_type");
    const modalidades = obtenerValoresSeleccionados("modalidad");
    const salary = document.getElementById("salary").value;
    const location = document.getElementById("location").value.toLowerCase();

    return empleos.filter(empleo => {
        return (
            (titulo === "" || empleo.titulo.toLowerCase().includes(titulo)) &&
            (jobTypes.length === 0 || jobTypes.includes(empleo.job_type)) &&
            (modalidades.length === 0 || modalidades.includes(empleo.modalidad)) &&
            (salary === "" || empleo.salary === salary) &&
            (location === "" || empleo.location.toLowerCase().includes(location))
        );
    });
}

function actualizarEmpleos() {
    const empleosFiltrados = aplicarFiltros();
    mostrarEmpleos(empleosFiltrados);
}

// Inicialización de eventos y carga de empleos
window.onload = function () {
    cargarEmpleos();

    document.getElementById("titulo").addEventListener("input", actualizarEmpleos);
    document.getElementById("salary").addEventListener("input", actualizarEmpleos);
    document.getElementById("location").addEventListener("input", actualizarEmpleos);

    const jobTypeCheckboxes = document.querySelectorAll('input[name="job_type"]');
    jobTypeCheckboxes.forEach(checkbox => checkbox.addEventListener("change", actualizarEmpleos));

    const modalidadCheckboxes = document.querySelectorAll('input[name="modalidad"]');
    modalidadCheckboxes.forEach(checkbox => checkbox.addEventListener("change", actualizarEmpleos));
};

function limpiarFiltros(){
    document.getElementById("titulo").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("location").value = "";

    document.querySelectorAll('input[name="job_type"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('input[name="modalidad"]').forEach(checkbox => checkbox.checked = false);

    actualizarEmpleos();
}
