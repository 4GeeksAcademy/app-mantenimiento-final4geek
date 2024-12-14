import React from "react";

const ModalRegVehiculo = () => {
    return (
        <div
            className="modal fade"
            id="modalRegVehiculos"
            tabIndex="-1"
            aria-labelledby="modalRegVehiculosLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="modalRegVehiculosLabel">Registro de Vehículos</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="registerNombre" className="form-label text-dark">Marca</label>
                                        <input type="text" className="form-control" id="registerNombre" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="registerApellido" className="form-label text-dark">Modelo</label>
                                        <input type="text" className="form-control" id="registerApellido" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="registeryear" className="form-label text-dark">Año</label>
                                        <input type="number" className="form-control" id="registeryear" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="registermileage" className="form-label text-dark">Kilometraje</label>
                                        <input type="number" className="form-control" id="registermileage" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label htmlFor="registerlicenseplate" className="form-label text-dark">Placa</label>
                                        <input type="text" className="form-control" id="registerlicenseplate" style={{ backgroundColor: '#FFFFFF', height: '40px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-success" style={{ backgroundColor: '#7ED957' }}>Confirmar Registro</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRegVehiculo;