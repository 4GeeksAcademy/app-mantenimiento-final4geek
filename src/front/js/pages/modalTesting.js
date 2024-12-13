import React, { useState } from "react";
import ModalSeguimientos from "../component/modalSeguimientos";
import ModalVehiculos from "../component/modalVehiculos";

const ModalTesting = () => {
    const [isSeguimientosOpen, setIsSeguimientosOpen] = useState(false);
    const [isVehiculosOpen, setIsVehiculosOpen] = useState(false);

    // Fetchs y codigo asociado aqui

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => setIsSeguimientosOpen(true)}>
                Mostrar Seguimientos
            </button>
            <button className="btn btn-primary" onClick={() => setIsVehiculosOpen(true)}>
                Mostrar Vehículos
            </button>

            <ModalSeguimientos isOpen={isSeguimientosOpen} onClose={() => setIsSeguimientosOpen(false)}>
                <table className="table table-striped">
                    {/* Cargar BD:seguimientos aqui */}
                </table>
                {/*
                {seguimientos.length > 0 ? (
                    <table className="table table-striped">
                    </table>
                ) : (
                    <p>Cargando datos de seguimientos...</p>
                )}
                */}
            </ModalSeguimientos>

            <ModalVehiculos isOpen={isVehiculosOpen} onClose={() => setIsVehiculosOpen(false)}>
                <table className="table table-striped">
                    {/* Cargar BD:vehiculos aqui */}
                </table>
                {/*
                {vehiculos.length > 0 ? (
                    <table className="table table-striped">
                    </table>
                ) : (
                    <p>Cargando datos de vehículos...</p>
                )} 
                */}
            </ModalVehiculos>
        </div>
    );
};

export default ModalTesting;