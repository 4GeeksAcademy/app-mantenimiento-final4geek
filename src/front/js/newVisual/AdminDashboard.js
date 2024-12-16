import React from "react";
import { Outlet, Link } from "react-router-dom";

import LeftPanelAdmin from "../../js/newVisual/LeftPanelAdmin";
import DashboardNavbar from "../../js/newVisual/DashboardNavBar";

const AdminDashboard = () => {
  return (
    <div className="container-fluid d-flex p-0 vh-100">

      {/* LEFT PANEL */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel" style={{width: "300px"}}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">Menú</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <LeftPanelAdmin />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="d-flex flex-column w-100" >
        <DashboardNavbar />

        <div className="p-3 p-md-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>      
    </div>
  );
};

export default AdminDashboard;