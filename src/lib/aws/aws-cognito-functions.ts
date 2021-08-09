/* eslint-disable no-console */
import { Auth } from 'aws-amplify';

export const logInUserCognitoFunction = async (email: string, password: string): Promise<void> => {
  try {
    const user = await Auth.signIn(email, password);
    console.log('user', user);
  } catch (error) {
    console.log('error signing in', error);
  }
};

export const logOutUserCognitoFunction = async (): Promise<void> => {
  try {
    await Auth.signOut({ global: true });
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

export const forgotPasswordFunction = async (username: string): Promise<void> => {
  try {
    await Auth.forgotPassword(username)
      .then((data) => console.log(data));
  } catch (error) {
    console.log('username error: ', error);
  }
};

export const forgotPasswordSubmitFunction = async (username: string, code:string, newPassword:string): Promise<void> => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => console.log(data));
  } catch (error) {
    console.log('forgot password error: ', error);
  }
};
