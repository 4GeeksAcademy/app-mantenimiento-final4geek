import React, { useContext, useState } from "react";
import Prueba from './AgendarServicio.js'
import { useNavigate } from "react-router-dom";




const MenuHome = ({ closeMenu }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        console.log("Forzando redirección y recarga...");
        window.location.href = "/";
        window.location.reload(); // Fuerza la recarga completa
    };
    
    
    
    return (
        <div
            className="d-flex flex-column text-light"
            style={{ width: "250px", height: "100vh", position: "absolute", top: 0, left: 0, backgroundColor: '#143E79' }}
        >
            <div className="d-flex align-items-center justify-content-start px-3 py-2">
                <button className="btn " onClick={() => {
                    closeMenu();
                }} >
                    <i className="fas fa-arrow-left text-success"></i>
                </button>
            </div>
            <ul className="list-unstyled text-center m-0">
                <li >
                    <button className="btn  w-100 botonMenu"
                        data-bs-toggle="modal"
                        data-bs-target="#modalPrueba"
                    >Agendar Servicio</button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu" >Seguimientos</button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu" >Vehículos Registrados</button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu" >Registrar Vehículo</button>
                </li>
            </ul>
            <div className="mt-auto text-center pb-3">
                <button style={{ backgroundColor: "red", color: "white", padding: "10px" }} onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>

            <Prueba isOpen={isModalOpen} onClose={handleCloseModal} />

        </div>
    );
};

export default MenuHome;
