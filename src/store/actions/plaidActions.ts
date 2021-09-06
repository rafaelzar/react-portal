import { AxiosResponse } from 'axios';
import { deletePlaidAccount } from '../apiCalls';

export const deletePlaidAccountPlaidAction = (id: string) => {
  return async (): Promise<AxiosResponse | undefined | any> => {
    try {
      const res = await deletePlaidAccount(id);
      if (res) {
        console.log(res);
        // const { data = {} } = res;
        return res;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
};
