export interface IReviews {
  _id: string,
  author: string,
  content: string,
  date: string,
  rating: number,
  platform: string,
}

export interface ICognitoErrorHandler {
  code: string,
  message: string,
  name: string,
}
