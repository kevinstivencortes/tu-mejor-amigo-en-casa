import { validationResult } from 'express-validator';
import multer from 'multer';
import mongoose from 'mongoose';
import mascotasModels from '../models/Mascota_models.js';

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single('imagen');

// Registrar una mascota con imagen
export const registrarMascotas = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { nombre, categoria, genero, raza } = req.body;
        const img = req.file.originalname;

        const nuevaMascota = new mascotasModels({
            nombre,
            imagen: img,
            categoria,
            genero,
            raza
        });

        await nuevaMascota.save();
        res.status(200).json({ message: 'La mascota se registró con éxito :)' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la mascota: ' + error.message });
    }
}

// Listar mascotas
export const listarMascotas = async (req, res) => {
    try {
        const mascotas = await mascotasModels.find({})
            .populate('categoria', 'nombre')
            .populate('genero', 'nombre')
            .populate('raza', 'nombre');
        if (mascotas.length === 0) {
            res.status(404).json({ message: 'No se encontraron mascotas' });
        } else {
            const mascotasConImagen = mascotas.map(mascota => {
                return {
                    _id: mascota._id,
                    nombre: mascota.nombre,
                    imagenUrl: `http://localhost:3000/img/${mascota.imagen}`,
                    categoria: mascota.categoria,
                    genero: mascota.genero,
                    raza: mascota.raza
                };
            });
            res.status(200).json({ result: mascotasConImagen });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al listar mascotas: ' + error.message });
    }
}

// Listar mascota por ID
export const listarMascotaPorId = async (req, res) => {
    try {
        const mascota = await mascotasModels.findById(req.params.id)
            .populate('categoria', 'nombre')
            .populate('genero', 'nombre')
            .populate('raza', 'nombre');
        
        if (!mascota) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        
        const imagenUrl = `http://localhost:3000/img/${mascota.imagen}`;

        const mascotaConImagen = {
            _id: mascota._id,
            nombre: mascota.nombre,
            imagenUrl: imagenUrl,
            categoria: mascota.categoria,
            genero: mascota.genero,
            raza: mascota.raza
        };

        res.status(200).json({ result: mascotaConImagen });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mascota: ' + error.message });
    }
}

// Eliminar mascota
export const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await mascotasModels.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Mascota eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota: ' + error.message });
    }
}

// Actualizar mascota por ID
export const actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, genero, raza } = req.body;

        // verificar si se cargó una nueva imagen
        let imagen = '';
        if (req.file) {
            imagen = req.file.filename;
        }

        const updatedFields = {};
        if (nombre) updatedFields.nombre = nombre;
        if (categoria) updatedFields.categoria = categoria;
        if (genero) updatedFields.genero = genero;
        if (raza) updatedFields.raza = raza;
        if (imagen) updatedFields.imagen = imagen;

        // actualizar la mascota en la base de datos
        const result = await mascotasModels.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

        if (result) {
            res.status(200).json({ message: 'Mascota actualizada con éxito', data: result });
        } else {
            res.status(404).json({ message: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota: ' + error.message });
    }
};

