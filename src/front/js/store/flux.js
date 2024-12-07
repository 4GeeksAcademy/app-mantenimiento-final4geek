const getState = ({ getStore, getActions, setStore }) => {
    return {
        actions: {
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
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            registerUser: async (userData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/register", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    if (!response.ok) {
                        throw new Error('Error en el registro');
                    }
                    const data = await response.json();
                    console.log('Registro exitoso:', data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };
};

export default getState;