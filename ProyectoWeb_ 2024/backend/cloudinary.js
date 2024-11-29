window.onload = function() {
    const boton = document.getElementById('subir_archivo');
    const previstaImagen = document.getElementById('prevista-imagen');

    let myWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'dbhmj9ozd', // Reemplaza con tu propio nombre de cuenta de Cloudinary
            uploadPreset: '271451', // Asegúrate de que este sea el preset correcto
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Imagen subida con éxito', result.info);
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



}
    