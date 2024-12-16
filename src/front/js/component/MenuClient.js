import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.js";




const MenuHome = ({ closeMenu }) => {



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
                    <button
                        className="btn w-100 botonMenu"
                        onClick={() => navigate("/seguimientos")}>
                        Seguimientos
                    </button>
                </li>
                
            </ul>
            <div className="mt-auto text-center pb-3">
                <LogoutButton onBeforeLogout={closeMenu} />

            </div>
        </div>
    );
};

export default MenuHome;
