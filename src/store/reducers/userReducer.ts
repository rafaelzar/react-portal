const initState = {
  user: {},
};

interface Action {
  type?: string;
  user?: Record<string, unknown>;
}

export const userReducer = (state = initState, action: Action): any => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      ...state,
    };

  case 'UPDATE_USER':
    return {
      ...state,
      user: action.user,
    };

  case 'SET_USER':
    return {
      ...state,
      user: action.user,
    };

  case 'AUTH_LOGOUT_SUCCESS':
    return initState;
  default:
    return initState;
  }
};
