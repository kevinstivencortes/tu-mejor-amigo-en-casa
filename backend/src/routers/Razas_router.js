import { Router } from "express";
import { RegistrarRaza, ListarRaza, EliminarRaza, ActualizarRaza } from "../controllers/Razas_controller.js";

import { verificarToken } from '../controllers/Login.js';

const RazaMongo = Router();

RazaMongo.get('/ListarRaza', ListarRaza);

RazaMongo.post('/RegistrarRaza', RegistrarRaza);

RazaMongo.delete('/EliminarRaza/:id', EliminarRaza);

RazaMongo.put('/ActualizarRaza/:id', ActualizarRaza);

export default RazaMongo;
