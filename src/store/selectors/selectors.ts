import { IUserInformation } from '../../lib/interfaces';

export const getUserSelector = (
  state: any,
): IUserInformation => {
  const { user: { user = {} } } = state;
  return user || {};
};

export const getUserJwtTokenSelector = (state: any): string => {
  const { user: { auth: { signInUserSession = {} } = {} } = {} } = state;
  const { idToken: { jwtToken = '' } = {} } = signInUserSession || {};
  return jwtToken || '';
};
