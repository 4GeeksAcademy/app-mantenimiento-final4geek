import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onBeforeLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if (onBeforeLogout) {
            onBeforeLogout();
        }
        const token = localStorage.getItem("token");
        console.log("Token a eliminar:", token);
        localStorage.removeItem("token");
        navigate("/loginprincipal");
        console.log("Navegación a loginprincipal");
    };
    return (
        <button className="btn btn-danger w-75" onClick={handleLogout}>
            Cerrar sesión
        </button>
    );
};
export default LogoutButton;