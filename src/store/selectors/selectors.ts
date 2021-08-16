export const getUserSelector = (
  state: any,
): Record<string, unknown> | Record<string, never> => {
  const { user = {} } = state;
  return user || {};
};

export const getUserJwtTokenSelector = (state: any): string => {
  const { user: { auth: { signInUserSession = {} } = {} } = {} } = state;
  const { idToken: { jwtToken = '' } = {} } = signInUserSession || {};
  return jwtToken || '';
};