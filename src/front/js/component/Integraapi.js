import React from 'react';
import { useState } from 'react';

const Integraapi = ({ onImageUpload }) => {
    const preset_name = "uplodadpicture"; // Nombre del preset
    const cloud_name = "doypxl96o";       // Cloud name de tu cuenta Cloudinary

    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setLoading(false);
            onImageUpload(file.secure_url); // Enviamos la URL al componente padre
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <div className="mb-3 text-start">
            <label className="form-label text-white">
                Seleccionar Archivo
            </label>
            <input
                type="file"
                name="file"
                onChange={(e) => uploadImage(e)}
                className="form-control"
                style={{
                    backgroundColor: '#FFFFFF',
                    height: '40px',
                    width: '609px',
                    color: '#495057',
                    border: '1px solid #ced4da',
                    borderRadius: '5px',
                    padding: '5px 10px'
                }}
            />
            {loading && <h3 className="text-white mt-2">Cargando...</h3>}
        </div>
    );
};

export default Integraapi;
