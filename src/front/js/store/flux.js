const getState = ({ getStore, getActions, setStore }) => {
    return {
        actions: {
            registerUser: async (userData) => {
                try {
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
                        throw new Error('Error en el registro');
                    }
                    const data = await response.json();
                    console.log('Registro exitoso:', data);
                    return { success: true};
                } catch (error) {
                    console.error('Error:', error);
                    return { success: false };
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
            createVehicle: async (vehicleData) => {
                try {
                    const store = getStore();
                    const response = await fetch(`${process.env.BACKEND_URL}/vehicle`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        },
                        body: JSON.stringify(vehicleData)
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error data:', errorData);
                        throw new Error('Error al crear el vehículo');
                    }
                    const data = await response.json();
                    console.log('Vehículo creado:', data);
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            getVehicles: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/vehicle`, {
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
                    console.error('Error:', error);
                }
            },
            createService: async (serviceData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/servicios`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}`
                        },
                        body: JSON.stringify(serviceData)
                    });
                    if (!response.ok) {
                        throw new Error('Error al crear el servicio');
                    }
                    const data = await response.json();
                    console.log('Servicio creado:', data);
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