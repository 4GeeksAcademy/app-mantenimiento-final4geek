import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Login from "./pages/LoginPrincipal";
import  Registro from "./pages/Registro";
import { Single } from "./pages/single";
import ModalTesting from "./pages/modalTesting";
import injectContext from "./store/appContext";
import ModalSeguimientos from "./pages/SeguiAdmin";


import { Footer } from "./component/footer";
import ScheduleVehicle from "./pages/ScheduleVehicle";

import AdminAgendarServicio from "./pages/admin_ingreso_servicios";


import HomeClient from "./component/HomeClient";
import BackgroundAnimated from "./component/Backgroundanimated";
import Vehicle from "./pages/Vehicle";

import HomeAdm from "./component/HomeAdm"
import LoginPostRegister from "./pages/LoginPostRegister";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>                   
                    <BackgroundAnimated />

                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<LoginPostRegister />} path="/loginpostregister" />
                        <Route element={<HomeClient />} path="/homeClient"></Route>
                        <Route element={<ScheduleVehicle />} path="/ScheduleVehicle" />
                        <Route element={<AdminAgendarServicio />} path="/AdminAgendarServicio" />
                        <Route element={<HomeAdm />} path="/HomeAdmin" />
                        <Route element={<ModalSeguimientos />} path="/seguiadmin" />
                        <Route element={<ModalTesting />} path="/modaltesting" />
                        <Route element={<Vehicle/>} path="/vehicle"/>

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
