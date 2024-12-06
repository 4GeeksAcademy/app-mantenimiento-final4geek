import React from "react";
import ReactDOM from "react-dom";


const Vehicle = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div
                className="card p-4"
                style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}
            >
                <div className="card-body">
                    <h2 className="text-white text-center mb-3">Registrar Vehículo</h2>
                    <form>
                        <div className="row">
                            {/* Columna Izquierda */}
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerNombre" className="form-label text-white">
                                        Marca
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerNombre"
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerApellido" className="form-label text-white">
                                        Modelo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerApellido"
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registeryear" className="form-label text-white">
                                        Año
                                    </label>
                                    <input
                                        type="year"
                                        className="form-control"
                                        id="registeryear"
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                            </div>
                            {/* Columna Derecha */}
                            <div className="col-md-6">
                                <div className="mb-3 text-start">
                                    <label htmlFor="registermileage" className="form-label text-white">
                                        Kilómetros
                                    </label>
                                    <input
                                        type="mileage"
                                        className="form-control"
                                        id="registermileage"
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="registerlicenseplate" className="form-label text-white">
                                        Matrícula
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerlicenseplate"
                                        style={{ backgroundColor: '#FFFFFF', height: '40px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mt-4">
                                <button
                                    type="submit"
                                    className="btn fw-bold"
                                    style={{ backgroundColor: '#7ED957' }}
                                >
                                    Confirmar Registro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;




