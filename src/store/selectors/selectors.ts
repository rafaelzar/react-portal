import { RootStateOrAny } from 'react-redux';
import { IUserInformation, IUserLocation } from '../../lib/interfaces';

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

export const getUserLocationSelector = (state: RootStateOrAny): IUserLocation => {
  const {
    user: { location = {} },
  } = state;
  return location || {};
};
