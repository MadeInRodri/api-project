import axios from "axios";

const API_URL = "https://apibookingsaccomodations-production.up.railway.app";

// Función que envía las credenciales de inicio de sesión a la API
export const loginUser = async (email, password) => {
  try {
    // Enviamos un POST a /api/V1/login con los datos del usuario
    const response = await axios.post(`${API_URL}/api/V1/login`, {
      email,
      password,
    });

    // Retornamos solo los datos relevantes de la respuesta
    return response.data; // { token: "..." }
  } catch (error) {
    throw error;
  }
};
