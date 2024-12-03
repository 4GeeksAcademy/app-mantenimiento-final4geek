import React, { useState } from "react";
import logoapp from "../../img/logoapp.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from "./Registro";
import "../../styles/Login.css"

const Login = () => {
    const [showRegistro, setShowRegistro] = useState(false);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            {showRegistro ? (
                <Registro />
            ) : (
                <div className="card p-4" style={{ maxWidth: '1130px', width: '100%', height: '777px', backgroundColor: '#312E2D' }}>
                    <div className="card-body text-white text-center mb-3 ">
                        <img src={logoapp} alt="logo" className="mb-3 img-fluid" style={{ width: '329px', height: '329px' }} />
                        <form className="d-flex flex-column align-items-center">
                            <div className="mb-3 text-start" style={{ maxWidth: '417px', width: '100%' }}>
                                <label htmlFor="exampleInputEmail1" className="form-label text-white ">Usuario</label>
                                <input type="email" className="form-control custom-input mb-3" id="exampleInputEmail1" style={{ backgroundColor: '#737373', height: '40px' }} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 text-start" style={{ maxWidth: '417px', width: '100%' }}>
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Contraseña</label>
                                <input type="password" className="form-control custom-input mb-3" id="exampleInputPassword1" style={{ backgroundColor: '#737373', height: '40px' }} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn fw-bold" style={{
                                    backgroundColor: '#7ED957',
                                    color: '#312E2D',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    marginRight: '10px'
                                }}>
                                    Iniciar Sesión
                                </button>
                                <button type="button" className="btn fw-bold" style={{
                                    backgroundColor: '#7ED957',
                                    color: '#312E2D',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    marginRight: '10px'
                                }} onClick={() => setShowRegistro(true)}>
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;