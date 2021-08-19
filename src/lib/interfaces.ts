/* eslint-disable camelcase */
export interface IReviews {
  _id: string;
  author: string;
  content: string;
  date: string;
  rating: number;
  platform: string;
}

export interface ICognitoErrorHandler {
  code: string;
  message: string;
  name: string;
}

export interface IDatePicker {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  key?: string;
}

export interface IUserInformation {
  first_name: string;
  last_name: string;
  nick_names?: Array<string>;
  email: string;
  phone?: string;
  _id?: string;
}
