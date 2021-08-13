const initState = {
  auth: {},
  user: {},
};

interface Action {
  type?: string;
  user?: Record<string, unknown>;
  auth?: Record<string, unknown>;
}

export const userReducer = (state = initState, action: Action): any => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      auth: action.user,
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
