import { AxiosResponse } from 'axios';
import { getEmployeeRevenueHistory, getEmployeeEarnings } from '../apiCalls';

export const getEmployeesRevenueHistoryPaymentAction = (queries: string) => {
  return async (): Promise<AxiosResponse | boolean> => {
    try {
      const res = await getEmployeeRevenueHistory(queries);
      if (res) {
        const { data = {} } = res;
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
};

export const getEmployeeEarningsPaymentAction = (id: string) => {
  return async (): Promise<AxiosResponse | boolean> => {
    try {
      const res = await getEmployeeEarnings(id);
      if (res) {
        const { data = {} } = res;
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
};
