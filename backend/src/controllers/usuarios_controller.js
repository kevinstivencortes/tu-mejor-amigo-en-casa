import UsuariosModels, { encriptarContrasenia } from "../models/Usuarios_models.js";

/* Registrar usuario */
export const RegistrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, contrasenia } = req.body;
        
        const contraseniaEncriptada = await encriptarContrasenia(contrasenia);
        
        const nuevoUsuario = new UsuariosModels({
            nombre,
            correo,
            contrasenia: contraseniaEncriptada
        });

        const usuarioCreado = await nuevoUsuario.save();
        
        res.status(201).send({ data: usuarioCreado }); 
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/* Listar usuarios */
export const ListarUsuario = async (req, res) => {
    try {
        const usuarios = await UsuariosModels.find({});
        if (usuarios.length === 0) {
            res.status(404).send({ error: 'No se encontraron usuarios' });
        } else {
            res.status(200).send(usuarios);
        }
    } catch (error) {
        res.status(500).send({ error: 'Error al listar usuario' + error });
    }
}
/* Eliminar usuario por ID */
export const EliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UsusarioModels.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario: ' + error.message });
    }
}

/* Actualizar usuario por ID */
export const ActualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await UsusarioModels.findByIdAndUpdate(id, data, { new: true });
        if (result) {
            res.status(200).json({ message: 'Usuario actualizado con éxito', data: result });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario: ' + error.message });
    }
}