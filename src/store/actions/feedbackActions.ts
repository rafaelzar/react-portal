import errorHandler from '../../lib/utils/errorHandler';
import { getEmployeesFeedback } from '../apiCalls';
import { IFeedbackResponse } from '../../lib/interfaces';

export const getEmployeesFeedbackAction = (queries: string) => {
  return async (): Promise<IFeedbackResponse | boolean> => {
    try {
      const res = await getEmployeesFeedback(queries);
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
