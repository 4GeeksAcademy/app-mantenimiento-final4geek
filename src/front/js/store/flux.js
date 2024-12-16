const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            vehicles: [],
            services: [],
            token: "",
            userType: "" // Agregamos userType al estado inicial
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
                    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
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
                    console.log('Datos recibidos del servidor:', data);

                    // Guarda el token y el userType en el store
                    localStorage.setItem("token", data.access_token);
                    setStore({
                        token: data.access_token,
                        userType: data.user_type // Guardamos userType en el estado global
                    });

                    console.log("Token guardado en store:", data.access_token);
                    console.log("User Type guardado en store:", data.user_type);

                    return { success: true, data };
                } catch (error) {
                    console.error('Error en loginUser:', error);
                    return { success: false, error: error.message };
                }
            },

            createVehicle: async (data) => {
                try {
                    const token = getStore().token;
                    if (!token || token.split('.').length !== 3) {
                        console.error("Invalid token format");
                        return { success: false, error: "Invalid token format" };
                    }

                    const response = await fetch(`${process.env.BACKEND_URL}/api/vehicle`, {
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

                  createService: async (data) => {
                    try {
                        const token = getStore().token;
                        console.log(token)
                        if (!token || token.split('.').length !== 3) {
                            console.error("Invalid token format");
                            return { success: false, error: "Invalid token format" };
                        }
    
                        const response = await fetch(process.env.BACKEND_URL + '/api/crear-tipo-servicio', {
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
                            throw new Error('Error al registrar el servicio: ' + errorData.message);
                        }
                        const result = await response.json();
                        
                    
                      
                          // Return success and the result
                          return { success: true, result };
                        } catch (error) {
                          // Log the error and return an error response
                          console.error('Error creating service:', error);
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
                    console.error('Error obteniendo vehículos:', error);
                }
            }
        }
    };
};

export default getState;
