import { AxiosResponse } from 'axios';
import errorHandler from '../../lib/utils/errorHandler';
import { getEmployeeRevenueHistory } from '../apiCalls';

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
      errorHandler(error);
      return false;
    }
  };
};
