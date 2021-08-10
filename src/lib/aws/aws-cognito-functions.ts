/* eslint-disable no-console */
import { Auth } from 'aws-amplify';

export const logInUserCognitoFunction = async (
  username: string,
  password: string,
): Promise<string | boolean | undefined> => {
  try {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      return 'NEW_PASSWORD_REQUIRED';
    } else {
      console.log('user', user);
    }
  } catch (error) {
    console.log('error signing in', error);
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
    Auth.completeNewPassword(res, newPassword)
      .then((user) => {
        console.log(user);
        return res;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    return res;
  } catch (error) {
    console.log('error signing in', error);
    return false;
  }
};

export const logOutUserCognitoFunction = async (): Promise<void> => {
  try {
    await Auth.signOut({ global: true });
    console.log('logout');
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

export const forgotPasswordFunction = async (
  username: string,
): Promise<void> => {
  try {
    await Auth.forgotPassword(username).then((data) => console.log(data));
  } catch (error) {
    console.log('username error: ', error);
  }
};

export const forgotPasswordSubmitFunction = async (
  username: string,
  code: string,
  newPassword: string,
): Promise<void> => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword).then((data) => console.log(data));
  } catch (error) {
    console.log('forgot password error: ', error);
  }
};
