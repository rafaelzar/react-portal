import {
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
        console.log('"dispatch"', 'dispatch', user);
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
