/* eslint-disable no-console */
import { swalError } from './toasts';
import { ICognitoErrorHandler } from '../interfaces';

export default function errorHandler(error: ICognitoErrorHandler | any | unknown): void {
  const { message } = error;
  console.log(error);
  swalError(message);
}
