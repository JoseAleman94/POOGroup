
// Importar mongoose
const mongoose = require("mongoose");


// Crear un esquema del usuario

const schemaUsuario = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

// Crear modelo de usuario

const modeloUsuario = mongoose.model("Usuario", schemaUsuario);

// Exportar modelo de usuario a otros archivos

module.exports = modeloUsuario;