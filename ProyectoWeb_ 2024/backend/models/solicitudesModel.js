// importar mongoose
const mongoose = require("mongoose");

// Crear un esquema de solicitudes de empleo
const schemaSolicitud = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    modalidad: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    }
});

// Crear modelo de solicitudes de empleo
const modeloSolicitudes = mongoose.model("Solicitudes", schemaSolicitud);

// Exportar el modelo para usar en otros archivos
module.exports = modeloSolicitudes;
