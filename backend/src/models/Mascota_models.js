import mongoose from 'mongoose';

const mascotasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    imagen: {
        type: String,
        maxlength: 64
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        required: true,
    },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'generos',
        required: true,
    },
    raza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'raza',
        required: true,
    }
});

const mascotasModels = mongoose.model('mascotas', mascotasSchema);

export default mascotasModels;
