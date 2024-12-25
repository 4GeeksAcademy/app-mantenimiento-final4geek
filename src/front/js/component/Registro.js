import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        ci_rut: ''
    });
    const [showRedirectButton, setShowRedirectButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData); 
        const result = await actions.registerUser(formData);
        console.log("Resultado del registro:", result);
        if (result.success) {
            setShowRedirectButton(true);
            setErrorMessage(''); // limpia mensaje letras rojas
        } else {
            setErrorMessage(result.error || 'Error en el registro');
        }
    };

    const handleRedirect = () => {
        navigate("/loginpostregister");
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
                                    <label htmlFor="first_name" className="form-label text-white">Nombre</label>
                                    <input type="text" className="form-control" id="first_name" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.first_name} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="last_name" className="form-label text-white">Apellido</label>
                                    <input type="text" className="form-control" id="last_name" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.last_name} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input type="email" className="form-control" id="email" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="ci_rut" className="form-label text-white">Dirección</label>
                                    <input type="text" className="form-control" id="ci_rut" style={{ backgroundColor: '#FFFFFF', height: '40px' }}></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-white">Contraseña</label>
                                    <input type="password" className="form-control" id="password" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="phone" className="form-label text-white">Teléfono</label>
                                    <input type="text" className="form-control" id="phone" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="ci_rut" className="form-label text-white">CI/Rut</label>
                                    <input type="text" className="form-control" id="ci_rut" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                        value={formData.ci_rut} onChange={handleChange} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="ci_rut" className="form-label text-white">Razón Social</label>
                                    <input type="text" className="form-control" id="ci_rut" style={{ backgroundColor: '#FFFFFF', height: '40px' }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mt-4">
                                <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#7ED957' }}>Confirmar Registro</button>
                            </div>
                        </div>
                    </form>
                    {errorMessage && (
                        <div className="row mt-4">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            </div>
                        </div>
                    )}
                    {showRedirectButton && (
                        <div className="row mt-4">
                            <div className="col-md-12 d-flex justify-content-center">
                                <button onClick={handleRedirect} className="btn fw-bold" style={{ backgroundColor: '#7ED957' }}>Ir a la página de inicio</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Registro;

