import axios from 'axios';

// Configuración global de axios
const apiClient = axios.create({
  baseURL: 'https://localhost:7066/api', // URL Backend PlantCare
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
