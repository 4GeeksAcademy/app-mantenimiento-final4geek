import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import "../../styles/modal.css";

const ClienteVehiculos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).sub : null;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    useEffect(() => {
        actions.getVehicles();
    }, []);

    useEffect(() => {
        if (userId) {
            const filtered = store.vehicles.filter(vehicle => {
                console.log(vehicle.user_id, userId)
                return parseInt(vehicle.user_id) === parseInt(userId);
            });
            setFilteredVehicles(filtered);
        } else {
            console.log(userId)
            setFilteredVehicles(store.vehicles);
        }
    }, [userId, store.vehicles]);

    const handleClose = () => {
        navigate("/cliente-dashboard");
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
                {filteredVehicles && filteredVehicles.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    {Object.keys(filteredVehicles[0]).map((key, index) => (
                                        <th key={index} className="text-nowrap">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVehicles.map((vehicle, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(vehicle).map((value, colIndex) => (
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

export default ClienteVehiculos;