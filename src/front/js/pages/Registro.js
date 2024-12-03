import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
   

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}>
                <div className="card-body rounded">
                    <h2 className="text-white text-center mb-3">Registro</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerNombre" className="form-label text-white">Nombre</label>
                                    <input type="text" className="form-control" id="registerNombre" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerApellido" className="form-label text-white">Apellido</label>
                                    <input type="text" className="form-control" id="registerApellido" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerEmail" className="form-label text-white">Email</label>
                                    <input type="email" className="form-control" id="registerEmail" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerCI" className="form-label text-white">Dirección</label>
                                    <input type="text" className="form-control" id="registerCI" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerPassword" className="form-label text-white">Contraseña</label>
                                    <input type="password" className="form-control" id="registerPassword" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerTelefono" className="form-label text-white">Teléfono</label>
                                    <input type="text" className="form-control" id="registerTelefono" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerCI" className="form-label text-white">CI/Rut</label>
                                    <input type="text" className="form-control" id="registerCI" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                    
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerCI" className="form-label text-white">Razón Social</label>
                                    <input type="text" className="form-control" id="registerCI" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mt-4">
                                <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#7ED957' }}>Confirmar Registro</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registro;