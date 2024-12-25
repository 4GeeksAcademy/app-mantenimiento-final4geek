import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Login from "./pages/LoginPrincipal";
import Registro from "./component/Registro";


import injectContext from "./store/appContext";

import BackgroundAnimated from "./component/Backgroundanimated";
import RegistrarVehiculoVehicle from "./component/RegistrarVehiculo";

import ClientDashboard from "./newVisual/ClientDashboard";
import { Context } from "../js/store/appContext";
import AdminDashboard from "./newVisual/AdminDashboard";
import RegistrarVehiculo from "./component/RegistrarVehiculo";

import HomeAdm from "./pages/HomeAdm"
import LoginPostRegister from "./pages/LoginPostRegister";
import Vender from "./pages/Vender";
import AgendarServicio from "./component/AgendarServicio";
import VehiculosRegistrados from "./component/VehiculosRegistrados";
import RegistrarVehiculoAdmin from "./component/RegistrarVehiculoAdmin";
import AgendarServicioAdmin from "./component/AgendarServicioAdmin";
import ClienteSeguimientos from "./component/ClienteSeguimientos";
import ClienteVehiculos from "./component/ClienteVehiculos";
import AdminSeguimientos from "./component/AdminSeguimientos";
import AdminVehiculos from "./component/AdminVehiculos";


//create your first component
const Layout = () => {
  const { store } = useContext(Context);

  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <BackgroundAnimated />
          <Routes>
            {
              !store.token ?
                <>
                  <Route element={<Login />} path="/" />
                  <Route element={<Registro />} path="/registro" />
                  <Route element={<LoginPostRegister />} path= "loginpostregister" />
                  <Route element={<Navigate to="/" replace />} path="*" />
                  
                </> :
                store.userType === "client" ?
                  <Route element={<ClientDashboard />} >
                    <Route element={<RegistrarVehiculoVehicle />} path="/registrar-vehiculo" />
                    <Route element={<AgendarServicio />} path="agendar-servicio" />
                    <Route element={<ClienteSeguimientos />} path="seguimiento-servicios" />
                   <Route element={<ClienteVehiculos />} path="vehiculos-registrados" />
                    <Route element={<Vender />} path="/vender" />
                    <Route element={<h1></h1>} path="*" />
                  </Route> :
                  <Route element={<AdminDashboard />} >
                    <Route element={<RegistrarVehiculoAdmin />} path="/registrar-vehiculo-admin" />
                    <Route element={<AgendarServicioAdmin />} path="/agendar-servicio-admin" />
                    <Route element={<AdminSeguimientos />} path="seguimiento-servicios" />
                    <Route element={<AdminVehiculos />} path="vehiculos-registrados" />

                   
                    <Route element={<h1></h1>} path="*" />

                  </Route>
            }
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);