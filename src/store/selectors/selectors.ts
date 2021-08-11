export const getUserSelector = (
  state: any,
): Record<string, unknown> | Record<string, never> => {
  const { user = {} } = state;
  return user || {};
};

// export const getUserJwtTokenSelector = (
//   state: any,
// ): string => {
//   const { user: { signInUserSession: { accessToken: { jwtToken = '' } = {} } = {} } = {} } = state;
//   return jwtToken || '';
// };

export const getUserJwtTokenSelector = (state: any): string => {
  const { user: { signInUserSession = {} } = {} } = state;
  const { accessToken: { jwtToken = '' } = {} } = signInUserSession || {};
  return jwtToken || '';
};
