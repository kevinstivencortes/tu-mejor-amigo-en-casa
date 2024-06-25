import React from "react";
import { useNavigate } from "react-router-dom";

const Logout_Component = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
        </button>
    );
};

export default Logout_Component;
