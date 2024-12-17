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
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).sub : null;

  useEffect(() => {
    actions.getServices();
  }, []);

  useEffect(() => {
    if (userId) {
      const filtered = store.services.filter(service => {
        console.log(service.user_id, userId);
        return parseInt(service.user_id) === parseInt(userId);
      });
      setFilteredServices(filtered);
    } else {
      console.log(userId);
      setFilteredServices(store.services);
    }
  }, [userId, store.services]);

  const handleClose = () => {
    navigate("/cliente-dashboard");
  };

  return (
    <Modal show={true} onHide={handleClose} centered backdrop="static" dialogClassName="custom-modal">
      <Modal.Header className="custom-modal-header">
        <button className="custom-close-button" onClick={handleClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <Modal.Title className="custom-modal-title">Servicios Ingresados</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
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

export default ClienteSeguimientos;