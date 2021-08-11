/* eslint-disable no-console */
import { Auth } from 'aws-amplify';

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
    return false;
  }
};

export const logOutUserCognitoFunction = async (): Promise<boolean> => {
  try {
    await Auth.signOut({ global: true });
    console.log('logout');
    return true;
  } catch (error) {
    console.log('error signing out: ', error);
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
    return false;
  }
};
