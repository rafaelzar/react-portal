import { AxiosResponse } from 'axios';
import { deletePlaidAccount } from '../apiCalls';
import { IUserInformation } from '../../lib/interfaces';

export const deletePlaidAccountPlaidAction = (id: string) => {
  return async (): Promise<
    AxiosResponse | undefined | IUserInformation | boolean
  > => {
    try {
      const res = await deletePlaidAccount(id);
      if (res) {
        const {
          data: { employee = {} },
        } = res;
        return employee;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
};
