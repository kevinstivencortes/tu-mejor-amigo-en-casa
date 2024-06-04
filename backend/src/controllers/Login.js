import jwt from 'jsonwebtoken';
import UsuarioModels from "../models/Usuarios_models.js";
import { compare } from "../models/Usuarios_models.js";

const MiLlaveSecreta = "mi_llave_secreta";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log("Encabezados recibidos:", req.headers); 
        return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token recibido:", token);  
    if (!token) return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });

    try {
        const verified = jwt.verify(token, MiLlaveSecreta);
        req.usuario = verified.usuario; 
        next();
    } catch (error) {
        console.log("Error al verificar el token:", error);
        res.status(400).json({ message: "Token inválido" });
    }
};



const Login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        const usuario = await UsuarioModels.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        const checkContrasenia = await compare(contrasenia, usuario.contrasenia);

        if (!checkContrasenia) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token
        const token = jwt.sign({ usuario }, MiLlaveSecreta, { expiresIn: '24h' });

        // Enviar token en la respuesta
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        return res.status(500).json({ message: "Error en el login.js: " + error.message });
    }
}

export default Login;
