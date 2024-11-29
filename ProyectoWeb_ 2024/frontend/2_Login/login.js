// Obtener datos por correo único
async function obtenerDatosPorCorreo(correo) {
    try {
        const respuesta = await fetch(`http://localhost:3000/empleos/${correo}`);
        console.log("Respuesta del servidor en obtenerDatosPorCorreo:", respuesta);

        if (!respuesta.ok) {
            throw new Error("Error al obtener datos del servidor");
        }

        const usuario = await respuesta.json();
        console.log("Datos del usuario obtenidos:", usuario);

        // Verificar que el elemento existe antes de actualizar
        const nombreUsuarioElemento = document.getElementById("nombreUsuario");
        if (nombreUsuarioElemento) {
            nombreUsuarioElemento.textContent = usuario.name;
        }
        
        // Guardar todo el objeto usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
    }
}

// Enviar formulario
async function enviarFormulario(evento) {
    evento.preventDefault();
    try {
        const correoElectronico = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validar que no falten datos y que el correo tenga un formato adecuado
        if (correoElectronico === "" || password === "" || !/\S+@\S+\.\S+/.test(correoElectronico)) {
            alert("Faltan datos o el correo es inválido");
            return;
        }

        console.log("Enviando datos de inicio de sesión:", { correoElectronico, password });

        const respuesta = await fetch(`http://localhost:3000/users/email/${correoElectronico}`);
        console.log("Respuesta del servidor:", respuesta);

        if (respuesta.status === 200) {
            const usuario = await respuesta.json();
            console.log("Usuario encontrado:", usuario);
            alert(`Bienvenido ${usuario.name}`);

            // Limpiar localStorage y almacenar el nuevo usuario
            localStorage.removeItem("usuario");
            localStorage.setItem("usuario", JSON.stringify(usuario));

            // Actualizar el nombre de usuario en el DOM si el elemento existe
            const nombreUsuarioElemento = document.getElementById("nombreUsuario");
            if (nombreUsuarioElemento) {
                nombreUsuarioElemento.textContent = usuario.name;
            }

            // Llamar a la función para obtener el usuario de la base de datos y luego redirigir
            await obtenerDatosPorCorreo(correoElectronico);
            window.location.href = "../3_Home/home.html";
        } else if (respuesta.status === 404) {
            alert("Correo o contraseña incorrectos");
        } else {
            alert("Error al iniciar sesión");
        }
    } catch (error) {
        alert("Error al iniciar sesión");
        console.error("Error en la solicitud:", error);
    }
}

// Añadir el evento al cargar la página
window.onload = function() {
    const formulario = document.getElementById("formularioLogin");
    formulario.addEventListener("submit", enviarFormulario);
};
