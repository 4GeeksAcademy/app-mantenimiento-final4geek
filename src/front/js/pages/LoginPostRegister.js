import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginPostRegister = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await actions.loginUser(formData.email, formData.password);
        if (response.success) {
            const { user_type } = response.data;
            if (user_type === "client") {
                navigate("/cliente-dashboard");
            } else {
                navigate("/admin-dashboard");
            }
        } else {
            setErrorMessage('Credenciales incorrectas, vuelve a intentarlo');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}>
                <div className="card-body rounded">
                    <h2 className="text-white text-center mb-3">Inicio de Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label text-white">Email</label>
                            <input type="email" className="form-control" id="email" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label text-white">Contraseña</label>
                            <input type="password" className="form-control" id="password" style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                value={formData.password} onChange={handleChange} />
                        </div>
                        {errorMessage && <div className="mb-3 text-danger">{errorMessage}</div>}
                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#7ED957' }}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPostRegister;
