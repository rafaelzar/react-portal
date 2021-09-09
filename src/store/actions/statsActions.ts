import { getEmployeeStats } from '../apiCalls';
import { IHomePageData } from '../../lib/interfaces';

export const getEmployeeStatsStatsAction = (queries: string) => {
  return async (): Promise<IHomePageData | boolean> => {
    try {
      const res = await getEmployeeStats(queries);
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
