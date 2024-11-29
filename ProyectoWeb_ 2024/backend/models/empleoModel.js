// importar mongoose

const mongoose = require("mongoose");

// Crear un esquema de empleos

const schemaEmpleo = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
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
    job_type: {
        type: String,
        required: true
    },
    modalidad: {
        type: String,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    }
});

// Crear modelo de empleos

const modeloEmpleo = mongoose.model("Empleo", schemaEmpleo);

// Exportar modelo de empleos a otros archivos

module.exports = modeloEmpleo;