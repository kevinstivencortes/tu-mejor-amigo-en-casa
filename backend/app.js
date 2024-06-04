import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import RazaMongo from './src/routers/Razas_router.js';
import usuarioMongo from './src/routers/usuarios_router.js';
import CategoriaMongo from './src/routers/Categoria_router.js';
import generoMongo from './src/routers/Genero_router.js';
import mascotasMongo from './src/routers/Mascotas_router.js';

import Login from './src/controllers/Login.js'; 

import ConexionMongo from './src/databases/conexion_mongo.js';

const servidor = express();

// middleware
servidor.use(cors());
servidor.use(bodyParser.json({ limit: '20mb' }));
servidor.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

const port = 3000;

// conectar a la base de datos
ConexionMongo();

/* imagen */
servidor.use(express.static('public'));

/* documentacion */
servidor.use('/document', (req, res) => {
    res.render('documentacion.ejs')
})

// rutas
servidor.use("/raza", RazaMongo);
servidor.use("/usuario", usuarioMongo);
servidor.use("/categoria", CategoriaMongo);
servidor.use("/genero", generoMongo);
servidor.use("/mascota", mascotasMongo);
servidor.post("/Login", Login);

servidor.listen(port, () => {
    console.log('La aplicación está en línea');
});
