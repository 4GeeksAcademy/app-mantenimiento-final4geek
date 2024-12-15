const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            vehicle: []
        },
        actions: {
            registerUser: async (userData) => {
                try {
                    console.log('Datos de usuario enviados:', userData); 
                    const response = await fetch(`${process.env.BACKEND_URL}/registro`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error en el registro: ' + errorData.msg); 
                    }
                    const data = await response.json();
                    console.log('Registro exitoso:', data);
                    return { success: true };
                } catch (error) {
                    console.error('Error:', error);
                    return { success: false, error: error.message };
                }
            },
            loginUser: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email, password: password })
                    });
                    if (!response.ok) {
                        throw new Error('Error en la autenticación');
                    }
                    const data = await response.json();
                    console.log('Token de acceso:', data.access_token);
                    localStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });

                    return { success: true, data: data };
                } catch (error) {
                    console.error('Error:', error);
                    return { success: false };
                }
            },



            createVehicle: async (data) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/vehicle', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Error al registrar el vehículo");
                    }
            
                    const result = await response.json();
                    return { success: true, result };
                } catch (error) {
                    console.error("Error en la creación del vehículo:", error);
                    return { success: false, error: error.message };
                }
            },
            

            getVehicles: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/vehicles`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${getStore().token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error al obtener vehículos');
                    }
                    const data = await response.json();
                    setStore({ vehicles: data });
                } catch (error) {
                    c// En tu archivo de actions
                    const createVehicle = async (data) => {
                        try {
                            const response = await fetch("URL_DE_TU_API/vehicles", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    // Si es necesario, agrega más cabeceras, por ejemplo para autorización
                                    // "Authorization": "Bearer tu_token",
                                },
                                body: JSON.stringify(data),
                            });

                            const result = await response.json();

                            if (response.ok) {
                                return result; // Si la respuesta es exitosa, retorna los datos o un estado adecuado
                            } else {
                                throw new Error(result.message || "Error al registrar el vehículo");
                            }
                        } catch (error) {
                            console.error("Error en la creación del vehículo:", error);
                            return null; // Si hay error, puedes devolver null o algún otro valor
                        }
                    };
                    console.error('Error:', error);
                }
            },

            getServices: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/servicios`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${getStore().token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error al obtener servicios');
                    }
                    const data = await response.json();
                    setStore({ services: data });
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            updateService: async (serviceId, statusId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/servicios/${serviceId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}`
                        },
                        body: JSON.stringify({ Status_ID: statusId })
                    });
                    if (!response.ok) {
                        throw new Error('Error al actualizar el servicio');
                    }
                    const data = await response.json();
                    console.log('Servicio actualizado:', data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };
};

export default getState;
