import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.js";
import AgendarServicio from "./AgendarServicio.js";
import ModalSeguimientos from "./modalSeguimientos.js";
import RegistrarVehiculo from "./Vehicle.js"
import VehiculosRegistrados from "./modalVehiculos.js"



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
                        data-bs-target="#modalVehicle"
                    >Registrar Vehículo
                    </button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAgendarServicio"
                    >
                        Agendar Servicio
                    </button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu"
                        data-bs-toggle="modal"
                        data-bs-target="#modalVehiculos"
                    >Vehículos Registrados
                    </button>
                </li>
                <li >
                    <button className="btn w-100 botonMenu"
                        data-bs-toggle="modal"
                        data-bs-target="#modalSeguimientos"
                    >
                        Seguimientos
                    </button>
                </li>
            </ul>
            <div className="mt-auto text-center pb-3">
                <LogoutButton onBeforeLogout={closeMenu} />

            </div>
            <AgendarServicio isOpen={isModalOpen} onClose={handleCloseModal} />
            <ModalSeguimientos isOpen={isModalOpen} onClose={handleCloseModal} />
            <RegistrarVehiculo isOpen={isModalOpen} onClose={handleCloseModal} />
            <VehiculosRegistrados isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default MenuHome;
