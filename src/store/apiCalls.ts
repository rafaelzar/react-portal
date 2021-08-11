import axios from 'axios';

const baseUrl = 'https://employee-portal-backend-dev.herokuapp.com';

export const sendJWTToken = async (): Promise<any> => {
  const res = await axios.get(`${baseUrl}/employees/validate-jwt`);
  return res;
};
