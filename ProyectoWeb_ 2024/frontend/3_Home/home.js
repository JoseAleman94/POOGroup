window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Si usuario esta vacio, muestra el boton de login

    if (!usuario) {
        document.getElementById("login").style.display = "block";
        document.getElementById("nombreUsuario").style.display = "none";
        document.getElementById("usuarioImagen").style.display = "none";
        document.getElementById("usuarioNombreCompleto").style.display = "none";
        document.getElementById("usuarioCorreo").style.display = "none";
        document.getElementById("empleosDisponibles").style.display = "none";
        document.getElementById("permisoparaempleosDisponibles").style.display = "block";
        document.getElementById("nav-menu").style.display = "none";
        // Si usuario esta lleno, muestra el boton de perfil
    } else {
        document.getElementById("permisoparaempleosDisponibles").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nombreUsuario").style.display = "block";
        
    }



    if (usuario) {
        const nombreUsuario = document.getElementById("nombreUsuario");
        nombreUsuario.textContent = usuario.name;
    
        // Establece la imagen de perfil, o una imagen por defecto si no hay una imagen de usuario
        const imagenPerfil = document.getElementById("usuarioImagen");
        if (!usuario.image) {
            imagenPerfil.src = "../img/perfil.png"; // Asigna la imagen por defecto al atributo src
        } else {
            imagenPerfil.src = usuario.image; // Asigna la imagen del usuario al atributo src
        }
    
        // Llena los datos de perfil en el menú desplegable
        document.getElementById("usuarioNombreCompleto").textContent = usuario.name;
        document.getElementById("usuarioCorreo").textContent = usuario.email;
    }
};
    







// Función para mostrar u ocultar el menú desplegable de usuario
function toggleMenu() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}





// Redirecciona a la página de edición de perfil
function editarPerfil() {
    window.location.href = "../6_perfil_solicitante/perfil_solicitante.html";
}





// Función para cerrar sesión
function salir() {
    Swal.fire({
        title: '¿Deseas cerrar sesión?',
        text: "Se eliminará el usuario de la sesión actual.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('usuario');
            
            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has salido de tu cuenta con éxito.',
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {
                window.location.href = '../3_Home/home.html';
            }, 1500);
        }
    });
}




// Oculta el menú desplegable si se hace clic fuera de él
document.addEventListener("click", function(event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const nombreUsuario = document.getElementById("nombreUsuario");

    if (dropdownMenu && !dropdownMenu.contains(event.target) && event.target !== nombreUsuario) {
        dropdownMenu.style.display = "none";
    }
});


