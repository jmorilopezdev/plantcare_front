import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { updatePlant,addPlant } from '../services/plantService';

const AddPlantForm = () => {

  const location = useLocation(); // Hook de React Router para obtener el estado pasado
  const navigate = useNavigate(); // Hook para navegar

  const [plant] = useState(location.state ? location.state.plant : null);

  const [formData, setFormData] = useState({
    name: plant === null ? '' : plant.name,
    type: plant === null ? 'succulent' : plant.type,
    wateringFrequencyDays: plant === null ? 7 : plant.wateringFrequencyDays,
    lastWateredDate: plant === null ? '' : new Date(plant.lastWateredDate).toLocaleDateString('en-CA'),
    location: plant === null ? '' : plant.location,
  });

  console.log(formData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const savePlant = async (e) => {
    
    e.preventDefault();

    const newPlant = {
      ...formData
    };

    setLoading(true);
    setError(null);

    try {

      if(plant !== null){

        let plantUpdate = newPlant;

        plantUpdate.id = plant.id;

        await updatePlant(plant.id, plantUpdate);

      }else{

        await addPlant(newPlant);
  
      }
     
      // Redirigir al Dashboard después de guardar la planta
      alert('Plant saved successfully!');
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
              <div className="row mb-4">
                <div className="col-12 text-center">
                  <h3 className="display-10 text-success" style={{fontWeight: 'bold'}}>{ plant === null ? 'Add New Plant' : 'Edit Plant'} </h3>
                </div>
              </div>
              <form onSubmit={savePlant}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Plant Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Plant Type
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="succulent">Succulent</option>
                    <option value="tropical">Tropical</option>
                    <option value="herb">Herb</option>
                    <option value="cacti">Cacti</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="wateringFrequencyDays" className="form-label">
                    Watering Frequency (Days)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="wateringFrequencyDays"
                    name="wateringFrequencyDays"
                    value={formData.wateringFrequencyDays}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastWateredDate" className="form-label">
                    Last Watered Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastWateredDate"
                    name="lastWateredDate"
                    value={formData.lastWateredDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                <div className="col-md-1">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                       {loading ? 'Saving...' : 'Save'}
                    </button> 
                </div>
                <div className="col-md-1">
                  <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>
                    Cancel
                  </button>
                </div>
                </div>                
              </form>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
    </div>
  );
};

export default AddPlantForm;
