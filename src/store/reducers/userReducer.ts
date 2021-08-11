const initState = {};

interface Action {
  type?: string;
  user?: Record<string, unknown>;
}

export const userReducer = (state = initState, action: Action): Record<string, unknown> => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      ...action.user,
    };
  case 'AUTH_LOGOUT_SUCCESS':
    return initState;
  default:
    return initState;
  }
};
