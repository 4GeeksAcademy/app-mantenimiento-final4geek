import React from "react";
import LogoHome from "../../img/logoApp.jpg";


const HomeClient = () => {
    return (
        <div className="container-fluid vh-100 d-flex flex-column p-0">

            {/* Contenido principal */}
            <main className="row flex-grow-1 m-0">
                <div className="col-12 d-flex align-items-center justify-content-center backgroundHome">
                    <img src={LogoHome} alt="Logo de la aplicación" className="img-fluid" />
                </div>
            </main>
        </div>
    );
};

export default HomeClient;
