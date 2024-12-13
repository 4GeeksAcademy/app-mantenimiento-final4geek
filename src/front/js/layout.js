import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Footer } from "./component/footer";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ModalSeguimientosPag from "./pages/modalSeguimientosCliente";
import ModalVehiculosPag from "./pages/modalVehiculosCliente";
import injectContext from "./store/appContext";
import ModalSeguimientos from "./pages/SeguiAdmin";
import ScheduleVehicle from "./pages/ScheduleVehicle";
import AdminAgendarServicio from "./pages/admin_ingreso_servicios";
import HomeClient from "./pages/HomeClient";
import BackgroundAnimated from "./component/Backgroundanimated";
import Vehicle from "./pages/Vehicle";
import HomeAdm from "./pages/HomeAdm"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <BackgroundAnimated />
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<HomeClient />} path="/homeclient" />
                        <Route element={<HomeAdm />} path="/homeadmin" />
                        <Route element={<ScheduleVehicle />} path="/schedulecehicle" />
                        <Route element={<AdminAgendarServicio />} path="/adminagendarservicio" />
                        <Route element={<ModalSeguimientos />} path="/seguiadmin" />
                        <Route element={<ModalSeguimientosPag />} path="/modalseguimientoscliente" />
                        <Route element={<ModalVehiculosPag />} path="/modalvehiculoscliente" />
                        <Route element={<Vehicle />} path="/vehicle" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
