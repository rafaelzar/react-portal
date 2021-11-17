import { getEmployeeStats, getLeaderboard } from '../apiCalls';
import { IHomePageData, ILeaderboardData } from '../../lib/interfaces';

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

export const getLeaderboardAction = (userId: string) => {
  return async (): Promise<ILeaderboardData | boolean> => {
    try {
      const res = await getLeaderboard(userId);
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
