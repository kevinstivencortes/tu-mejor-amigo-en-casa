import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Listar_Component = () => {
    const [mascotas, setMascotas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token:  " +token);
        if (!token) {
            navigate('/');
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get("http://localhost:3000/mascota/Listarmascotas", config)
            .then(response => {
                setMascotas(response.data.result);
            })
            .catch(error => {
                console.error("Error al obtener la lista de mascotas:", error);
                setError("Error al obtener la lista de mascotas");
            });
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                await axios.delete(`http://localhost:3000/mascota/EliminarMascota/${id}`, config);
                const updatedMascotas = mascotas.filter(mascota => mascota._id !== id);
                setMascotas(updatedMascotas);
            } catch (error) {
                console.error("Error al eliminar la mascota:", error);
                setError("Error al eliminar la mascota");
            }
        }
    };

    return (
        <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
            <div className="flex absolute flex-row text-white top-10 gap-10">
                <p>Administrar Mascotas</p>
                <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-56 cursor-pointer"></Link>
            </div>
            <Link to='/AnadirMascotas' className="bg-[url('../../btn-add.svg')] w-[360px] h-[50px] flex absolute cursor-pointer top-32"></Link>
            {error && <p>{error}</p>}
            {mascotas.map((mascota, index) => (
                <div key={index} className={`flex absolute bg-gray-400 w-11/12 h-24 rounded-2xl ${index === 0 ? 'top-52' : index === 1 ? 'top-80' : index === 2 ? 'bottom-64' : index === 3 ? 'bottom-36' : 'bottom-8'} items-center hover:bg-gray-500`}>
                    <img src={mascota.imagenUrl} alt={mascota.imagenUrl} className="w-20 h-20 object-cover" />
                    <div className="flex absolute flex-col left-24">
                        <p className="text-sky-700 font-semibold">{mascota.nombre || 'Nombre no disponible'}</p>
                        <p className="text-sky-700">{mascota.raza?.nombre || 'Raza no disponible'}</p>
                    </div>
                    <Link to={`/ConsultarMascotas/${mascota._id}`} className="flex absolute bg-[url('../../btn-show.svg')] w-[34px] h-[34px] right-28 cursor-pointer"></Link>
                    <Link to={`/EditarMascotas/${mascota._id}`} className="flex absolute bg-[url('../../btn-edit.svg')] w-[34px] h-[34px] right-16 cursor-pointer"></Link>
                    <div className="flex absolute bg-[url('../../btn-delete.svg')] w-[34px] h-[34px] right-4 cursor-pointer" onClick={() => handleDelete(mascota._id)}></div>
                </div>
            ))}
        </div>
    );
}

export default Listar_Component;
