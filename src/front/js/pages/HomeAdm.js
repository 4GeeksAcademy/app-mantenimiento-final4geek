import React, { useState } from "react";
import LogoHome from "../../img/logoapp.jpg";
import MenuHomeAdm from "../component/MenuAdm";

const HomeAdmin = () => {
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="container-fluid vh-100 d-flex flex-column p-0">
            <header className="row text-light navHome">
                <div className="col-2 d-flex align-items-center justify-content-center menuHome">
                    <button
                        className="btn botonMenu"
                        onClick={() => setShowMenu(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {showMenu && <MenuHomeAdm closeMenu={closeMenu} />}
                </div>
                <div className="col-10 d-flex align-items-center justify-content-center">
                    <h1 className="h5 m-0">Bienvenido &lt;NomUsuario&gt;</h1>
                </div>
            </header>

            <main className="row flex-grow-1 m-0">
                <div className="col-12 d-flex align-items-center justify-content-center backgroundHome">
                    <img src={LogoHome} alt="Logo aplicacion" className="img-fluid" />
                </div>
            </main>
        </div>
    );
};

export default HomeAdmin;
