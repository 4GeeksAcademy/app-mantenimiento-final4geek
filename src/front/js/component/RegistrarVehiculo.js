import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const RegistrarVehiculo = () => {
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
            alert("¡Vehículo registrado con éxito! Ahora puedes agendar servicio.");
            navigate("/cliente-dashboard");
        } else {
            alert("¡Ups! Algo salió mal. Vuelve a intentarlo.");
        }
    };

    const handleClose = () => {
        navigate("/cliente-dashboard");
    };

    return (
        <div className="container py-5 position-relative mx-auto p-4" 
    style={{
        maxWidth: '800px',
        backgroundColor: '#312E2D',
        borderRadius: '20px',
    }}>
    <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-center fw-bold text-light text-shadow" 
                    style={{ fontSize: "40px" }}>
                    Registrar Vehículo
                </h5>
                <button
                    className="btn-close btn-close-custom rounded-circle me-1"
                    aria-label="Cerrar"
                    onClick={handleClose}
                ></button>
            </div>
            <form>
                <div className="row g-3">
                    {[
                        { id: "brand", label: "Marca", type: "text" },
                        { id: "model", label: "Modelo", type: "text" },
                        { id: "year", label: "Año", type: "number" },
                        { id: "mileage", label: "Kilómetros", type: "number" },
                        { id: "license_plate", label: "Matrícula", type: "text" },
                    ].map(({ id, label, type }) => (
                        <div key={id} className="col-md-6">
                            <label htmlFor={id} className="form-label text-light">{label}</label>
                            <input
                                type={type}
                                className="form-control"
                                id={id}
                                name={id}
                                value={formData[id]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-green fw-bold"
                            onClick={() => handleRegistration(formData)}
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

export default RegistrarVehiculo;
