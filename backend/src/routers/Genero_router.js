import { Router } from "express";
import { Registrargenero, Listargenero, Eliminargenero, Actualizargenero } from "../controllers/genero_controller.js";

import { verificarToken } from '../controllers/Login.js';

const generoMongo = Router();

generoMongo.get('/Listargenero', Listargenero);

generoMongo.post('/Registrargenero', Registrargenero);

generoMongo.delete('/Eliminargenero/:id', Eliminargenero);

generoMongo.put('/Actualizargenero/:id', Actualizargenero);

export default generoMongo;
