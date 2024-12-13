import React, { useState } from "react";
import ModalSeguimientosComp from "../component/modalSeguimientosCliente";


const ModalSeguimientosPag = () => {
    const [isSeguimientosOpen, setIsSeguimientosOpen] = useState(false);

    // Fetchs y codigo asociado aqui

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => setIsSeguimientosOpen(true)}>
                Mostrar Seguimientos
            </button> {/* Este Boton deberia de aparecer en Home */}

            <ModalSeguimientosComp isOpen={isSeguimientosOpen} onClose={() => setIsSeguimientosOpen(false)}>
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
            </ModalSeguimientosComp>
        </div>
    );
};

export default ModalSeguimientosPag;