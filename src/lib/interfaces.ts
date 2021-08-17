export interface IReviews {
  id: string;
  name: string;
  rating: number;
  date: string;
  type?: string;
  textReceived: string;
}

export interface ICognitoErrorHandler {
  code: string,
  message: string,
  name: string,
}
