import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login_Component = () => {
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contrasenia })
        });
    
        const data = await response.json();
    
        if (response.ok) {
            localStorage.setItem('token', data.token);
            console.log("Token recibido del backend:", data.token); 
            if (correo === "admin@gmail.com") {
                alert(`Bienvenido administrador: ${correo}`);
            }
            navigate('/ListarMascotas');
        } else {
            alert(data.message);
        }
    };
    
    return (
        <div className="flex relative bg-[url('../../bg-login.svg')] w-[400px] h-[785px] justify-center items-center">
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                <input
                    type="text"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-44 placeholder:text-sky-800 hover:bg-slate-200"
                    placeholder="Correo Electrónico"
                />
                <input
                    type="password"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-28 placeholder:text-sky-800 hover:bg-slate-200"
                    placeholder="Contraseña"
                />
                <button
                    type="submit"
                    className="absolute flex items-center justify-center w-11/12 pl-4 text-gray-300 bg-blue-900 rounded-full h-11 bottom-9"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login_Component;
