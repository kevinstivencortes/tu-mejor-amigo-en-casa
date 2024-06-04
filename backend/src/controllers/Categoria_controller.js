import CategoriaModels from "../models/Categoria_models.js";

export const RegistrarCategoria = async (req, res) => {
    try {
        const data = req.body;
        const docs = await CategoriaModels.create(data);
        res.send({ data: docs });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


export const ListarCategoria = async (req, res) => {
    try {
        const Categoria = await CategoriaModels.find({});
        res.send(Categoria);
    } catch (error) {
        res.status(500).send({ error: 'Error al listar Categoria' });
    }
}

export const EliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CategoriaModels.findByIdAndDelete(id);
        if (result) {
            res.send({ message: 'Categoría eliminada con éxito' });
        } else {
            res.status(404).send({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const ActualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await CategoriaModels.findByIdAndUpdate(id, data, { new: true });
        if (result) {
            res.send({ data: result });
        } else {
            res.status(404).send({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}