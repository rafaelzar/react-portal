import axios, { AxiosResponse } from 'axios';

const baseUrl = 'https://employee-portal-backend-dev.herokuapp.com';

export const sendJWTToken = async (): Promise<AxiosResponse | undefined> => {
  const res = await axios.get(`${baseUrl}/employees/validate-jwt`);
  return res;
};
