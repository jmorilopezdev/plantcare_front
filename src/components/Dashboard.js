import React, { useReducer, useEffect } from 'react';
import Filters from './Filters';
import { useNavigate } from 'react-router-dom';
import { getPlants } from '../services/plantService';
import { dashboardReducer, initialState } from '../reducers/dashboardReducer';

const Dashboard = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const navigate = useNavigate();

  const { plants, loading, error, filterType, filterStatus, groupOrder } = state;

  //obtener listado de plantas
  const fetchPlants = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const data = await getPlants();
      dispatch({ type: 'SET_PLANTS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    fetchPlants();
    const intervalId = setInterval(fetchPlants, 30000);
    return () => clearInterval(intervalId);
  }, []);

 // Filtrar plantas según los filtros
  const filteredPlants = plants.filter((plant) => {
    if (filterType !== 'all' && plant.type !== filterType) return false;

    const status = calculateDueDays(plant) >= 5 ? 'ok' : calculateDueDays(plant) >= 1 ? 'duesoon' : 'overdue';
    if (filterStatus !== 'all' && status !== filterStatus) return false;

    return true;
  });

// Agrupar plantas por tipo
  const groupedPlants = filteredPlants.reduce((groups, plant) => {
    const { type } = plant;
    if (!groups[type]) groups[type] = [];
    groups[type].push(plant);
    return groups;
  }, {});

    // Manejo del estado de ordenar por urgencia de riego
  const sortedGroups = Object.keys(groupedPlants).reduce((sorted, type) => {
    sorted[type] = [...groupedPlants[type]].sort((a, b) => {
      const order = groupOrder[type] === 'asc' ? 1 : -1;
      return order * (new Date(a.lastWateredDate) - new Date(b.lastWateredDate));
    });
    return sorted;
  }, {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Filters */}
        <div className="col-md-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Filters</h5>
              <Filters
                filterType={filterType}
                filterStatus={filterStatus}
                onTypeChange={(value) => dispatch({ type: 'SET_FILTERS', payload: { filterType: value } })}
                onStatusChange={(value) => dispatch({ type: 'SET_FILTERS', payload: { filterStatus: value } })}
              />
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="col-md-10">
          <h3 className="text-center text-success">Dashboard</h3>

          {filteredPlants.length === 0 && (
            <div className="text-center">
              <p>Nothing to show, please add new Plants..</p>
              <button className="btn btn-primary" onClick={() => navigate('/add-plant')}>
                Add New Plant
              </button>
            </div>
          )}

          <div className="row">
            {Object.keys(sortedGroups).map((type) => (
              <div className="col-md-3 mb-3" key={type}>
                <div>
                  <h4 className="text-success">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                  <button className="btn btn-secondary btn-sm" onClick={() => dispatch({ type: 'TOGGLE_GROUP_SORT', payload: type })}>
                    {groupOrder[type] === 'asc' ?  'Sort for no urgency of watering' : 'Sort for needs urgency of watering' }
                  </button>

                  <hr></hr>
                  <div className="row">
                  {sortedGroups[type].map((plant) => (
                    <div key={plant.id} className="col-md-12 mb-4">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">Plant: {plant.name}</h5>
                          <p className="card-text">Location: {plant.location}</p>
                          <p className="card-text">Last Watered Date: { new Date(plant.lastWateredDate).toDateString()  }</p>
                          <p className="card-text">Next Watered Date: { addDays(new Date(plant.lastWateredDate),plant.wateringFrequencyDays).toDateString() }</p>
                          <p className="card-text" style={
                            {
                              color: calculateDueDays(plant) >= 5 ? 'green' : calculateDueDays(plant) >= 1 ? 'yellow' : 'red',
                            }
                            }>
                            <strong>
                            Watering Status: { calculateDueDays(plant) >= 5 ? 'Ok' : calculateDueDays(plant) >= 1 ? 'Due Soon' : 'Overdue' }
                            </strong> 
                          </p>
          
                          <button className="btn btn-success" onClick={() => navigate('/edit-plant', { state: { plant } })} >
                            Update Plant
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions
const calculateDueDays = (plant) => {
  const today = new Date();
  const lastWatered = new Date(plant.lastWateredDate);
  const nextWatering = new Date(lastWatered);
  nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequencyDays);
  return Math.ceil((nextWatering - today) / (1000 * 3600 * 24));
};

//para agregar dias
const addDays =(date,days) => {
  date.setDate(date.getDate() + days);
  return date;
};

export default Dashboard;
