import validator from 'validator';
import { swalInfo } from './toasts';

export const validateEmail = (email: string): boolean | undefined => {
  if (!validator.isEmail(email)) {
    swalInfo('Please enter a valid email.');
  } else {
    return true;
  }
};

export const isValidPassword = (password: string) => {
  const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validPass.test(password);
};

