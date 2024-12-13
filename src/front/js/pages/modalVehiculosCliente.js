import React, { useState } from "react";
import ModalVehiculosComp from "../component/modalVehiculosCliente";

const ModalVehiculosPag = () => {
    const [isVehiculosOpen, setIsVehiculosOpen] = useState(false);

    // Fetchs y codigo asociado aqui

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => setIsVehiculosOpen(true)}>
                Mostrar Vehículos
            </button> {/* Este Boton deberia de aparecer en Home */}

            <ModalVehiculosComp isOpen={isVehiculosOpen} onClose={() => setIsVehiculosOpen(false)}>
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
            </ModalVehiculosComp>
        </div>
    );
};

export default ModalVehiculosPag;