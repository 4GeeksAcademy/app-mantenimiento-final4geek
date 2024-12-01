import React from "react";
import { Modal } from "react-bootstrap";
import "../../styles/modal.css";

const ModalSeguimientos = ({ isOpen, onClose, data }) => {
  return (
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
  );
};

export default ModalSeguimientos;