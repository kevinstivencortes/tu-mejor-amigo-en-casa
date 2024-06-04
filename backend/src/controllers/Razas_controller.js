import RazasModels from "../models/Razas_models.js";

export const RegistrarRaza = async (req, res) => {
    try {
        const data = req.body;
        const docs = await RazasModels.create(data);
        res.status(201).json({ data: docs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const ListarRaza = async (req, res) => {
    try {
        const razas = await RazasModels.find({});
        if (razas.length === 0) {
            res.status(404).json({ error: 'No se encontraron razas' });
        } else {
            res.status(200).json(razas);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al listar razas: ' + error.message });
    }
}

export const EliminarRaza = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RazasModels.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Raza eliminada con éxito' });
        } else {
            res.status(404).json({ error: 'Raza no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const ActualizarRaza = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await RazasModels.findByIdAndUpdate(id, data, { new: true });
        if (result) {
            res.status(200).json({ data: result });
        } else {
            res.status(404).json({ error: 'Raza no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
