import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.js";
import AdminAgendarServicio from "../pages/admin_ingreso_servicios.js";
import ModalSeguimientoAdmin from "./ModalSeguiAdmin.js";
import ModalVehicleAdmin from "./ModalVehicleadmin.js";
import ModalRegVehiculo from "../pages/modalVehiculeRegister.js";

const MenuHomeAdm = ({ closeMenu }) => {
    const [isAgendarServicioOpen, setIsAgendarServicioOpen] = useState(false);
    const [isSeguimientoOpen, setIsSeguimientoOpen] = useState(false);
    const [isVehicleAdminOpen, setIsVehicleAdminOpen] = useState(false);
    const [isRegVehiculoOpen, setIsRegVehiculoOpen] = useState(false);
    const navigate = useNavigate();

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
                <button className="btn" onClick={closeMenu}>
                    <i className="fas fa-arrow-left text-success"></i>
                </button>
            </div>
            <ul className="list-unstyled text-center m-0">
                <li>
                    <button className="btn w-100 botonMenu" onClick={() => setIsAgendarServicioOpen(true)}>
                        Agendar Servicio
                    </button>
                </li>
                <li>
                    <button className="btn w-100 botonMenu" onClick={() => setIsSeguimientoOpen(true)}>
                        Seguimientos
                    </button>
                </li>
                <li>
                    <button className="btn w-100 botonMenu" onClick={() => setIsVehicleAdminOpen(true)}>
                        Vehículos Registrados
                    </button>
                </li>
                <li>
                    <button className="btn w-100 botonMenu" onClick={() => setIsRegVehiculoOpen(true)}>
                        Registrar Vehículo
                    </button>
                </li>
            </ul>
            <div className="mt-auto text-center pb-3">
                <LogoutButton onBeforeLogout={closeMenu} />
            </div>

            <AdminAgendarServicio isOpen={isAgendarServicioOpen} onClose={() => setIsAgendarServicioOpen(false)} />
            <ModalSeguimientoAdmin isOpen={isSeguimientoOpen} onClose={() => setIsSeguimientoOpen(false)} />
            <ModalVehicleAdmin isOpen={isVehicleAdminOpen} onClose={() => setIsVehicleAdminOpen(false)} />
            <ModalRegVehiculo isOpen={isRegVehiculoOpen} onClose={() => setIsRegVehiculoOpen(false)} />
        </div>
    );
};

export default MenuHomeAdm;