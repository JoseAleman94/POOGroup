window.onload = function() {
    const boton = document.getElementById('subir-imagen');
    const previstaImagen = document.getElementById('prevista-imagen');

    let myWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'dbhmj9ozd',
            uploadPreset: 'luiscascante',
        
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Imagen subida con exito', result.info);
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
    