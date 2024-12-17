import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../../styles/modal.css";

const AdminVehiculos = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    actions.getServices();
    actions.getClients();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      const filtered = store.services.filter(service => service.user_id === selectedClient);
      setFilteredServices(filtered);
    } else {
      setFilteredServices(store.services);
    }
  }, [selectedClient, store.services]);

  const handleClose = () => {
    navigate("/admin-dashboard");
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value ? parseInt(e.target.value) : "");
  };

  return (
    <Modal show={true} onHide={handleClose} centered backdrop="static" dialogClassName="custom-modal">
      <Modal.Header className="custom-modal-header">
        <button className="custom-close-button" onClick={handleClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <Modal.Title className="custom-modal-title">Seguimiento de Servicios</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="mb-3">
          <label htmlFor="clientSelect" className="form-label">Filtrar por Cliente</label>
          <select id="clientSelect" className="form-select" value={selectedClient} onChange={handleClientChange}>
            <option value="">Todos los Clientes</option>
            {store.clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name} {client.email}
              </option>
            ))}
          </select>
        </div>
        {filteredServices && filteredServices.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  {Object.keys(filteredServices[0]).map((key, index) => (
                    <th key={index} className="text-nowrap">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(service).map((value, colIndex) => (
                      <td key={colIndex} className="text-nowrap">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="custom-content-box text-center">
            No hay datos disponibles.
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminVehiculos;