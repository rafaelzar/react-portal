import {
  forgotPasswordFunctionCognitoFunction,
  forgotPasswordSubmitFunctionCognitoFunction,
  logInUserCognitoFunction,
  logInUserWithNewPasswordCognitoFunction,
  logOutUserCognitoFunction,
} from '../../lib/aws/aws-cognito-functions';
import { AppDispatch } from '../store';

export const logInCognitoUserAuthAction = (
  username: string,
  password: string,
) => {
  return async (
    dispatch: AppDispatch,
  ): Promise<boolean | string | undefined> => {
    try {
      const user = await logInUserCognitoFunction(username, password);
      if (user === 'NEW_PASSWORD_REQUIRED') {
        console.log('new pass required');
        return 'NEW_PASSWORD_REQUIRED';
      } else if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', user });
        return user;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const logInCognitoUserWithNewPasswordAuthAction = (
  username: string,
  password: string,
  newPassword: string,
) => {
  return async (
    dispatch: AppDispatch,
  ): Promise<boolean | string | undefined> => {
    try {
      const user = await logInUserWithNewPasswordCognitoFunction(
        username,
        password,
        newPassword,
      );
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', user });
        return user;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const logOutCognitoUserAuthAction = () => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const res = await logOutUserCognitoFunction();
      if (res) {
        dispatch({ type: 'AUTH_LOGOUT_SUCCESS' });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const forgotPasswordAuthAction = (email: string) => {
  return async (): Promise<boolean | undefined> => {
    try {
      const res = await forgotPasswordFunctionCognitoFunction(email);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const forgotPasswordSubmitAuthAction = (
  email: string,
  code: string,
  newPassword: string,
) => {
  return async (): Promise<boolean | undefined> => {
    try {
      const res = await forgotPasswordSubmitFunctionCognitoFunction(
        email,
        code,
        newPassword,
      );
      if (res) {
        console.log(res);
        return res;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};
