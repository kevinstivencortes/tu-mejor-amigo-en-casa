import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

const Anadir_Component = () => {
    const history = useNavigate(); 
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [genero, setGenero] = useState("");
    const [raza, setRaza] = useState("");
    const [imagen, setImagen] = useState(null);
    const [message, setMessage] = useState("");
    const [razas, setRazas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchRazas = async () => {
            try {
                const response = await axios.get("http://localhost:3000/raza/ListarRaza");
                setRazas(response.data);
            } catch (error) {
                console.error("Error fetching razas:", error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categoria/ListarCategoria");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error fetching categorias:", error);
            }
        };

        const fetchGeneros = async () => {
            try {
                const response = await axios.get("http://localhost:3000/genero/Listargenero");
                setGeneros(response.data);
            } catch (error) {
                console.error("Error fetching generos:" + error);
            }
        };

        fetchRazas();
        fetchCategorias();
        fetchGeneros();
    }, []);

    const handleRegistro = async () => {
        // Verificar si algún campo está vacío
        if (!nombre || !categoria || !genero || !raza || !imagen) {
            alert("Los campos deben ser llenados de información. Por favor, llénelos de información para registrar tu mascota.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("categoria", categoria);
            formData.append("genero", genero);
            formData.append("raza", raza);
            formData.append("imagen", imagen);

            const token = localStorage.getItem("token"); // Obtener token de localStorage
            console.log("Token:", token);
            
            if (!token) {
                history.push('/'); // Redirige si no hay token
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post("http://localhost:3000/mascota/registrarMascotas", formData, config);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    return (
        <>
            <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/ListarMascotas' className="bg-[url('../../btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Adicionar Mascota</p>
                    <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <div className="bg-[url('../../photo-lg-0.svg')] w-[150px] h-[150px] flex absolute top-32"></div>
                {/* nombre */}
                <div className="flex items-center justify-center mt-48">
                    <div className="flex items-center justify-center">
                        <input type="text" className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                </div>
                {/* seleccione raza */}
                <div className="flex items-center justify-center mt-8">
                    <div className="cursor-pointer">
                        <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setRaza(e.target.value)} defaultValue="">
                            <option value="" disabled hidden>Seleccione Raza...</option>
                            {razas.map((raza) => (
                                <option key={raza._id} value={raza._id}>{raza.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* seleccione categoria */}
                <div className="flex items-center justify-center mt-8">
                    <div className=" cursor-pointer">
                        <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setCategoria(e.target.value)} defaultValue="">
                            <option value="" disabled hidden>Seleccione Categoría...</option>
                            {categorias.map((categoria) => (
                                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* seleccione foto */}
                <div className="flex items-center justify-center mt-8">
                    <div className=" w-[24px] h-[24px] flex cursor-pointer"></div>
                    <input type="file" className="w-[360px] pl-4 rounded-full outline-none h=[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Subir Foto" onChange={handleImageChange} />
                </div>
                {/* seleccione genero */}
                <div className="flex items-center justify-center mt-8">
                    <div className="bg-[url('../../arrows.svg')] w-[10px] h-[18px] flex justify-center cursor-pointer"></div>
                    <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setGenero(e.target.value)} defaultValue="">
                        <option value="" disabled hidden>Seleccione Género...</option>
                        {generos.map((genero) => (
                            <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleRegistro} className="w-[360px] h-[50px] flex absolute bottom-8 bg-[url('../../btn-save.svg')]"></button>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}

export default Anadir_Component;


