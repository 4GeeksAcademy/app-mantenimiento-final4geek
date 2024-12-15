// ModalCliente.jsx
import React from 'react';
import { useContext,useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; 


const AgendarServicio = () => {
    const { actions } = useContext(Context);
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            vehicle_id: "",
            service_type_id: "",
            total_cost: "",
      
        });
    

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
                        <div class="mb-3 text-start">
    <label for="selectVehicle" class="form-label text-dark">Seleccione un vehículo</label>
    <select class="form-control" id="selectVehicle">
        <option value="" disabled selected>Elija la marca, modelo y matrícula de su vehículo</option>
    
    </select>
</div>

                            <div class="mb-3 text-start">
                                <label for="selectService" class="form-label text-dark">Seleccione un servicio</label>
                                <select class="form-control" id="selectService">
                                    <option value="" disabled selected>Elija un servicio por favor</option>
                                    <option value="servicio1">Cambio de aceite</option>
                                    <option value="servicio2">Alineación y balanceo</option>
                                    <option value="servicio3">Inspección general</option>
                                </select>
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

export default AgendarServicio;