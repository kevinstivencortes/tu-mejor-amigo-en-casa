import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Consultar_Component = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mascota, setMascota] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        
        if (!token) {
            navigate('/'); 
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(`http://localhost:3000/mascota/Listarmascotas/${id}`, config)
            .then(response => {
                setMascota(response.data.result);
            })
            .catch(error => {
                console.error("Error al obtener la mascota:", error);
            });
    }, [id, navigate]);

    if (!mascota) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/ListarMascotas' className="bg-[url('../../btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Consultar Mascota</p>
                    <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <img src={mascota.imagenUrl} alt={mascota.imagenUrl} className="w-[152px] h-[153px] flex absolute top-32" />

                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row absolute w-[350px] top-[350px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Nombre:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.nombre}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[320px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Raza:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.raza.nombre}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[254px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Categoría:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.categoria.nombre}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[188px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Género:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.genero.nombre}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Consultar_Component;
