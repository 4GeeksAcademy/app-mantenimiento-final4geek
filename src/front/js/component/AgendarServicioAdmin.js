import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AgendarServicioAdmin = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicle_id: "",
        service_type_id: ""
    });

    useEffect(() => {
        actions.getVehicles(); // Fetch vehicles
        actions.getServiceTypes(); // Fetch service types
        console.log('Vehicles fetched:', store.vehicles);
        console.log('Service types fetched:', store.services);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getServiceCost = (serviceTypeId) => {
        const service = store.services.find(service => service.id === parseInt(serviceTypeId));
        return service ? service.cost : '';
    };

    const handleSchedule = async (data) => {
        try {
          const result = await actions.createService(data);
          if (result.ok) {
            // Handle success
            navigate('/admin-dashboard');
            alert('Servicio agendado correctamente');
          } else {
            const errorData = await result.json();
            alert(`Error al agendar servicio: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error scheduling service:', error);
          alert('Error al agendar servicio. Por favor, inténtalo nuevamente.');
        }
      };

    const handleClose = () => {
        navigate("/admin-dashboard");
    };

    return (
        <div className="container py-5 position-relative p-4 rounded shadow"  style={{
            width: '786px',
            backgroundColor: '#312E2D',
            borderRadius: '20px',
            margin: 'auto',
            padding: '20px'
        }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="text-center fw-bold text-light text-shadow" style={{ fontSize: '40px' }}>Agendar Servicio</h5>
                        <button
                            className="btn-close btn-close-custom rounded-circle me-1"
                            aria-label="Cerrar"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="selectVehicle" className="form-label text-light">Seleccione un vehículo</label>
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

                        <div className="mb-3 text-start">
                            <label htmlFor="selectServiceType" className="form-label text-light">Seleccione un tipo de servicio</label>
                            <select
                                className="form-control"
                                id="selectServiceType"
                                name="service_type_id"
                                value={formData.service_type_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Elija el tipo de servicio</option>
                                {store.services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="serviceCost" className="form-label text-light">Precio estimado</label>
                            <input
                                type="text"
                                className="form-control"
                                id="serviceCost"
                                value={getServiceCost(formData.service_type_id)}
                                readOnly
                            />
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="button"
                                className="btn btn-green fw-bold"
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

export default AgendarServicioAdmin;