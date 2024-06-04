import { Router } from "express";
import { listarMascotas, listarMascotaPorId, registrarMascotas, cargarImagen, eliminarMascota, actualizarMascota } from "../controllers/Mascotas_controller.js";
import { verificarToken } from '../controllers/Login.js';

const mascotasMongo = Router();

// Ruta para listar todas las mascotas
mascotasMongo.get('/Listarmascotas', verificarToken, listarMascotas);

// Ruta para obtener una mascota por su ID
mascotasMongo.get('/Listarmascotas/:id', verificarToken, listarMascotaPorId);

// Ruta para registrar una nueva mascota
mascotasMongo.post('/Registrarmascotas', verificarToken, cargarImagen, registrarMascotas);

// Ruta para eliminar una mascota por su ID
mascotasMongo.delete('/EliminarMascota/:id', verificarToken, eliminarMascota);

// Ruta para actualizar una mascota por su ID
mascotasMongo.put('/ActualizarMascota/:id',verificarToken, cargarImagen, actualizarMascota);

export default mascotasMongo;
