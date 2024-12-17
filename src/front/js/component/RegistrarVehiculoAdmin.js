import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const RegistrarVehiculoAdmin = () => {
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
            navigate("/admin-dashboard");
        } else {
            alert("¡Ups! Algo salió mal. Vuelve a intentarlo.");
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
                        <h5 className="text-center fw-bold text-light text-shadow" style={{ fontSize: "40px" }}>Registrar Vehiculo</h5>
                        <button
                            className="btn-close btn-close-custom rounded-circle me-1"
                            aria-label="Cerrar"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <form className="">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="brand" className="form-label text-light">Marca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="model" className="form-label text-light">Modelo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="year" className="form-label text-light">Año</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="mileage" className="form-label text-light">Kilómetros</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="mileage"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="license_plate" className="form-label text-light">Matrícula</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="license_plate"
                                    name="license_plate"
                                    value={formData.license_plate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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

export default RegistrarVehiculoAdmin;


{/* <div className="container py-5 position-relative rounded shadow" style={{ maxWidth: '786px', margin: 'auto', backgroundColor: '#312E2D' }}>
  <div className="row justify-content-center">
    <div className="col-lg-8 col-md-10 col-sm-12">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-center fw-bold text-light" style={{ fontSize: '40px' }}>Registrar Vehículo</h5>
        <button
          className="btn-close btn-close-white"
          aria-label="Cerrar"
          onClick={handleClose}
        ></button>
      </div>
      <form>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="brand" className="form-label text-light">Marca</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="model" className="form-label text-light">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="year" className="form-label text-light">Año</label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="mileage" className="form-label text-light">Kilómetros</label>
            <input
              type="number"
              className="form-control"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="license_plate" className="form-label text-light">Matrícula</label>
            <input
              type="text"
              className="form-control"
              id="license_plate"
              name="license_plate"
              value={formData.license_plate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-success fw-bold px-4"
              onClick={() => handleRegistration(formData)}
            >
              Confirmar Registro
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div> */}
