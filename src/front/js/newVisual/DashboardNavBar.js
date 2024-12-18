import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import logoapp from "../../img/logoapp.jpg";


const DashboardNavbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();




  const handleLogout = async () => {
    const result = await actions.logoutUser();
    if (result.success) {
      navigate('/');
    } else {
      alert("Error al cerrar sesión: " + result.error);
    }
  };

  return (
    <nav className="d-flex justify-content-center align-items-center w-100 p-3 fw-medium colorFondo">
      <ul className="nav d-flex justify-content-between  align-items-center w-100 m-0 p-0">
        {/* Botón para el menú */}
        <li>
          <button className="btn btn-green fw-bold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <i className="fa-solid fa-bars"></i>
          </button>
          <img src={logoapp} alt="logo" className="m-0 p-0 img-fluid" style={{ maxwidth: '80px', height: '80px' }} />
        </li>
          {/* Título centrado */}
        <li className="flex-grow-1 text-center">
          <h2 className="title m-0 p-0 text-truncate">¡Bienvenid@!</h2>
        </li>
        {/* Links del Navbar */}
        <div className="d-flex">
          <li className="nav-item m-0 p-0">
            <Link className="nav-link text-white cerrarSesion" to="/" onClick={handleLogout}>
              <span className='cerrarSesion'>Cerrar sesion <i className="fa-solid fa-right-from-bracket "></i></span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
