const initState = {};

interface Action {
  type?: string;
  user?: Record<string, unknown>;
  dbUser?: Record<string, unknown>;
}

export const userReducer = (state = initState, action: Action): any => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      ...action.user,
    };
  case 'SET_USER':
    return {
      ...state,
      dbUser: action.user,
    };

  case 'AUTH_LOGOUT_SUCCESS':
    return initState;
  default:
    return initState;
  }
};
