import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";  // Para poder usar la navegación
import ModalVehiculos from "./modalVehiculos";

const Vehicle = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        license_plate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (data) => {
        // Validación simple de campos
        if (!data.brand || !data.model || !data.year || !data.mileage || !data.license_plate) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const result = await actions.createVehicle(data);
        if (result) {
            navigate("/ScheduleVehicle");
        } else {
            alert("¡Ups! Algo salió mal. Vuelve a intentarlo.");
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            {/* <BackgroundAnimated/> */}

            <div
                className="card p-4"
                style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}
            >
                <div className="card-body">
                    <h2 className="text-white text-center mb-3">Registrar Vehículo</h2>
                    <form>
                        <div className="row">
                            {/* Columna Izquierda */}
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerNombre" className="form-label text-white">
                                        Marca
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brand" // Se cambia por que el endpoint pide id
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerApellido" className="form-label text-white">
                                        Modelo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="model" //idem arriba 
                                        name="model"
                                        value={formData?.model}
                                        onChange={handleChange}
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registeryear" className="form-label text-white">
                                        Año
                                    </label>
                                    <input
                                        type="number"// Se cambia a número no es year
                                        className="form-control"
                                        id="year"
                                        name="year"
                                        value={formData?.year}
                                        onChange={handleChange}
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                            </div>
                            {/* Columna Derecha */}
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registermileage" className="form-label text-white">
                                        Kilómetros
                                    </label>
                                    <input
                                        type="number"// no hay type kilometraje en html
                                        className="form-control"
                                        id="mileage"
                                        name="mileage"
                                        value={formData?.mileage}
                                        onChange={handleChange}
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerlicenseplate" className="form-label text-white">
                                        Matrícula
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerlicenseplate"
                                        name="license_plate"
                                        value={formData?.license_plate}
                                        onChange={handleChange}
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mt-4">
                                <button
                                    type="button"
                                    className="btn fw-bold"
                                    onClick={() => { handleRegistration(formData) }}
                                    style={{ backgroundColor: '#7ED957' }}
                                >
                                    Confirmar Registro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;