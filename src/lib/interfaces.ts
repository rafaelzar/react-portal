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

export interface IReviewsResponse {
  data: IEmployeeReviews[];
  stats: IReviewStats;
  isFirst: boolean;
  isLast: boolean;
}
export interface IEmployeeReviews {
  _id: string;
  name: string;
  content?: string;
  phone?: string;
  created_at: string;
  rating: number;
  platform?: string;
}

export interface IReviewStats {
  numberOfReviews: number;
  averageRating: number;
  starsData: IStarsData[];
  chartData: Array<number>;
}

export interface IStarsData {
  stars: number;
  percent: number;
  number: number;
}

export interface IUserInformation {
  first_name: string;
  last_name: string;
  nick_names?: Array<string>;
  email: string;
  phone?: string;
  _id?: string;
}
