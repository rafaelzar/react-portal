import { IStore, IUserInformation } from '../../lib/interfaces';

const initState = {
  user: {},
};

interface Action {
  type?: string;
  user?: IUserInformation | Record<string, never>;
}

export const userReducer = (state = initState, action: Action): IStore => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      ...state,
    };

  case 'UPDATE_USER':
    return {
      ...state,
      user: action.user,
    } as IStore;

  case 'SET_USER':
    return {
      ...state,
      user: action.user,
    } as IStore;

  case 'AUTH_LOGOUT_SUCCESS':
    return initState;
  default:
    return initState;
  }
};
