import React, { useContext, useState,useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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
        if (!data.brand || !data.model || !data.year || !data.mileage || !data.license_plate) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        if (data.year <= 0 || data.mileage < 0) {
            alert("Año y kilómetros deben ser valores positivos.");
            return;
        }

        const result = await actions.createVehicle(data);
        if (result) {
            navigate("/homeClient");
        } else {
            alert("¡Ups! Algo salió mal. Vuelve a intentarlo.");
        }
    };

    useEffect(() => {
        const modal = new window.bootstrap.Modal(document.getElementById('modalVehicle'));
        modal.show();
    }, []);

    return (
        <div className="modal fade" id="modalVehicle" tabIndex="-1" aria-labelledby="modalVehicleLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="modalVehicleLabel">Registrar vehiculo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="brand" className="form-label text-dark">Marca</label>
                                        <input type="text" className="form-control" id="brand" name="brand" value={formData.brand} onChange={handleChange} style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="model" className="form-label text-dark">Modelo</label>
                                        <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="year" className="form-label text-dark">Año</label>
                                        <input type="number" className="form-control" id="year" name="year" value={formData.year} onChange={handleChange} style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="mileage" className="form-label text-dark">Kilómetros</label>
                                        <input type="number" className="form-control" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="license_plate" className="form-label text-dark">Matrícula</label>
                                        <input type="text" className="form-control" id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center mt-4">
                                    <button type="button" className="btn fw-bold"
                                        data-bs-dismiss="modal"
                                        onClick={() => handleRegistration(formData)}
                                        style={{ backgroundColor: '#7ED957' }}>
                                        Confirmar Registro
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;
