export const authReducer = (state, action) => {
  switch (action.message) {
    case "LOGIN":
      return loginReducer(state, action);

    case "SIGNUP":
      return loginReducer(state, action);

    case "GUEST":
      return loginReducer(state, action);

    case "LOGOUT":
      return state;

    default:
      return state;
  }
};

function loginReducer(state, action) {
  const newUser = action.body;
  return { ...state, user: newUser };
}
