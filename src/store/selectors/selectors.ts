import { IUserInformation } from '../../lib/interfaces';

export const getUserSelector = (state: any): IUserInformation => {
  const {
    user: { user = {} },
  } = state;
  return user || {};
};

export const getUserIDSelector = (state: any): string => {
  const {
    user: { user: { _id: userID = '' } = {} },
  } = state;
  return userID || '';
};
