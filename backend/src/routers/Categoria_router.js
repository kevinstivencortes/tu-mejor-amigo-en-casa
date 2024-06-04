import { Router } from "express";
import { verificarToken } from '../controllers/Login.js';

import { RegistrarCategoria, ListarCategoria, EliminarCategoria, ActualizarCategoria } from "../controllers/Categoria_controller.js";

const CategoriaMongo = Router();

CategoriaMongo.get('/ListarCategoria', ListarCategoria);

CategoriaMongo.post('/RegistrarCategoria', RegistrarCategoria);

CategoriaMongo.delete('/EliminarCategoria/:id', EliminarCategoria);

CategoriaMongo.put('/ActualizarCategoria/:id', ActualizarCategoria);

export default CategoriaMongo;
