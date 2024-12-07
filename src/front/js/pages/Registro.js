import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";

const Registro = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        password: '',
        telefono: '',
        ci: '',
        razonSocial: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.registerUser(formData);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}>
                <div className="card-body rounded">
                    <h2 className="text-white text-center mb-3">Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="nombre" className="form-label text-white">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.nombre} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="apellido" className="form-label text-white">Apellido</label>
                                    <input type="text" className="form-control" id="apellido" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.apellido} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input type="email" className="form-control" id="email" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="direccion" className="form-label text-white">Dirección</label>
                                    <input type="text" className="form-control" id="direccion" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.direccion} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-white">Contraseña</label>
                                    <input type="password" className="form-control" id="password" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="telefono" className="form-label text-white">Teléfono</label>
                                    <input type="text" className="form-control" id="telefono" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.telefono} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="ci" className="form-label text-white">CI/Rut</label>
                                    <input type="text" className="form-control" id="ci" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.ci} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="razonSocial" className="form-label text-white">Razón Social</label>
                                    <input type="text" className="form-control" id="razonSocial" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.razonSocial} onChange={handleChange} />
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