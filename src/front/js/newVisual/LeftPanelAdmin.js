import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LeftPanelClient() {

    return (
        <nav className="d-flex flex-column w-100 p-4 " style={{ backgroundColor: '#004AAD' }}>
            <ul className="nav flex-column">
                <li className="nav-item enlaceAdmin"><NavLink to={"/registrar-vehiculo-admin"} >Registrar Vehículo</NavLink></li>
                <li className="nav-item enlaceAdmin"><NavLink to={"/agendar-servicio-admin"} >Agendar Servicio</NavLink></li>
                <li className="nav-item enlaceAdmin"><NavLink to={"/seguimiento-servicios"} >Seguimiento de Servicios</NavLink></li>
                <li className="nav-item enlaceAdmin"><NavLink to={"/vehiculos-registrados"} >Vehiculos Registrados</NavLink></li>               
            </ul>
        </nav>
    );
}