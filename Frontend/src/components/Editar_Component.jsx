import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editar_Component = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mascota, setMascota] = useState({
        nombre: '',
        raza: '',
        categoria: '',
        imagenUrl: '',
        genero: ''
    });
    const [razas, setRazas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [previewImagen, setPreviewImagen] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            try {
                const [razaRes, categoriaRes, generoRes, mascotaRes] = await Promise.all([
                    axios.get("http://localhost:3000/raza/ListarRaza"),
                    axios.get("http://localhost:3000/categoria/ListarCategoria"),
                    axios.get("http://localhost:3000/genero/Listargenero"),
                    axios.get(`http://localhost:3000/mascota/Listarmascotas/${id}`, config)
                ]);

                setRazas(razaRes.data);
                setCategorias(categoriaRes.data);
                setGeneros(generoRes.data);
                setMascota({
                    nombre: mascotaRes.data.result.nombre,
                    raza: mascotaRes.data.result.raza._id,
                    categoria: mascotaRes.data.result.categoria._id,
                    imagenUrl: mascotaRes.data.result.imagen,
                    genero: mascotaRes.data.result.genero._id
                });
                setPreviewImagen(mascotaRes.data.result.imagen);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                if (error.response) {
                    console.error("Datos del error de respuesta:", error.response.data);
                }
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMascota({ ...mascota, [name]: value });
    };

    const handleImageChange = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const previewUrl = URL.createObjectURL(archivo);
            setMascota({ ...mascota, imagenUrl: archivo });
            setPreviewImagen(previewUrl);
        } else {
            setPreviewImagen(null);
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const formData = new FormData();
        formData.append("nombre", mascota.nombre);
        formData.append("categoria", mascota.categoria);
        formData.append("genero", mascota.genero);
        formData.append("raza", mascota.raza);

        if (mascota.imagenUrl) {
            formData.append("imagen", mascota.imagenUrl);
        }

        console.log("Datos enviados:", {
            nombre: mascota.nombre,
            categoria: mascota.categoria,
            genero: mascota.genero,
            raza: mascota.raza,
            imagenUrl: mascota.imagenUrl
        });

        try {
            await axios.put(`http://localhost:3000/mascota/ActualizarMascota/${id}`, formData, config);
            alert("Mascota actualizada correctamente");
            navigate('/ListarMascotas');
        } catch (error) {
            console.error("Error al actualizar la mascota:", error);
            if (error.response) {
                console.error("Datos del error de respuesta:", error.response.data);
                setError(error.response.data.message);
            }
            alert("Error al actualizar la mascota");
        }
    };

    return (
        <>
            <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/ListarMascotas' className="bg-[url('../../btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Modificar Mascota</p>
                    <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                {/* imagen */}
                <div className="w-[150px] h-[150px] flex absolute top-32">
                    <div className={`w-full h-full rounded-full ${previewImagen ? '' : 'bg-[url("../../foto-perfil.svg")] bg-cover'}`}>
                        {previewImagen && (
                            <img src={previewImagen} alt="Preview" className="rounded-full w-full h-full" />
                        )}
                    </div>
                </div>
                {/* mascota nombre */}
                <div className="flex items-center justify-center mt-48">
                    <div className="flex items-center justify-center">
                        <input type="text" name="nombre" value={mascota.nombre} onChange={handleChange} className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Nombre" />
                    </div>
                </div>
                {/* raza */}
                <div className="flex items-center justify-center mt-8">
                    <div className="cursor-pointer">
                        <select name="raza" value={mascota.raza} onChange={handleChange} className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200">
                            <option value="" disabled hidden>Seleccione Raza...</option>
                            {razas.map((raza) => (
                                <option key={raza._id} value={raza._id}>{raza.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* categoria */}
                <div className="flex items-center justify-center mt-8">
                    <div className="cursor-pointer">
                        <select name="categoria" value={mascota.categoria} onChange={handleChange} className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200">
                            <option value="" disabled hidden>Seleccione Categoría...</option>
                            {categorias.map((categoria) => (
                                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* imagen */}
                <div className="flex items-center justify-center mt-8">
                    <div className=" w-[24px] h-[24px] flex cursor-pointer"></div>
                    <input type="file" onChange={handleImageChange} className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Subir Foto" />
                </div>
                {/* genero */}
                <div className="flex items-center justify-center mt-8">
                    <div className="bg-[url('../../arrows.svg')] w-[10px] h=[18px] flex justify-center cursor-pointer"></div>
                    <select name="genero" value={mascota.genero} onChange={handleChange} className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200">
                        <option value="" disabled hidden>Seleccione Género...</option>
                        {generos.map((genero) => (
                            <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                        ))}
                    </select>
                </div>
                {/* actualizar */}
                {error && <div className="text-red-500">{error}</div>}
                <button onClick={handleUpdate} className="w-[360px] h-[50px] flex absolute bottom-8 bg-[url('../../btn-save.svg')]"></button>
            </div>
        </>
    );
}

export default Editar_Component;
