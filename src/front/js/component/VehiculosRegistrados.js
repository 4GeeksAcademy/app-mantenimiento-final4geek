import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VehiculosRegistrados = ({ data }) => {
  const [vehicles, setVehicles] = useState([]);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await actions.getVehicles(); 
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // You can display an error message to the user here
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="container py-5 position-relative bg-light p-4 rounded shadow">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title text-dark">Vehículos Registrados</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={handleClose}
            />
          </div>
          <div className="custom-content-box text-dark">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle.id}>
                  <p>Marca: {vehicle.brand}</p>
                  <p>Modelo: {vehicle.model}</p>
                  <p>Año: {vehicle.year}</p>
                  <p>Kilómetros: {vehicle.mileage}</p>
                  <p>Matrícula: {vehicle.license_plate}</p>
                </div>
              ))
            ) : (
              <p>No hay vehículos registrados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculosRegistrados;