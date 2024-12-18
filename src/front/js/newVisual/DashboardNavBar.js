import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


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
    <nav className="d-flex justify-content-center w-100 p-3 fw-medium" style={{ backgroundColor: '#312E2D' }}>
      <ul className="nav d-flex justify-content-between w-100 m-0 p-0">
        {/* Botón para el menú */}
        <li>
          <button className="btn btn-green fw-bold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <i className="fa-solid fa-bars"></i>
          </button>
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
