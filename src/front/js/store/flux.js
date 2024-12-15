const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            vehicle: [],
            token:""
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
                        body: JSON.stringify({ email, password })
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error en la autenticación: ' + errorData.msg);
                    }
                    const data = await response.json();
                    console.log('Token de acceso:', data.access_token);
                    localStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });

                    return { success: true, data };
                } catch (error) {
                    console.error('Error:', error);
                    return { success: false, error: error.message };
                }
            },
            createVehicle: async (data) => {
                try {
                    const token = getStore().token;
                    console.log(token)
                    if (!token || token.split('.').length !== 3) {
                        console.error("Invalid token format");
                        return { success: false, error: "Invalid token format" };
                    }

                    const response = await fetch(process.env.BACKEND_URL + '/api/vehicle', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error al registrar el vehículo: ' + errorData.message);
                    }
                    const result = await response.json();
                    
                
                  
                      // Return success and the result
                      return { success: true, result };
                    } catch (error) {
                      // Log the error and return an error response
                      console.error('Error creating vehicle:', error);
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
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error al obtener vehículos: ' + errorData.msg);
                    }
                    const data = await response.json();
                    setStore({ vehicles: data });
                } catch (error) {
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
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error al obtener servicios: ' + errorData.msg);
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
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error al actualizar el servicio: ' + errorData.msg);
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