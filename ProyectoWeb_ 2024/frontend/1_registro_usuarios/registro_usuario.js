window.onload = function() {
    const formulario = document.getElementById("formularioRegistro");
    formulario.addEventListener("submit", enviarFormulario);
 };
 
 async function enviarFormulario(evento) {
     evento.preventDefault();
     
     try {
         const name = document.getElementById("name").value;
         const email = document.getElementById("email").value;
         const password = document.getElementById("password").value;
         const confirmPassword = document.getElementById("confirm_password").value;
         const role = document.getElementById("role").value;
 
         console.log("Datos del formulario obtenidos:");
         console.log({ name, email, password, confirmPassword, role });
 
         // Validar que los campos no estén vacíos
         if (!name || !email || !password || !confirmPassword || !role) {
             alert("Faltan datos");
             return;
         }
 
         // Validar que las contraseñas coincidan
         if (password !== confirmPassword) {
             alert("Las contraseñas no coinciden");
             return;
         }
 
         console.log("Datos validados, enviando al servidor...");
 
         const respuesta = await fetch("http://localhost:3000/users", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                 name: name,
                 email: email,
                 password: password,
                 role: role
             })
         });
 
         console.log("Respuesta del servidor recibida:", respuesta);
 
         if (respuesta.status === 201) {
             alert("Usuario creado exitosamente");
             console.log("Usuario creado con éxito.");
             window.location.href = "../2_Login/login.html";
         } else {
             const errorMessage = await respuesta.text();
             console.log("Error al crear usuario, mensaje del servidor:", errorMessage);
             alert("Error al crear el usuario: " + errorMessage);
         }
 
     } catch (error) {
         console.error("Error en la solicitud:", error);
         alert("Error al crear el usuario: " + error.message);
     }
 }
 