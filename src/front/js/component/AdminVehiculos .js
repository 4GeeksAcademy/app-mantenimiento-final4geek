import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../../styles/modal.css";

const AdminVehiculos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedClient, setSelectedClient] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const columnConfig = [
        { key: "id", label: "ID" },
        { key: "user_id", label: "ID Cliente" },
        { key: "brand", label: "Marca" },
        { key: "model", label: "Modelo" },
        { key: "year", label: "Año" },
        { key: "mileage", label: "Kilometraje" },
        { key: "license_plate", label: "Matrícula" }
    ];

    useEffect(() => {
        Promise.all([actions.getVehicles(), actions.getClients()])
            .then(() => setLoading(false))
            .catch(err => {
                console.error("Error al obtener datos:", err);
                setLoading(false);
            });
    }, [actions]);

    useEffect(() => {
        if (selectedClient) {
            const filtered = store.vehicles.filter(vehicle => parseInt(vehicle.user_id) === parseInt(selectedClient));
            setFilteredVehicles(filtered);
        } else {
            setFilteredVehicles(store.vehicles);
        }
    }, [selectedClient, store.vehicles]);

    const handleClose = () => {
        navigate("/admin-dashboard");
    };

    const handleClientChange = (e) => {
        setSelectedClient(e.target.value ? parseInt(e.target.value) : "");
    };

    return (
        <Modal show={true} onHide={handleClose} centered backdrop="static" dialogClassName="custom-modal">
            <Modal.Header className="custom-modal-header">
                <button className="custom-close-button" onClick={handleClose}>
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
                <Modal.Title className="custom-modal-title">Vehículos Ingresados</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
                <div className="mb-3">
                    <label htmlFor="clientSelect" className="form-label text-white">Filtrar por Cliente</label>
                    <select
                        id="clientSelect"
                        className="form-select"
                        value={selectedClient}
                        onChange={handleClientChange}
                    >
                        <option value="">Todos los Clientes</option>
                        {store.clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name} {client.email}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="custom-content-box text-center">
                        Cargando...
                    </div>
                ) : filteredVehicles && filteredVehicles.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    {columnConfig.map((column, index) => (
                                        <th key={index} className="text-nowrap">{column.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVehicles.map((vehicle, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columnConfig.map((column, colIndex) => (
                                            <td key={colIndex} className="text-nowrap">
                                                {vehicle[column.key]}
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

export default AdminVehiculos;