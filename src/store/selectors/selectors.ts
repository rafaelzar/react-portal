import { RootStateOrAny } from 'react-redux';
import { IUserInformation } from '../../lib/interfaces';

export const getUserSelector = (state: RootStateOrAny): IUserInformation => {
  const {
    user: { user = {} },
  } = state;
  return user || {};
};

export const getUserIDSelector = (state: RootStateOrAny): string => {
  const {
    user: { user: { _id: userID = '' } = {} },
  } = state;
  return userID || '';
};
