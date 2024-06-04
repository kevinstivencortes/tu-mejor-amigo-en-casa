import generoModels from "../models/Genero_models.js";

export const Registrargenero = async (req, res) => {
    try {
        const data = req.body;
        const docs = await generoModels.create(data);
        res.status(201).json({ data: docs }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const Listargenero = async (req, res) => {
    try {
        const genero = await generoModels.find({});
        if (genero.length === 0) {
            res.status(404).json({ error: 'No se encontraron géneros' });
        } else {
            res.status(200).json(genero);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al listar géneros: ' + error.message });
    }
}

export const Eliminargenero = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await generoModels.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Género eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const Actualizargenero = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await generoModels.findByIdAndUpdate(id, data, { new: true });
        if (result) {
            res.status(200).json({ data: result });
        } else {
            res.status(404).json({ error: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
