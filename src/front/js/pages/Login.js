import React, { useState, useContext } from "react";
import logoapp from "../../img/logoapp.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from "./Registro";
import "../../styles/Login.css"
import BackgroundAnimated from "../component/Backgroundanimated";
import { Context } from "../store/appContext";

const Login = () => {
    const {actions} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistro, setShowRegistro] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.loginUser(email, password);
    };
    

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           {/* <BackgroundAnimated/> */}
            {showRegistro ? (
                <Registro />
            ) : (
                <div className="card p-4" style={{ maxWidth: '1130px', width: '100%', height: '777px', backgroundColor: '#312E2D' }}>
                    <div className="card-body text-white text-center mb-3 ">
                        <img src={logoapp} alt="logo" className="mb-3 img-fluid" style={{ width: '329px', height: '329px' }} />
                        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                            <div className="mb-3 text-start" style={{ maxWidth: '417px', width: '100%' }}>
                                <label htmlFor="exampleInputEmail1" className="form-label text-white ">Usuario</label>
                                <input type="email" className="form-control custom-input mb-3" id="exampleInputEmail1" style={{ backgroundColor: '#737373', height: '40px' }} aria-describedby="emailHelp" value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3 text-start" style={{ maxWidth: '417px', width: '100%' }}>
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Contraseña</label>
                                <input type="password" className="form-control custom-input mb-3" id="exampleInputPassword1" style={{ backgroundColor: '#737373', height: '40px' }} value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
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