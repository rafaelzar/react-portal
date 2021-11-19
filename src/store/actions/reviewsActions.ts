import errorHandler from '../../lib/utils/errorHandler';
import { getEmployeesReviews } from '../apiCalls';
import { IReviewsResponse } from '../../lib/interfaces';

export const getEmployeesReviewsReviewsAction = (queries: string) => {
  return async (): Promise<IReviewsResponse | boolean> => {
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
