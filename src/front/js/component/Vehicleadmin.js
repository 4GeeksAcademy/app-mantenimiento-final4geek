import React, { useState } from "react";
import ModalSeguimientoAdmin from "./ModalSeguiAdmin";
import ModalVehicle from "./ModalVehicleadmin";

const ModalVehicleadmin = () => {
    const [isSeguimientosOpen, setIsSeguimientosOpen] = useState(false);
    const [isVehiculosOpen, setIsVehiculosOpen] = useState(false);

    // Fetchs y codigo asociado aqui  

    return (
        <div className="container-fluid mt-0 d-flex justify-content-center" style={{ backgroundColor: '#312D2E',margin: 0,padding: 0,width: '100%',height: '100vh', }}>

            <div className="mt-5" style={{ backgroundColor: '#312D2E' }}>
                <button className="btn fw-bold"
                    style={{ backgroundColor: '#7ED957', marginRight: '10px' }} onClick={() => setIsSeguimientosOpen(true)}>
                    Mostrar Seguimientos
                </button>
                <button className="btn fw-bold" style={{ backgroundColor: '#7ED957', marginLeft: '10px' }} onClick={() => setIsVehiculosOpen(true)}>
                    Mostrar Vehículos
                </button>

                <ModalSeguimientoAdmin isOpen={isSeguimientosOpen} onClose={() => setIsSeguimientosOpen(false)}>
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
                </ModalSeguimientoAdmin>

                <ModalVehicle isOpen={isVehiculosOpen} onClose={() => setIsVehiculosOpen(false)}>
               {/*} <table className="table table-striped">
                    {/*}  Cargar BD:vehiculos aqui 
        </table>
                
              {/*}  {vehiculos.length > 0 ? (
                    <table className="table table-striped">
                    </table>
                ) : (
                    <p>Cargando datos de vehículos...</p>
                )}   
               {*/}
            </ModalVehicle > 
            </div >
        </div >

    );
};

export default ModalVehicleadmin;
