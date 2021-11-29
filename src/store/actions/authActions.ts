import {
  changePasswordFunctionCognitoFunction,
  forgotPasswordFunctionCognitoFunction,
  forgotPasswordSubmitFunctionCognitoFunction,
  logInUserCognitoFunction,
  logInUserWithNewPasswordCognitoFunction,
  logOutUserCognitoFunction,
} from '../../lib/aws/aws-cognito-functions';
import { swalError, swalInfo } from '../../lib/utils/toasts';
import { sendJWTToken, updateUser } from '../apiCalls';
import { AppDispatch } from '../store';
import { IUserInformation } from '../../lib/interfaces';

export const logInCognitoUserAuthAction = (
  username: string,
  password: string,
  rememberMe?: boolean,
) => {
  return async (
    dispatch: AppDispatch,
  ): Promise<boolean | string | undefined> => {
    try {
      const user = await logInUserCognitoFunction(username, password, rememberMe);
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
  rememberMe?: boolean,
) => {
  return async (
    dispatch: AppDispatch,
  ): Promise<boolean | string | undefined> => {
    try {
      const user = await logInUserWithNewPasswordCognitoFunction(
        username,
        password,
        newPassword,
        rememberMe,
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

export const updateUserAuthAction = (id: string, user: IUserInformation) => {
  return async (dispatch: AppDispatch): Promise<boolean | undefined> => {
    try {
      const res = await updateUser(id, user);
      const updatedUser = res?.data || {};
      if (updatedUser?._id) {
        dispatch({ type: 'UPDATE_USER', user: updatedUser });
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
        dispatch({ type: 'SET_USER', user: data.employee });
        dispatch({ type: 'SET_LOCATION', location: data.location });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      swalInfo('This is user is not in the database');
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
      swalInfo('Something went wrong');
      return false;
    }
  };
};
