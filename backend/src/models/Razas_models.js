import mongoose from 'mongoose';

/* crear un esquema para las razas */
const RazasSchema = new mongoose.Schema(
    {
        nombre: {
            required: true,
            type: String
        }
    }
);

const RazasModels = mongoose.model('raza', RazasSchema);

export default RazasModels;

