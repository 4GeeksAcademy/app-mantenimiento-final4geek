import React from "react";
import "../../styles/modal.css";

const ModalVehiculos = ({ data }) => {
    return (
        <div
            className="modal fade"
            id="modalVehiculos"
            tabIndex="-1"
            aria-labelledby="modalVehiculosLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="modalVehiculosLabel">Vehículos Registrados</h5>
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

export default ModalVehiculos;
