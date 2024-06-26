import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Listar_Component = () => {
    const [mascotas, setMascotas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token:  " + token);
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // función para contar las mascotas agrupadas por nombre y raza
    const contarMascotasAgrupadas = () => {
        const counts = {};
        mascotas.forEach(mascota => {
            const raza = mascota.raza?.nombre || 'Raza desconocida';
            counts[raza] = (counts[raza] || 0) + 1;
        });
        return counts;
    };


    // obtengo la lista de mascotas para listar las razas
    const mascotasAgrupadas = contarMascotasAgrupadas();

    return (
        <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
            <div className="flex absolute flex-row text-white top-10 gap-10">
                <p>Administrar Mascotas</p>
                <div 
                    onClick={handleLogout}
                    className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-56 cursor-pointer"
                ></div>
            </div>
            
            {/* cuadro para las mascotas agrupadas */}
            <div className="absolute bg-white rounded-lg p-2 shadow-lg top-52 left-[10px] w-[370px] z-10">
                {Object.keys(mascotasAgrupadas).length > 0 && (
                    <div>
                        {Object.keys(mascotasAgrupadas).map((key, index) => (
                            <p key={index}>{`${mascotasAgrupadas[key]} ${key}`}</p>
                        ))}
                    </div>
                )}
            </div>
            
            {/* lista de mascotas con scroll */}
            <div className="absolute w-[360px] top-[380px] h-[330px] overflow-y-auto z-0">
                {mascotas.map((mascota, index) => (
                    <div key={index} className="flex bg-gray-400 w-full h-24 rounded-2xl mb-4 items-center hover:bg-gray-500">
                        <img src={mascota.imagenUrl} alt={mascota.imagenUrl} className="w-20 h-20 object-cover" />
                        <div className="flex flex-col ml-4">
                            <p className="text-sky-700 font-semibold">{mascota.nombre || 'Nombre no disponible'}</p>
                            <p className="text-sky-700">{mascota.raza?.nombre || 'Raza no disponible'}</p>
                        </div>
                        <Link to={`/ConsultarMascotas/${mascota._id}`} className="bg-[url('../../btn-show.svg')] w-[34px] h-[34px] ml-auto cursor-pointer"></Link>
                        <Link to={`/EditarMascotas/${mascota._id}`} className="bg-[url('../../btn-edit.svg')] w-[34px] h-[34px] ml-2 cursor-pointer"></Link>
                        <div className="bg-[url('../../btn-delete.svg')] w-[34px] h-[34px] ml-2 cursor-pointer" onClick={() => handleDelete(mascota._id)}></div>
                    </div>
                ))}
            </div>
    
            {/* botón para añadir mascotas */}
            <Link to='/AnadirMascotas' className="bg-[url('../../btn-add.svg')] w-[360px] h-[50px] flex absolute cursor-pointer top-32"></Link>
    
            {/* mensajes de error */}
            {error && (
                <div className="absolute bg-white rounded-lg p-4 shadow-lg top-[620px] w-[360px]">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Listar_Component;
