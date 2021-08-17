import validator from 'validator';
import { swalError } from './toasts';

export const validateEmail = (email: string): boolean | undefined => {
  if (!validator.isEmail(email)) {
    swalError('Please enter a valid email');
  } else {
    return true;
  }
};

export const validateLogin = (
  email: string,
  password: string,
): boolean | undefined => {
  if (!validator.isEmail(email)) {
    swalError('Please enter a valid email');
  } else if (!isValidPassword(password)) {
    swalError('Invalid password format');
  } else {
    return true;
  }
};

export const validateForgotPasswordSubmit = (
  code: string,
  password: string,
  passwordConfirmed: string,
): boolean | undefined => {
  if (code === '') {
    swalError('Please enter a valid code');
  } else if (!isValidPassword(password)) {
    swalError(
      'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and one special character',
    );
  } else if (password !== passwordConfirmed) {
    swalError('Passwords do not match');
  } else {
    return true;
  }
};

export const isValidPassword = (password: string): boolean => {
  const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validPass.test(password);
};
