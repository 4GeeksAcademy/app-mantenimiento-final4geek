import React from "react";

const MenuHomeAdm = ({ closeMenu }) => {

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
                    <button className="btn  w-100 botonMenu" >Agendar Servicio</button>
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
                <button className="btn btn-danger w-75">Cerrar sesión</button>
            </div>
        </div>
    );
};

export default MenuHomeAdm;