import mongoose from 'mongoose';


const CategoriaSchema = new mongoose.Schema(
    {
        nombre: {
            required: true,
            type: String,
            maxlength: 32
        }
    }
);

const CategoriaModels = mongoose.model('categorias', CategoriaSchema);

export default CategoriaModels;

