import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LeftPanelClient() {

    return (
        <nav className="d-flex flex-column w-100 p-4">
            <ul className="nav flex-column">
                <li className="nav-item"><NavLink to={"/registrar-vehiculo"} >Registrar Vehículo</NavLink></li>
                <li className="nav-item"><NavLink to={"/agendar-servicio"} >Agendar Servicio</NavLink></li>
                <li className="nav-item"><NavLink to={"/seguimiento"} >Vehiculos Registrados</NavLink></li>
                <li className="nav-item"><NavLink to={"/"} >Seguimiento de Servicios</NavLink></li>
                <li className="nav-item"><NavLink to={"/vender"} style={({ isActive }) => ({
    color: isActive ? "red" : "white",
    fontWeight: isActive ? "bold" : "normal"
})}>
    Vendé tu auto Ya!
</NavLink>
</li>
               
            </ul>
        </nav>
    );
}