import apiClient from './apiService';

// Obtener todas las plantas
export const getPlants = async () => {
  try {
    const response = await apiClient.get('/plants');
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

// Agregar una nueva planta
export const addPlant = async (plant) => {
  try {
    const response = await apiClient.post('/plants', plant);
    return response.data;
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

// Actualizar una planta
export const updatePlant = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/plants/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating plant:', error);
    throw error;
  }
};
