export const initialState = {
    plants: [],
    loading: true,
    error: null,
    filterType: 'all',
    filterStatus: 'all',
    groupOrder: {}, // Controla el orden de los grupos por tipo
  };
  
  export const dashboardReducer = (state, action) => {
    switch (action.type) {
      case 'SET_PLANTS':
        return { ...state, plants: action.payload, loading: false, error: null };
      case 'SET_LOADING':
        return { ...state, loading: true };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      case 'SET_FILTERS':
        return { ...state, ...action.payload };
      case 'TOGGLE_GROUP_SORT':
        return {
          ...state,
          groupOrder: {
            ...state.groupOrder,
            [action.payload]: state.groupOrder[action.payload] === 'asc' ? 'desc' : 'asc',
          },
        };
      default:
        return state;
    }
  };
  