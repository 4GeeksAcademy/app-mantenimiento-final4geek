import React from "react";
import { Link } from "react-router-dom";

export default function DashboardNavbar() {

    return (
        <nav className="d-flex justify-content-center w-100 bg-white p-3 fw-medium">
            <ul className="nav d-flex justify-content-between w-100 m-0 p-0">
                {/* Botón para el menú */}
                <li>
                    <button className="btn btn-green" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                        Menú
                    </button>
                </li>

                {/* Links del Navbar */}
                <div className="d-flex">
                    <li className="nav-item m-0 p-0">
                        <Link className="nav-link" to={"/"} >Logout</Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}