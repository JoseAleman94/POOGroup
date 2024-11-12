const mongoose = require("mongoose");

// Crear un esquema del solicitante de empleo
const solicitanteSchema = new mongoose.Schema({
    correoElectronico: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Por favor ingresa un correo electrónico válido"]
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v <= Date.now();
            },
            message: "La fecha de nacimiento no puede ser en el futuro"
        }
    },
    numContacto: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Por favor ingresa un número de contacto válido de 10 dígitos"]
    },
    direccion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false,
    },
    puesto: {
        type: String,
        required: true
    }
});

// Crear modelo de solicitante
const modeloSolicitante = mongoose.model("Solicitante", solicitanteSchema);

// Exportar modelo de solicitante a otros archivos
module.exports = modeloSolicitante;
