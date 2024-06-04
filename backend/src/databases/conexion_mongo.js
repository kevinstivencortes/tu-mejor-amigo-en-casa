import mongoose from 'mongoose';

const DB_URI = `mongodb://127.0.0.1:27017/taller_ea1`;

const ConexionMongo = () => {
    mongoose.connect(
        DB_URI
    );
    console.log('conectado a la base de datos')
};

export default ConexionMongo;
