const mongoose = require('mongoose');

// crear esquema para los perfiles

const schemaPerfiles = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    modalidad: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    previstaImagen: {
        type: String,
        required: true,
    },
    
    });

// crear modelo para los perfiles
const modeloPerfiles = mongoose.model('perfile', schemaPerfiles);

// exportar el modelo
module.exports = modeloPerfiles;