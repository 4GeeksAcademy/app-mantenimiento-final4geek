import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../styles/modal.css";

import LeftPanelClient from "../../js/newVisual/LeftPanelClient";
import DashboardNavbar from "../../js/newVisual/DashboardNavBar";

const ClientDashboard = () => {
    return (
        <div className="container-fluid d-flex p-0 vh-100">

            {/* LEFT PANEL */}
            <div className="offcanvas offcanvas-start " tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel" style={{ width: "300px" }}>

                <div className="offcanvas-header ">
                    <h5 className="offcanvas-title" id="offcanvasLabel" >Menú</h5>
                    <button type="button" className="btn-close btn-close-green" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body" >
                    <LeftPanelClient />
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="d-flex flex-column w-100" >

                {/* Navbar */}
                <DashboardNavbar />

                {/* Outlet */}
                <div className="p-3 p-md-4 overflow-y-scroll">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;