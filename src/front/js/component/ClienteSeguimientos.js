import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import "../../styles/modal.css";

const ClienteSeguimientos = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).sub : null;

  const columnConfig = [
    { key: "id", label: "ID" },
    { key: "vehicle_ID", label: "ID Vehículo" },
    { key: "Service_Type_ID", label: "Tipo de Servicio" },
    { key: "Start_Date", label: "Fecha de Inicio" },
    { key: "End_Date", label: "Fecha de Fin" },
    { key: "status", label: "Status" },
    { key: "Total_Cost", label: "Costo Total" },
    { key: "Payment_Status", label: "Estado de Pago" },
    { key: "User_ID", label: "ID Usuario" }
  ];

  useEffect(() => {
    let isMounted = true;

    actions.getServices().then(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [actions]);

  useEffect(() => {
    if (userId) {
      const filtered = store.services.filter((service) => {
        return parseInt(service.User_ID) === parseInt(userId);
      });
      setFilteredServices(filtered);
    } else {
      setFilteredServices(store.services);
    }
  }, [userId, store.services]);

  const handleClose = () => {
    navigate("/cliente-dashboard");
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="custom-modal"
    >
      <Modal.Header className="custom-modal-header">
        <button className="custom-close-button" onClick={handleClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <Modal.Title className="custom-modal-title">
          Servicios Ingresados
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        {loading ? (
          <div className="custom-content-box text-center">Cargando...</div>
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  {columnConfig.map((column, index) => (
                    <th key={index} className="text-nowrap">
                      {column.label}
                    </th>
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
      </Modal.Body>
    </Modal>
  );
};

export default ClienteSeguimientos;