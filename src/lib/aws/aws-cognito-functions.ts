/* eslint-disable no-console */
import { Auth } from 'aws-amplify';
import errorHandler from '../utils/errorHandler';
import { ICognitoErrorHandler } from '../interfaces';

export const logInUserCognitoFunction = async (
  username: string,
  password: string,
): Promise<string | boolean | undefined> => {
  try {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      console.log(user);
      return 'NEW_PASSWORD_REQUIRED';
    } else {
      console.log('user', user);
      return user;
    }
  } catch (error) {
    console.log('error signing in', error);
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};

export const fetchIdTokenCognitoFunction = async (): Promise<
  string | boolean | undefined
> => {
  try {
    return (await Auth.currentSession()).getIdToken().getJwtToken();
  } catch (error) {
    return false;
  }
};

export const logInUserWithNewPasswordCognitoFunction = async (
  username: string,
  password: string,
  newPassword: string,
): Promise<boolean | undefined> => {
  try {
    const res = await Auth.signIn(username, password);
    await Auth.completeNewPassword(res, newPassword)
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    return res;
  } catch (error) {
    console.log('error signing in', error);
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};

export const logOutUserCognitoFunction = async (): Promise<boolean> => {
  try {
    await Auth.signOut({ global: true });
    return true;
  } catch (error) {
    console.log('error signing out: ', error);
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};

export const forgotPasswordFunctionCognitoFunction = async (
  username: string,
): Promise<boolean | undefined> => {
  try {
    await Auth.forgotPassword(username).then((data) => {
      console.log(data);
      return data;
    });
    return true;
  } catch (error) {
    console.log('username error: ', error);
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};

export const forgotPasswordSubmitFunctionCognitoFunction = async (
  username: string,
  code: string,
  newPassword: string,
): Promise<boolean | undefined> => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword).then(
      (data) => {
        console.log(data);
        return data;
      },
    );
    return true;
  } catch (error) {
    console.log('forgot password error: ', error);
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};

export const changePasswordFunctionCognitoFunction = async (
  oldPassword: string,
  newPassword: string,
): Promise<boolean | void | string> => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    if (currentUser) {
      const changePasswordRes = await Auth.changePassword(
        currentUser,
        oldPassword,
        newPassword,
      );
      return changePasswordRes;
    }
    return false;
  } catch (error) {
    errorHandler(error as ICognitoErrorHandler);
    return false;
  }
};
