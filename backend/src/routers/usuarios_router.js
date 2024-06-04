import { Router } from "express";

import { RegistrarUsuario, ListarUsuario, EliminarUsuario, ActualizarUsuario } from "../controllers/usuarios_controller.js";

const usuarioMongo = Router();

usuarioMongo.get('/ListarUsuario', ListarUsuario);

usuarioMongo.post('/RegistrarUsuario', RegistrarUsuario);

usuarioMongo.delete('/EliminarUsuario/:id', EliminarUsuario);

usuarioMongo.put('/ActualizarUsuario/:id', ActualizarUsuario);

export default usuarioMongo;
