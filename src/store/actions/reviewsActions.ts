import errorHandler from '../../lib/utils/errorHandler';
import { getEmployeesReviews } from '../apiCalls';
import { IEmployeeReviews } from '../../lib/interfaces';

export const getEmployeesReviewsReviewsAction = (queries: string) => {
  return async (): Promise<IEmployeeReviews | boolean> => {
    try {
      const res = await getEmployeesReviews(queries);
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
