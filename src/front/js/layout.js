import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Login from "./pages/Login";
import  Registro from "./pages/Registro";
import { Single } from "./pages/single";
import ModalTesting from "./pages/modalTesting";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import ScheduleVehicle from "./pages/ScheduleVehicle";

import Vehicle from "./pages/Vehicle";


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
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<Single />} path="/single/:theid" />

                        <Route element={<ScheduleVehicle />} path="/ScheduleVehicle" />


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
