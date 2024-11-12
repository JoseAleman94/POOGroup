// Registro de usuario

// Obtener referencias a los elementos del DOM

window.onload = function () {
    const formulario = document.getElementById("formularioRegistro");

    // Agregar evento de envío del formulario
    formulario.addEventListener("submit",enviarFormulario);
};

async function enviarFormulario(evento) {
    evento.preventDefault();

    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const role = document.getElementById("role").value;

        if (!name || !email || !password || !confirmPassword || !role) {
            alert("Faltan datos");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const response = await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });

        if (response.status === 201) {
            alert("Usuario creado exitosamente");
            window.location.href = "./login.html";
        }

    } catch (error) {
        alert("Error al registrar el usuario");
        console.error(error);
    }
}   

    