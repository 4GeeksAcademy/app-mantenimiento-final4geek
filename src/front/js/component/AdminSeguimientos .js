import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../../styles/modal.css";

const columnConfig = [
  { key: "id", label: "ID" },
  { key: "vehicle_ID", label: "ID Vehículo" },
  { key: "Service_Type_ID", label: "Tipo de Servicio" },
  { key: "Start_Date", label: "Fecha de Inicio" },
  { key: "End_Date", label: "Fecha de Fin" },
  { key: "Total_Cost", label: "Costo Total" },
  { key: "Payment_Status", label: "Estado de Pago" },
  { key: "User_ID", label: "ID Usuario" }
];

const AdminSeguimientos = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    actions.getServices();
    actions.getClients();
  }, []);

  useEffect(() => {
    if (store.services.length > 0 && store.clients.length > 0) {
      setLoading(false);
    }
  }, [store.services, store.clients]);

  useEffect(() => {
    if (selectedClient) {
      const filtered = store.services.filter(service => service.User_ID === selectedClient);
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
        {loading ? (
          <div className="text-center">
            <p className="text-white">Cargando...</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="clientSelect" className="form-label text-white">Filtrar por Cliente</label>
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
                      {columnConfig.map((column, index) => (
                        <th key={index} className="text-nowrap">{column.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service, rowIndex) => (
                      <tr key={rowIndex}>
                        {columnConfig.map((column, colIndex) => (
                          <td key={colIndex} className="text-nowrap">
                            {service[column.key]}
                          </td>
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
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminSeguimientos;