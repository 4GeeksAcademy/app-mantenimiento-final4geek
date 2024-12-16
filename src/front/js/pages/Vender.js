import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";
import Integraapi from '../component/Integraapi';

const Vender = () => {
    const navigate = useNavigate();
    const [uploadedImage, setUploadedImage] = useState(null); // Estado para manejar la URL de la imagen

    const navigateToHome = () => {
        navigate("/"); // Redirige a la página principal
    };

    // Función para recibir la URL desde Cloudinary
    const handleImageUpload = (imageUrl) => {
        setUploadedImage(imageUrl);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
       

            {/* Contenedor principal */}
           
                {/* Inicio contenedor vender vehículos */}
                <div
                    className="d-flex flex-column align-item-center position-relative"
                    style={{
                        width: '786px',
                        backgroundColor: '#312E2D',
                        borderRadius: '20px',
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    {/* Icono retorno home */}
                    <div
                        onClick={navigateToHome}
                        className='position-absolute d-flex justify-content-center align-items-center'
                        style={{
                            width: '40px',
                            height: '40px',
                            top: '10px',
                            left: '10px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            border: '2px solid #FFFFFF',
                            backgroundColor: '#312E2D',
                            zIndex: 1,
                        }}
                    >
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF' }}>X</span>
                    </div>

                    <div className="card-body">
                        <h2 className="text-white text-center mb-4" style={{ fontSize: '40px' }}>
                            Vender Vehículo
                        </h2>

                        <form>
                            {/* Seleccione Marca */}
                            <div className="mb-3 text-start">
                                <label className="form-label text-white">
                                    Seleccione Marca
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Elija Marca, Modelo y Kilometraje"
                                    style={{ backgroundColor: '#FFFFFF', height: '26.94px', width: '609px' }}
                                />
                            </div>

                            {/* Componente Cloudinary */}
                            <Integraapi onImageUpload={handleImageUpload} />

                            {/* Precio de venta */}
                            <div className="mb-3 text-start">
                                <label className="form-label text-white">
                                    Precio de venta USD
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de venta en Dólares"
                                    style={{ backgroundColor: '#FFFFFF', height: '27px', width: '220px', borderRadius: '10px', opacity: '0.7' }}
                                />
                            </div>

                            {/* Botón Publicar Vehículo */}
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="submit"
                                    className="btn fw-bold"
                                    style={{
                                        backgroundColor: '#7ED957',
                                        width: '206px',
                                        height: '33px',
                                        color: '#312E2D'
                                    }}
                                >
                                    Publicar Vehículo
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Renderización de la Imagen Subida */}
                    {uploadedImage && (
                        <div className="mt-4 d-flex justify-content-center">
                            <img
                                src={uploadedImage}
                                alt="Imagen subida"
                                style={{
                                    maxWidth: '100%',
                                    height: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        
    );
};

export default Vender;
