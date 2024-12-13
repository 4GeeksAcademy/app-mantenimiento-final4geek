// ModalCliente.jsx
import React from 'react';

const ModalCliente = () => {
    return (
        <div
            className="modal fade"
            id="modalAgendarServicio"
            tabIndex="-1"
            aria-labelledby="modalAgendarServicio"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="scheduleVehicleLabel">Agendar Servicio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3 text-start">
                                <label htmlFor="selectVehicle" className="form-label text-dark">Seleccione un vehículo</label>
                                <input type="text" className="form-control" id="selectVehicle" placeholder="Elija la marca, modelo y matrícula de su vehículo" />
                            </div>

                            <div className="mb-3 text-start">
                                <label htmlFor="selectService" className="form-label text-dark">Seleccione un servicio</label>
                                <input type="text" className="form-control" id="selectService" placeholder="Elija un servicio por favor" />
                            </div>

                            <div className="mb-3 text-start">
                                <label htmlFor="precioServicio" className="form-label text-dark">Precio estimado</label>
                                <input type="number" className="form-control" id="precioServicio" placeholder="Precio estimado" readOnly />
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <button type="submit" className="btn btn-success fw-bold">Ingresar Servicio</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default ModalCliente;