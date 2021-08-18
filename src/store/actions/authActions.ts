import {
  changePasswordFunctionCognitoFunction,
  forgotPasswordFunctionCognitoFunction,
  forgotPasswordSubmitFunctionCognitoFunction,
  logInUserCognitoFunction,
  logInUserWithNewPasswordCognitoFunction,
  logOutUserCognitoFunction,
} from '../../lib/aws/aws-cognito-functions';
import errorHandler from '../../lib/utils/errorHandler';
import { swalError, swalInfo } from '../../lib/utils/toasts';
import { sendJWTToken } from '../apiCalls';
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
        return 'NEW_PASSWORD_REQUIRED';
      } else if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', user });
        return user;
      } else {
        return false;
      }
    } catch (error) {
      swalError('Something went wrong');
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
      swalError('Something went wrong');
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
      swalError('Something went wrong');
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
      swalError('Something went wrong');
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
        return res;
      } else {
        return false;
      }
    } catch (error) {
      swalError('Something went wrong');
      return false;
    }
  };
};

export const fetchUserFromDatabaseAuthAction = () => {
  return async (dispatch: AppDispatch): Promise<boolean | undefined> => {
    try {
      const user = await sendJWTToken();
      if (user) {
        const { data = {} } = user;
        dispatch({ type: 'SET_USER', user: data });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      swalInfo('This is a test user which is not in the database');
      return false;
    }
  };
};

export const changePasswordAuthAction = (
  oldPassword: string,
  newPassword: string,
) => {
  return async (): Promise<boolean | string | undefined> => {
    try {
      const res = await changePasswordFunctionCognitoFunction(
        oldPassword,
        newPassword,
      );
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };
};
