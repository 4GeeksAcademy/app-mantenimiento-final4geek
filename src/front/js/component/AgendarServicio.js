// ModalCliente.jsx
import React from 'react';

const ModalCliente = () => {
    return (
        <div
            className="modal fade"
            id="modalPrueba"
            tabIndex="-1"
            aria-labelledby="modalPruebaLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="modalPrueba">Prueba</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                        ></button>
                    </div>

                </div>
            </div>
        </div >

    );
};

export default ModalCliente;
