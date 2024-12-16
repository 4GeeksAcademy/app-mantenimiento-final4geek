import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VehiculosRegistrados = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const selectedVehicle = store.vehicles.find((v) => v.id === e.target.value) || null;
setSelectedVehicle(selectedVehicle);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await actions.getVehicles();
        setVehicles(fetchedVehicles); // Aquí se está usando setVehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleVehicleSelect = (value) => {
    if (!editMode) {
      const selectedVehicle = store.vehicles.find((v) => v.id === value);
      setSelectedVehicle(selectedVehicle);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("¿Estás seguro de eliminar este vehículo?")) {
      try {
        const response = await actions.deleteVehicle(selectedVehicle.id);
        if (response.ok) {
          const updatedVehicles = store.vehicles.filter(
            (vehicle) => vehicle.id !== selectedVehicle.id
          );
          setVehicles(updatedVehicles);
          setSelectedVehicle(null);
        } else {
          console.error("Error deleting vehicle:", response.statusText);
          // Handle deletion error, e.g., display message to user
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        // Handle deletion error, e.g., display message to user
      }
    }
  };

  // ... (rest of your component code)

  return (
    <div className="container py-5 position-relative bg-light p-4 rounded shadow">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title text-dark">Vehículos Registrados</h5>
          </div>
          <div className="custom-content-box text-dark">
            <select
              className="form-select"
              value={selectedVehicle ? selectedVehicle.id : ""}
              onChange={(e) => handleVehicleSelect(store.vehicles.find((v) => v.id === e.target.value))}
            >
              <option value="">Selecciona un vehículo</option>
              {store.vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.brand} {vehicle.model} - {vehicle.license_plate}
                </option>
              ))}
            </select>

            {selectedVehicle && (
              <div>
                {/* Display vehicle details */}
                {editMode ? (
                  // Edit mode template for modifying vehicle details
                  <div>
                    {/* Edit form fields for brand, model, etc. */}
                    <button onClick={() => { setEditMode(false); }}>Guardar</button>
                    <button onClick={() => { setEditMode(false); setSelectedVehicle(null); }}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <p>Marca: {selectedVehicle.brand}</p>
                    <p>Modelo: {selectedVehicle.model}</p>
                    <p>Año: {selectedVehicle.year}</p>
                    <p>Kilómetros: {selectedVehicle.mileage}</p>
                    <p>Matrícula: {selectedVehicle.license_plate}</p>
                    <button onClick={handleEditClick}>Editar</button>
                    <button onClick={handleDeleteClick}>Eliminar</button>
                  </div>
                )}
              </div>
            )}

            {store.vehicles.length === 0 && <p>No hay vehículos registrados</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculosRegistrados;