import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/* agregar valores */
const UsuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 32
    },
    correo: {
        type: String,
        unique: true,
        required: true,
        maxlength: 32
    },
    contrasenia: {
        type: String,
        required: true,
        maxlength: 62
    }
});

const UsuariosModels = mongoose.model('usuarios', UsuariosSchema);

export default UsuariosModels;

/* encriptar contraseña */
export const encriptarContrasenia = async(contrasenia) => {
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 8);
    return contraseniaEncriptada;
}

/* Login compara la contrasenia, correo */
export const compare = async(texto, contraseniaEncriptada) => {
    return await bcrypt.compare(texto, contraseniaEncriptada);
}




/* encriptar contraseña v1 */
/* UsuariosSchema.pre('save', function(next) {
    const usuario = this;
    if (!usuario.isModified('contrasenia')) {
        return next();
    }
    bcrypt.genSalt(8, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(usuario.contrasenia, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            usuario.contrasenia = hash;
            next();
        });
    });
}); */