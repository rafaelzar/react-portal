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
  location: ILocation;
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
  numberOfReviews?: number;
  averageRating?: number;
  starsData?: IStarsData[];
  chartData?: Array<number>;
}

export interface IFeedbackResponse {
  data: IEmployeeFeedback[];
  stats: IFeedbackStats;
  isFirst: boolean;
  isLast: boolean;
}

export interface IEmployeeFeedback {
  _id: string;
  messages?: {
    content: string;
    date: string
  }[];
  to?: string;
  created_at: string;
  rating: number;
}

export interface IFeedbackStats {
  numberOfReviews?: number;
  averageRating?: number;
  starsData?: IStarsData[];
}

export interface ILeaderboardData {
  earned: number;
  mentions: number;
  rating: number;
  employee: IUserInformation;
}

export interface IStarsData {
  stars: number;
  percent: number;
  number: number;
}

export interface ILocation {
  _id: string;
  industry: string;
}

export interface IUserInformation {
  first_name: string;
  last_name: string;
  nick_names?: Array<string>;
  email?: string;
  phone?: string;
  photo_url?: string;
  _id?: string;
  cognito_id?: string;
  plaid_account?: string;
}

export interface IUserLocation {
  _id?: string;
  name?: string;
}

export interface IHomePageData {
  reviewStats: IHomeReviewStats;
  reviewSiteMentions: IHomeReviewSiteMentions[];
  reviewMentions: IEmployeeReviews[];
  feedbackMentions: IEmployeeFeedback[];
  earningsStats: IHomeEarningStats;
}

export interface IHomeReviewStats {
  mentionsThisMonth: number;
  mentionsAllTime: number;
  averageRatingAllTime: number;
}

export interface IHomeReviewSiteMentions {
  numOfReviews: number;
  platform: string;
}

export interface IHomeEarningStats {
  earningsAvailable: number;
  lastPayment: number;
  allTimeEarnings: number;
  allTimePayments: number;
  thisMonthEarnings: number;
  thisMonthEarningsUnpaid: number;
  prevMonthEarningsUnpaid: number;
  leaderboardRank: number;
}

export interface IRevenueHistory {
  check_id?: string;
  _id: string;
  amount: number;
  events?: IRevenueEvents[];
  date?: string;
  review?: IReviews;
  platform?: string;
}

export interface IRevenueEvents {
  date: string;
  status: string;
}

export interface IRevenueDetails {
  amount: number | string;
  date: string | undefined;
  description: string;
  _id: string;
  review?: IReviews;
  check_id?: string;
  platform?: string;
}

export interface IEmployeeEarningsDetails {
  earningsAvailable: number;
  lastPayment: number;
  lastPaymentDate?: string | null;
}

export interface IBankAccount {
  accounts: IAccounts[];
  bank: string;
}

export interface IAccounts {
  account_id: string;
  balances: IBalances;
  mask: string;
  name: string;
  official_name: string;
  subtype: string;
  type: string;
}

export interface IBalances {
  available: number;
  current: number;
  iso_currency_code: string;
  limit?: string | number | null;
  unoficial_currency_code?: string | null;
}

export interface ISize {
  width: number | undefined;
}

export interface IStore {
  user: {
    user?: IUserInformation | Record<string, never>;
  }
}
