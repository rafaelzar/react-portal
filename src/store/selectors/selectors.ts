import { IUserInformation } from '../../lib/interfaces';

export const getUserSelector = (state: any): IUserInformation => {
  const {
    user: { user = {} },
  } = state;
  return user || {};
};
