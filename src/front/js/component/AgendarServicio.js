import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AgendarServicio = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicle_id: "",
    });

    useEffect(() => {
        actions.getVehicles(); // Fetch vehiculo de usuario logueado
        console.log('Vehicles fetched:', store.vehicles);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSchedule = async (data) => {
        console.log('Button clicked');
        if (!data.vehicle_id) {
            alert("Por favor, selecciona un vehículo.");
            return;
        }
    
        const result = await actions.createService(data);
        if (result.success) {
            navigate("/cliente-dashboard");
        } else {
            alert("¡Ups! Algo salió mal. Vuelve a intentarlo.");
        }
    };

    const handleClose = () => {
        navigate("/cliente-dashboard");
    };

    return (
        <div className="container py-5 position-relative bg-light p-4 rounded shadow">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="text-dark">Agendar Servicio</h5>
                        <button
                            type="button"
                            className="btn btn-success fw-bold"
                            onClick={() => handleSchedule(formData)}
                        >
                            Ingresar Servicio
                        </button>
                    </div>
                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="selectVehicle" className="form-label text-dark">Seleccione un vehículo</label>
                            <select
                                className="form-control"
                                id="selectVehicle"
                                name="vehicle_id"
                                value={formData.vehicle_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Elija la marca, modelo y matrícula de su vehículo</option>
                                {store.vehicles.map(vehicle => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.brand} {vehicle.model} - {vehicle.license_plate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="button"
                                className="btn btn-success fw-bold"
                                onClick={() => handleSchedule(formData)}
                            >
                                Ingresar Servicio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgendarServicio;