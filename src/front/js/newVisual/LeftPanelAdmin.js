import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LeftPanelClient() {

    return (
        <nav className="d-flex flex-column w-100 p-4 bg-white">
            <ul className="nav flex-column">
                <li className="nav-item"><NavLink to={"/registrar-vehiculo-admin"} >Registrar Vehículo</NavLink></li>
                <li className="nav-item"><NavLink to={"/agendar-servicio-admin"} >Agendar Servicio</NavLink></li>
                <li className="nav-item"><NavLink to={"/seguimiento"} >Seguimiento</NavLink></li>
                <li className="nav-item"><NavLink to={"/"} >Page3</NavLink></li>
                <li className="nav-item"><NavLink to={"/vender"} >Vendé tu Vehículo Ya!</NavLink></li>
               
            </ul>
        </nav>
    );
}