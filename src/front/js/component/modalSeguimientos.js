import React from "react";
import { Modal } from "react-bootstrap";
import "../../styles/modal.css";

const ModalSeguimientos = ({ isOpen, onClose, data }) => {
  return (
    <div
      className="modal fade"
      id="SeguimientoClient"
      tabIndex="-1"
      aria-labelledby="SeguimientoClientLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark" id="SeguimientoClientLabel">Seguimiento de servicios</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <div className="custom-content-box text-dark">{data ? data : "<DatosBD>"}</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ModalSeguimientos;


/*
    <Modal show={isOpen} onHide={onClose} centered backdrop="static" dialogClassName="custom-modal">
      <Modal.Header className="custom-modal-header">
        <button className="custom-close-button" onClick={onClose}>
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
        <Modal.Title className="custom-modal-title">Seguimientos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="custom-content-box">{data ? data : "<DatosBD>"}</div>
      </Modal.Body>
    </Modal>
    */