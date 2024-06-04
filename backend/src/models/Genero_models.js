import mongoose from 'mongoose';


const generoSchema = new mongoose.Schema(
    {
        nombre: {
            required: true,
            type: String,
            maxlength: 32
        }
    }
);

const generoModels = mongoose.model('generos', generoSchema);

export default generoModels;

