export const indexReducer = (state, action) => {
  switch(action.message) {

    case 'SET_USER':
      const user = action.body;
      return {...state, user};
      
    default: 
      return state;
  }
}