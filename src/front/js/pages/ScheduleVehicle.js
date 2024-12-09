import React from 'react'
import BackgroundAnimated from '../component/Backgroundanimated';



const ScheduleVehicle = () => {
    const navigateToHome = () => {
        //Lógica redireccionar HomeCliente
        console.log("navegando a HomeClente....");
    }
    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
           {/* <BackgroundAnimated/> */}
            <div
                className="card p-4"
                style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}
            >
                {/*Inicio contenedor agenda vehículos*/}

                <div className="d-flex flex-column align-item-center position-relative"

                    style={{ width: ' 786px', height: ' 356px', backgroundColor: '#143E79', borderRadius: '20px', margin: 'auto', }}>


                    {/*Icono retorno home*/}

                    <div onClick={navigateToHome}
                        className='position-absolute d-flex justify-content-center align-items-center'
                        style={{
                            width: '40px', height: '40px', top: '10px', left: '10px', borderRadius: '50%',
                            cursor: 'pointer', border: '2px solid #FFFFFF', backgroundColor: '#143E79', zIndex: 1,
                        }}
                    >
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF' }}>X</span>


                    </div>



                    <div className="card-body">
                        <h2 className="text-white text-center mb-4" style={{fontSize: '20px'}}>Agendar Servicio</h2>

                        <form>

                            <div className="mb-3 text-start">
                                <label htmlFor="#" className="form-label text-white">
                                    Seleccione un vehículo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="selectVehicle"
                                    placeholder='Elija la marca, modelo y matricula de su vehículo'
                                    style={{ backgroundColor: '#FFFFFF', height: '26.94px', width: '609px' }}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="selectService" className="form-label text-white">
                                    Seleccione un servicio
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="selectVheicle"
                                    placeholder='Elija un servicio por favor'
                                    style={{ backgroundColor: '#FFFFFF', height: '26.94px', widht: '609px' }}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="registeryear" className="form-label text-white">
                                    Precio estimado
                                </label>
                                <input
                                    type="num"
                                    className="form-control"
                                    id="precioServicio"
                                    placeholder='Precio estimado'
                                    readOnly
                                    style={{ backgroundColor: '#FFFFFF', height: '27px', width: '190px', borderRadius: '10px', opacity: '0.7' }}
                                />
                            </div>




                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="submit"
                                    className="btn fw-bold"
                                    style={{ backgroundColor: '#7ED957', width: '206px', height: '33px', color: 'white', textAlign: 'center' }}
                                >
                                    Ingresar Servicio
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
                //Fin contenedor Agenda Vehículos
            </div>

        </div>
    );
};


export default ScheduleVehicle;