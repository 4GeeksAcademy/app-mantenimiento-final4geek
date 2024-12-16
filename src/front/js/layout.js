import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Login from "./pages/LoginPrincipal";
import Registro from "./component/Registro";

import SeguimientoClient from "./component/SeguimientoClient";
import injectContext from "./store/appContext";

import BackgroundAnimated from "./component/Backgroundanimated";
import Vehicle from "./component/Vehicle";

import ClientDashboard from "./newVisual/ClientDashboard";
import { Context } from "../js/store/appContext";
import AdminDashboard from "./newVisual/AdminDashboard";

import HomeAdm from "./pages/HomeAdm"
import LoginPostRegister from "./pages/LoginPostRegister";
import Vender from "./pages/Vender";

//create your first component
const Layout = () => {
  const { store } = useContext(Context);

  const basename = process.env.BASENAME || "";
  console.log("Token:", store.token);
  console.log("User Type:", store.userType);
  
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
              <Route element={<Navigate to="/" replace />} path="*" />
            </> :
            store.userType === "client" ?
           
            <Route element={<ClientDashboard />} >
              <Route element={<Vehicle />} path="/registrar-vehiculo" />
              <Route element={<SeguimientoClient />} path="/seguimiento" />
              <Route element={<Vender />} path="/vender" />
              <Route element={<h1>No encontrado</h1>} path="*" />


            </Route> :
            <Route element={<AdminDashboard />} >
              <Route element={<Vehicle />} path="/registrar-vehiculo" />


              <Route element={<h1>No encontrado</h1>} path="*" />
                <>
                  <Route element={<Login />} path="/" />
                  <Route element={<Registro />} path="/registro" />
                  <Route element={<LoginPostRegister />} path= "loginpostregister" />
                  <Route element={<Navigate to="/" replace />} path="*" />
                </> :
                store.userType === "client" ?
                  <Route element={<ClientDashboard />} >
                    <Route element={<Vehicle />} path="/registrar-vehiculo" />
                    <Route element={<AgendarServicio />} path="agendar-servicio" />
                    <Route element={<VehiculosRegistrados />} path="/vehiculos-registrados" />
                    <Route element={<h1>No encontrado</h1>} path="*" />
                  </Route> :
                  <Route element={<AdminDashboard />} >
                    <Route element={<Vehicle />} path="/registrar-vehiculo" />
                    <Route element={<VenderVehiculo />} path="/vender-vehiculo" />
                    <Route element={<h1>No encontrado</h1>} path="*" />

            </Route>
            }
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);