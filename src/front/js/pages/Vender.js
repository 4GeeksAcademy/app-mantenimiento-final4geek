import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Integraapi from '../component/Integraapi';


const Vender = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    // Estado para manejar los campos del formulario
    const [formData, setFormData] = useState({
        vehicle_ID: "",
        sale_price: "",
        image_url: ""
    });

    // Estado para manejar la imagen subida
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        actions.getVehicles(); // Obtener vehículos al cargar
    }, []);

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para recibir la URL de Cloudinary
    const handleImageUpload = (imageUrl) => {
        setUploadedImage(imageUrl);
        setFormData((prevData) => ({
            ...prevData,
            image_url: imageUrl,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto a enviar
        const dataToSend = {
            vehicle_ID: formData.vehicle_ID,
            sale_price: formData.sale_price,
           
        };

        // Llamar a la acción del contexto
        const result = await actions.sellingvehicle(dataToSend);

        // Manejo de la respuesta
        if (result.success) {
            alert("Vehículo publicado con éxito");
            navigate('/cliente-dashboard');
        } else {
            alert("Error al publicar el vehículo. Inténtalo nuevamente.");
        }
    };

    // Función para cerrar el formulario
    const handleClose = () => {
        navigate("/cliente-dashboard");
    };

    return (
        <div className="container py-5 position-relative mx-auto p-4"
            style={{
                maxWidth: '800px',
                backgroundColor: '#312E2D',
                borderRadius: '20px',
            }}>
            <div className="row justify-content-center">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="text-center fw-bold text-light text-shadow"
                        style={{ fontSize: "40px" }}>
                        Completa tu formulario
                    </h5>
                    <button
                        className="btn-close btn-close-custom rounded-circle me-1"
                        aria-label="Cerrar"
                        onClick={handleClose}
                    ></button>
                </div>

                <form>
                    {/* Seleccione Marca */}
                    <div className="mb-3">
                        <label className="form-label text-white">Seleccione Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Elija Marca, Modelo y Kilometraje"
                        />
                    </div>

                    {/* Componente Cloudinary */}
                    <Integraapi onImageUpload={handleImageUpload} />

                    {/* Precio de venta */}
                    <div className="mb-3">
                        <label className="form-label text-white">Precio de venta USD</label>
                        <input
                            type="number"
                            name="sale_price"
                            value={formData.sale_price}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Precio de venta en Dólares"
                        />
                    </div>

                    {/* Botón Publicar Vehículo */}
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="submit"
                            className="btn fw-bold"
                            style={{
                                backgroundColor: '#7ED957',
                                color: '#312E2D'
                            }}>
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
                        className="img-fluid rounded"
                        style={{
                            maxHeight: '200px',
                            objectFit: 'contain',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    />
                </div>
            )}
        </div>



    );
};


export default Vender;