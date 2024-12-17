import React, { useState } from 'react';


import { useNavigate } from "react-router-dom";
import Integraapi from '../component/Integraapi';


const Vender = () => {
    const navigate = useNavigate();
    const [uploadedImage, setUploadedImage] = useState(null); // Estado para manejar la URL de la imagen


    const handleClose = () => {
        navigate("/cliente-dashboard");
    };


    // Función para recibir la URL desde Cloudinary
    const handleImageUpload = (imageUrl) => {
        setUploadedImage(imageUrl);
    };


    return (
        <div className="container py-5 position-relative p-4" style={{
            width: '786px',
            backgroundColor: '#312E2D',
            borderRadius: '20px',
            margin: 'auto',
            padding: '20px'
        }}>
            <div className="row justify-content-center">



                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className=" text-center fw-bold text-light text-shadow" style={{ fontSize: "40px" }}>Completa tu formulario</h5>
                    <button
                        className="btn-close btn-close-custom rounded-circle me-1"
                        aria-label="Cerrar"
                        onClick={handleClose}
                    ></button>
                </div>


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



    );
};


export default Vender;